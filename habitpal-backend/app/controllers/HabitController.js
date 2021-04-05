const habitsData = require('../data/habits.js');
const { Habit } = require('../models/HabitModel.js');

exports.getHabits = (req, res) => {
    res.send(habitsData.habitsTemplate);
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
