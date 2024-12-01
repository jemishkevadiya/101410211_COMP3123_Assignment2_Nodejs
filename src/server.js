// Importing express library.
const express = require('express')
// Imported mongoose library.
const mongoose = require('mongoose')
// Importing userRoutes from routes/users
const userRoutes = require('../routes/users_routes');
// Importing employeeRoutes from routes/employees
const employeeRoutes = require('../routes/employees_routes');

// loading .env file to get URI of batabase.
require('dotenv').config();

const app = express();
app.use(express.json());

// declared server port.
const SERVER_PORT = process.env.SERVER_PORT;

// Route for handling user-related endpoints
app.use('/api/v1/user', userRoutes);
// Route for handling employee-related endpoints
app.use('/api/v1/emp', employeeRoutes);

// connect to MongoDB using mongoose.
// The connection string is fetched from the environment variable 'MONGODB_URI' if available,
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Welcome message to test.
app.get('/', (req, res) => {
    res.send('Welcome to my WebApplication');
})

// Start the server and listen on the specified port.
app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});

