const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    teamMember: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        default: 'Begin',
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
