const express = require('express');
const { check } = require('express-validator');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  getAllEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const Employee = require('../models/employee'); // Import Employee model for search functionality

const router = express.Router();

// Search employees by query (first_name, last_name, position, or department)
router.get('/employees/search', verifyToken, async (req, res) => {
    const query = req.query.query; // Extract search term from query parameters
  
    try {
      const employees = await Employee.find({
        $or: [
          { first_name: { $regex: query, $options: 'i' } },
          { last_name: { $regex: query, $options: 'i' } },
          { position: { $regex: query, $options: 'i' } },
          { department: { $regex: query, $options: 'i' } },
        ],
      });
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search employees' });
    }
  });
  
// Get all employees
router.get('/employees', verifyToken, getAllEmployee);

// Get employee by ID
router.get('/employees/:eid', verifyToken, getEmployeeById);

// Create a new employee
router.post(
  '/employees',
  verifyToken,
  [
    check('first_name', 'First name should not be empty').not().isEmpty(),
    check('last_name', 'Last name should not be empty').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('position', 'Position should not be empty').not().isEmpty(),
    check('salary', 'Salary must be a number').isNumeric(),
    check('date_of_joining', 'Date of joining must be a valid date').isDate(),
    check('department', 'Department should not be empty').not().isEmpty(),
  ],
  createEmployee
);

// Update an employee
router.put(
  '/employees/:eid',
  verifyToken,
  [
    check('first_name', 'First name should not be empty').not().isEmpty(),
    check('last_name', 'Last name should not be empty').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('position', 'Position should not be empty').not().isEmpty(),
    check('salary', 'Salary must be a number').isNumeric(),
    check('date_of_joining', 'Date of joining must be a valid date').isDate(),
    check('department', 'Department should not be empty').not().isEmpty(),
  ],
  updateEmployee
);

// Delete an employee
router.delete('/employees/:eid', verifyToken, deleteEmployee);

module.exports = router;
