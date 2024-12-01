const express = require('express');
const { check } = require('express-validator');
const { signup, login } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], signup);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], login);

module.exports = router;
