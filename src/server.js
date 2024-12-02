// Importing express library.
const express = require('express')
// Imported mongoose library.
const mongoose = require('mongoose')
// Importing userRoutes from routes/users
const userRoutes = require('../routes/users_routes');
// Importing employeeRoutes from routes/employees
const employeeRoutes = require('../routes/employees_routes');
const cors = require('cors');

// loading .env file to get URI of batabase.
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(
    cors({
      origin: 'http://localhost:3001', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// declared server port.
const SERVER_PORT = process.env.SERVER_PORT;

// Route for handling user-related endpoints
app.use('/api/user', userRoutes);
// Route for handling employee-related endpoints
app.use('/api/emp', employeeRoutes);

// connect to MongoDB using mongoose.
// The connection string is fetched from the environment variable 'MONGODB_URI' if available,
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Welcome message to test.
app.get('/', (req, res) => {
    res.send('Welcome to my WebApplication');
})

app.post('/api/user/login', (req, res) => {
    const { email, password } = req.body;
  
    if (email === 'test@example.com' && password === 'password') {
      return res.status(200).json({ message: 'Login successful', token: 'example_token' });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  });

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});

