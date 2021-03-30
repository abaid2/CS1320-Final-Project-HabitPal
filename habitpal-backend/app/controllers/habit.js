const habitsData = require('../data/habits.js');

function getHabits(req, res) {
    res.send(habitsData.habitsTemplate);
}

module.exports = {
    getHabits
};