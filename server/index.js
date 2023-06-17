const express = require('express');
const app = express();
const connectDB = require('./database/db'); // Adjust the path based on your file structure
const cors = require('cors');
const usersRouter = require('./routers/users'); // Import the users router

require('dotenv').config();

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Use the usersRouter middleware for the '/api/users' route
app.use('/api/users', usersRouter);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
