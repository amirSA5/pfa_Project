// controllers/UserController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Project = require('../models/Project');
const jwt = require('jsonwebtoken');
const EmployeeCategory = require('../models/EmployeeCategory');
const mongoose = require('mongoose');
const Task = require('../models/Task');



const registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, organization, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            organization,
            role
        });

        await newUser.save();

        res.json(newUser);
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'An error occurred during user registration' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, role: user.role, name: user.name, userId: user._id, organization: user.organization });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'An error occurred during user login' });
    }
};

const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).json({ msg: 'User does not exist.' });

        res.json(user);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        await User.findOneAndUpdate({ _id: req.params.id }, { name, email, phoneNumber });

        res.json({ msg: 'Updated a user' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const createEmployeeCategory = async (req, res) => {
    try {
        let { userId, category, description } = req.body;
        userId = new mongoose.Types.ObjectId(userId);
        const employeeCategory = new EmployeeCategory({ userId, category, description });
        const savedEmployeeCategory = await employeeCategory.save();
        res.status(201).json(savedEmployeeCategory);
    } catch (error) {
        console.error('Error creating employeeCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteEmployeeCategory = async (req, res) => {
    try {
        await EmployeeCategory.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Deleted an EmployeeCategory' });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const getAllEmployeeCategory = async (req, res) => {
    try {
        const employeesCategory = await EmployeeCategory.find({ userId: req.params.id });
        res.json(employeesCategory);
    } catch (error) {
        console.error('Error fetching employeesCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const getAllUsersCategory = async (req, res) => {
    try {
        const usersCategory = await EmployeeCategory.find();
        res.json(usersCategory);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete the user
        await User.findByIdAndDelete(userId);

        // Delete related employee categories (if needed)
        await EmployeeCategory.deleteMany({ userId });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'An error occurred while deleting the user' });
    }
};

const createProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, createdBy, projectManager } = req.body;

        const project = new Project({
            name,
            description,
            startDate,
            endDate,
            createdBy,
            projectManager,
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const usersCategory = await Project.find();
        res.json(usersCategory);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};


// Get a single project by ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a project
const updateProject = async (req, res) => {
    try {
        const { name, description, startDate, endDate, projectManager } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                startDate,
                endDate,
                projectManager,
            },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createTask = async (req, res) => {
    try {
        const { name, description, teamMember, project } = req.body;
        const task = new Task({
            name,
            description,
            teamMember,
            project,
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};


// Update a task
const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                status:status
            },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getOneUser,
    updateUser,
    createEmployeeCategory,
    deleteEmployeeCategory,
    getAllEmployeeCategory,
    getAllUsers,
    getAllUsersCategory,
    deleteUser,
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    createTask,
    getAllTasks,
    updateTask
};
