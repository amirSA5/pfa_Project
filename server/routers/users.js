const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getOneUser, updateUser, createEmployeeCategory, deleteEmployeeCategory, getAllEmployeeCategory, getAllUsers, deleteUser, createProject,
    getAllProjects,
    getProjectById,
    updateProject, deleteProject,createTask,
    getAllTasks,
    updateTask } = require('../controllers/usersController'); // Import the registerUser function from the controller

router.post('/register', registerUser); // Use registerUser as the callback function for the post method
router.post('/login', loginUser); // Use loginUser as the callback function for the post method
router.get('/:id', getOneUser);
router.put('/update/:id', updateUser);
router.post('/employeeCategory', createEmployeeCategory);
router.delete('/employeeCategory/:id', deleteEmployeeCategory);
router.get('/employeeCategory/:id', getAllEmployeeCategory);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.post('/projects', createProject);
router.get('/projects/getAllProjects', getAllProjects);
router.get('/projects/:id', getProjectById);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
router.post('/tasks', createTask);
router.get('/tasks/getAllTasks', getAllTasks);
router.put('/tasks/:taskId', updateTask);

module.exports = router;
