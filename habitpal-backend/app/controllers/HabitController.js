const e = require('express');
const habitsData = require('../data/habits.js');
const { Habit } = require('../models/HabitModel.js');
const { User } = require('../models/UserModel');

exports.getHabits = (req, res) => {
    let habits = [];
    Habit.find({ 'members': req.user._id }, (err, habit_list) => {
        for (let i = 0; i < habit_list.length; i++) {
            curr = habit_list[i];
            habits.push({
                id: curr._id,
                title: curr.title,
                description: curr.description,
                created_at: curr.created_at,
                members: curr.members
            });
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
            members: habit.members
        });
    }
    res.send(habits);
}

exports.addHabit = async(req, res) => {
    req.body.logs = {};
    const habit = new Habit(req.body);
    habit.members.push(req.user._id);
    habit.logs.set(req.user.username, []);
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
    const username = req.body.username;
    const habitId = req.body.habitId;
    User.findOne({ 'username': username }, (err, user) => {
        if (err) {
            return res.status(422).json({ errors: err });
        } else if (user) {
            user.invitations.push(habitId);
            user.save();
            return res.status(200).json({
                success: true,
                message: 'Successfully Invited Friend',
            })
        } else {
            return res.status(422).json({ errors: err });
        }
    });
}

exports.acceptInvite = async(req, res) => {
    const habitId = req.body.habitId;
    const userId = req.user._id;
    let user = await User.findOne({ '_id': userId });
    user.invitations.pull(habitId);
    user.habits.push(habitId);
    user.save();
    let habit = await Habit.findOne({ '_id': habitId });
    habit.members.push(userId);
    habit.logs.set(req.user.username, []);
    habit.save();
    return res.status(200).json({
        success: true,
        message: 'Successfully Accepted Invitation',
    })
}

exports.getHabit = async(req, res) => {
    const habitId = req.query.habitId;
    let habit = await Habit.findOne({ '_id': habitId });
    let members = habit.members;
    let member_list = [];
    for (let i = 0; i < members.length; i++) {
        let user = await User.findOne({ '_id': members[i] });
        member_list.push(user.username);
    }
    res.send({ id: habitId, title: habit.title, description: habit.description, members: member_list });
}

exports.updateLog = async(req, res) => {
    const habitId = req.body.habitId;
    const username = req.user.username;
    const date = req.body.date;
    const action = req.body.action;
    console.log(habitId, username, date, action);
    let habit = await Habit.findOne({ '_id': habitId });
    let userLogs = habit.logs.get(username);
    if (action === 'add') {
        userLogs.push(date);
    } else {
        userLogs.splice(userLogs.indexOf(date), 1);
    }
    // userLogs = [];
    console.log(userLogs);
    habit.logs.set(username, userLogs);
    habit.save();
    return res.status(200).json({
        success: true,
        message: 'Successfully Logged Progress',
    });
}