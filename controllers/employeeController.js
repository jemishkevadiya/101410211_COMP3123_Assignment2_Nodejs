const Employee = require('../models/employee');

// createEmployee function to create a new employee.
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        position,
        salary,
        date_of_joining,
        department
    });

    try {
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee_id: newEmployee._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// getAllEmployee function to get all informations of employees.
exports.getAllEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

// getEmployeeById function to get information of perticular employee.
exports.getEmployeeById = async (req, res) => {
    const {eid} = req.params;
    try {
        const employee = await Employee.findById(eid);
        if (!employee) throw new Error('Employee not found');
        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

// updateEmployee function to update some informations of employee.
exports.updateEmployee = async (req, res) => {
    const {eid} = req.params;
    const updates = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, updates, {new: true});
        if (!updatedEmployee)  throw new Error('Employee not found');
        res.status(200).send(JSON.stringify({'message': 'Employee updated successfully', updatedEmployee}));
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

// deleteEmployee function to delete employee by their ID.
exports.deleteEmployee = async (req, res) => {
    const {eid} = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) throw new Error('Employee not found');
        res.status(204).json({message: 'Employee deleted successfully'});
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}
