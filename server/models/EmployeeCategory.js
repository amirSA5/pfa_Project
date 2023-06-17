// models/EmployeeCategory.js
const mongoose = require('mongoose');

const employeeCategorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const EmployeeCategory = mongoose.model('employeeCategory', employeeCategorySchema);

module.exports = EmployeeCategory;
