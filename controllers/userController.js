// Importing the User model from the models/user file
const User = require('../models/user');
// Importing bcrypt library to hashing passwords.
const bcrypt = require('bcrypt');
// importing jwt to create JWT TOKENS.
const jwt = require('jsonwebtoken');

// function to hash a plain text password.
const hashPassword = async password => await bcrypt.hash(password, 10);
// function to generate JWT token.
const generateToken = userId => jwt.sign({ id: userId }, process.env.JWT_SECRET);
// function to compare passwords.
const comparePass = async (password, hashPassword) => await bcrypt.compare(password, hashPassword);

// signup function to create a new user.
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully.', user_id: newUser._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// login function to authenticate an existing user.
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await comparePass(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Your password is incorrect.' });

        const token = generateToken(user._id);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

