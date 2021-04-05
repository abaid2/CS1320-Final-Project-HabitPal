const habitsData = require('../data/habits.js');

exports.getHabits = (req, res) => {
    res.send(habitsData.habitsTemplate);
}
