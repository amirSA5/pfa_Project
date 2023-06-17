const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
