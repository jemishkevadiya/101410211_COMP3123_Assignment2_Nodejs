const express = require('express');
const { check } = require('express-validator');
const { verifyToken } = require('../middleware/authMiddleware');
const { getAllEmployee, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

const router = express.Router();

router.get('/employees', verifyToken, getAllEmployee);
router.get('/employees/:eid', verifyToken, getEmployeeById);

router.post('/employees', verifyToken, [
    check('first_name', 'First name should not be empty').not().isEmpty(),
    check('last_name', 'Last name should not be empty').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('position', 'Position should not be empty').not().isEmpty(),
    check('salary', 'Salary must be a number').isNumeric(),
    check('date_of_joining', 'Date of joining must be a valid date').isDate(),
    check('department', 'Department should not be empty').not().isEmpty()
], createEmployee);

router.put('/employees/:eid', verifyToken, [
    check('first_name', 'First name should not be empty').not().isEmpty(),
    check('last_name', 'Last name should not be empty').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('position', 'Position should not be empty').not().isEmpty(),
    check('salary', 'Salary must be a number').isNumeric(),
    check('date_of_joining', 'Date of joining must be a valid date').isDate(),
    check('department', 'Department should not be empty').not().isEmpty()
], updateEmployee);

router.delete('/employees/:eid', verifyToken, deleteEmployee);

module.exports = router;
