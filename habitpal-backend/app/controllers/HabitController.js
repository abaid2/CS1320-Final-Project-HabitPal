const e = require('express');
const { Habit } = require('../models/HabitModel.js');
const { User } = require('../models/UserModel');

exports.getHabits = async(req, res) => {
    let habits = [];
    Habit.find({ 'members': req.user._id }, (err, habit_list) => {
        for (let i = 0; i < habit_list.length; i++) {
            curr = habit_list[i];
            habits.push({
                id: curr._id,
                title: curr.title,
                description: curr.description,
                created_at: curr.created_at,
                interval: curr.interval,
                timeout: curr.timeout,
                members: curr.members,
                logs: curr.logs,
            });
        }
        for (let i=habits.length-1; i >= 0; i--) {
            if (habits[i].timeout) {
                if (habits[i].timeout < Date.now()) {
                    deleteHabitHelper(habits[i].id, req.user._id);
                    habits.splice(i, 1);
                }
            }
        }
        res.send(habits);
    });
}

exports.getInvitations = async(req, res) => {
    const user_id = req.user._id;
    let habits = [];
    let user = await User.findOne({ '_id': user_id });
    let list = user.invitations;
    for (let i = 0; i < list.length; i++) {
        let curr_id = list[i];
        let habit = await Habit.findOne({ '_id': curr_id });
        habits.push({
            id: habit._id,
            title: habit.title,
            description: habit.description,
            created_at: habit.created_at,
            members: habit.members,
            logs: habit.logs
        });
    }
    res.send(habits);
}

exports.addHabit = async(req, res) => {
    req.body.logs = {};
    const timeout = req.body.timeout;
    if (timeout == 'never') {
        req.body.timeout = null;
    } else if (timeout === '1day') {
        const time = new Date();
        time.setDate(time.getDate() + 1);
        req.body.timeout = time;
    } else if (timeout === '7day') {
        const time = new Date();
        time.setDate(time.getDate() + 7);
        req.body.timeout = time;
    } else if (timeout === 'month') {
        const time = new Date();
        time.setMonth(time.getMonth() + 1);
        req.body.timeout = time;
    }
    const habit = new Habit(req.body);
    habit.members.push(req.user._id);
    habit.logs.set(req.user._id, []);
    await habit.save((err, doc) => {
        if (err) {
            return res.status(422).json({ errors: err })
        } else {
            const habitData = {
                title: doc.title,
                description: doc.description,
                created_at: doc.created_at,
                members: doc.members,
                logs: doc.logs,
            }
            req.user.habits.push(doc._id);
            req.user.save();
            return res.status(200).json({
                success: true,
                message: 'Successfully Added Habit',
                habitData
            })
        }
    });
}

exports.inviteFriend = async(req, res) => {
    const id = req.body.id;
    const habitId = req.body.habitId;
    User.findOne({ '_id': id }, (err, user) => {
        if (err) {
            return res.status(422).json({ errors: err });
        } else if (user) {
            if (!user.invitations.includes(habitId)) {
                user.invitations.push(habitId);
                user.save();
                return res.status(200).json({
                    success: true,
                    message: 'Successfully Invited Friend',
                })
            }
        } else {
            return res.status(422).json({ errors: err });
        }
    });
}

exports.handleInviteResponse = async(req, res) => {
    const habitId = req.body.habitId;
    const userId = req.user._id;
    const response = req.body.response;
    let user = await User.findOne({ '_id': userId });
    console.log(user);
    user.invitations.pull(habitId);
    if (response === 'accept') {
        user.habits.push(habitId);
        let habit = await Habit.findOne({ '_id': habitId });
        habit.members.push(userId);
        habit.logs.set(userId, []);
        habit.save();
    };
    user.save();
    return res.status(200).json({
        success: true,
        message: 'Successfully Handled Invitation',
    })
}

exports.getHabit = async(req, res) => {
    const habitId = req.query.habitId;
    let habit = await Habit.findOne({ '_id': habitId });
    let members = new Map();
    let users = await User.find({ '_id': { $in: habit.members } });
    users.map(user => members[user._id] = { username: user.username, email: user.email });
    res.send({ id: habitId, title: habit.title, description: habit.description, members: members, logs: habit.logs });
}

exports.updateLog = async(req, res) => {
    const habitId = req.body.habitId;
    const userId = req.user._id;
    const date = req.body.date;
    const action = req.body.action;
    console.log(habitId, userId, date, action);
    let habit = await Habit.findOne({ '_id': habitId });
    let userLogs = habit.logs.get(userId);
    if (action === 'add') {
        userLogs.push(date);
    } else {
        userLogs.splice(userLogs.indexOf(date), 1);
    }
    // userLogs = [];
    console.log(userLogs);
    habit.logs.set(userId, userLogs);
    habit.save();
    return res.status(200).json({
        success: true,
        message: 'Successfully Logged Progress',
    });
}

exports.addFriend = async(req, res) => {
    userId = req.user._id;
    let user = await User.findById(userId);
    let friend = await User.findById(req.body.id);
    console.log(friend.friends);
    friendId = req.body.id;
    user.friends.push(friendId);
    const index = user.requests.indexOf(friendId);
    if (index > -1) {
        user.requests.splice(index, 1);
    }
    friend.friends.push(userId);
    user.save();
    friend.save();
    return res.status(200).json({
        success: true,
        message: 'Successfully Added Friend',
    })
}

exports.getFriends = async(req, res) => {
    let friends = req.user.friends;
    let friendsList = [];
    for (let i = 0; i < friends.length; i++) {
        other = await User.findById(friends[i]);
        friendsList.push({
            id: other._id,
            username: other.username,
            email: other.email,
        });
    }
    res.send(friendsList);
}

exports.getFriendRequests = async(req, res) => {
    let requests = req.user.requests;
    let requestList = [];
    for (let i = 0; i < requests.length; i++) {
        other = await User.findById(requests[i]);
        requestList.push({
            id: other._id,
            username: other.username,
            email: other.email,
        });
    }
    res.send(requestList);
}

exports.sendFriendRequest = async(req, res) => {
    userId = req.user._id;
    let other = await User.findOne({'email': req.body.email});
    if (!other) {
        return res.status(400).json({ success: false, message: 'User not found!' });
    }
    if (!other.requests.includes(userId)) {
        other.requests.push(userId);
        other.save();
    }
    return res.status(200).json({
        success: true,
        message: 'Successfully Sent Friend Request',
    })
}

async function deleteHabitHelper(habitId, userId) {
    let user = await User.findOne({'_id': userId});
    for (let i = 0; i < user.habits.length; i++) {
        if (user.habits[i].equals(habitId)) {
            user.habits.splice(i, 1);
            break;
        }
    }
    user.save();
    let habit = await Habit.findOne({'_id': habitId});
    if (!habit) {
        return;
    }
    for (let i = 0; i < habit.members.length; i++) {
        if (habit.members[i].equals(userId)) {
            habit.members.splice(i, 1);
            break;
        }
    }
    habit.logs.set(userId, undefined);
    await habit.save();
    if (habit.members.length == 0) {
        Habit.deleteOne({ '_id': habitId });
    }
}

exports.deleteHabit = async(req, res) => {
    let habitId = req.body.habitId;
    let userId = req.user._id;
    deleteHabitHelper(habitId, userId);
    return res.status(200).json({
        success: true,
        message: 'Successfully Deleted',
    });
}