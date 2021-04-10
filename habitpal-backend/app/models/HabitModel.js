const mongoose = require('mongoose');
const habitSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title field is required!'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'The description field is required!'],
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    logs: { type: Map, of: Array },
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = { Habit }