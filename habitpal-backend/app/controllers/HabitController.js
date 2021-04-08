const habitsData = require('../data/habits.js');
const { Habit } = require('../models/HabitModel.js');
const { User } = require('../models/UserModel');

exports.getHabits = (req, res) => {
    let habits = [];
    Habit.find({ 'members': req.user._id }, (err, habit_lst) => {
        for (let i = 0; i < habit_lst.length; i++) {
            curr = habit_lst[i];
            habits.push({ id: curr._id, title: curr.title, description: curr.description, 
            created_at: curr.created_at, members: curr.members });
        }
        res.send(habits);
    });
}

exports.getInvitations = async (req, res) => {
    const user_id = req.user._id;
    let habits = [];
    let user = await User.findOne({ '_id': user_id });
    let lst = user.invitations;
    for (let i = 0; i < lst.length; i++) {
        let curr_id = lst[i];
        let habit = await Habit.findOne({ '_id': curr_id });
        habits.push({ id: habit._id, title: habit.title, description: habit.description, 
            created_at: habit.created_at, members: habit.members});
    }
    res.send(habits);
}

exports.addHabit = async (req, res) => {
    const habit = new Habit(req.body);
    habit.members.push(req.user._id);
    await habit.save((err, doc) => {
        if (err) {
            return res.status(422).json({errors:err})
        } else {
            const habitData = {
                title: doc.title,
                description: doc.description,
                created_at: doc.created_at
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

exports.inviteFriend = async (req, res) => {
    const username = req.body.username;
    const habitid = req.body.habitid;
    User.findOne({ 'username': username }, (err, user) => {
        if (err) {
            return res.status(422).json({errors:err});
        } else if (user) {
            user.invitations.push(habitid);
            user.save();
            return res.status(200).json({
                success: true,
                message: 'Successfully Invited Friend',
            })
        } else {
            return res.status(422).json({errors:err});
        }
    });
}

exports.acceptInvite = async (req, res) => {
    const habitid = req.body.habitid;
    const userid = req.user._id;
    let user = await User.findOne({ '_id': userid });
    user.invitations.pull(habitid);
    user.habits.push(habitid);
    user.save();
    let habit = await Habit.findOne({ '_id': habitid });
    habit.members.push(userid);
    habit.save();
    return res.status(200).json({
        success: true,
        message: 'Successfully Accepted Invitation',
    })
}

exports.getDetail = async (req, res) => {
    const habitid = req.query.habitid;
    let habit = await Habit.findOne({ '_id': habitid });
    let members = habit.members;
    let member_lst = [];
    for (let i = 0; i < members.length; i++) {
        let user = await User.findOne({ '_id': members[i] });
        member_lst.push(user.username);
    }
    res.send({id: habitid, title: habit.title, description: habit.description, members: member_lst});
}











