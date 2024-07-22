const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// Mock data
let employees = [
    { id: 1, name: 'John Doe', hourlyRate: 20, hoursWorked: 40 },
    { id: 2, name: 'Jane Smith', hourlyRate: 22, hoursWorked: 35 },
];

// Get all employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

// Add a new employee
app.post('/employees', (req, res) => {
    const newEmployee = {
        id: employees.length + 1,
        name: req.body.name,
        hourlyRate: req.body.hourlyRate,
        hoursWorked: req.body.hoursWorked,
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Calculate payroll for an employee
app.get('/employees/:id/payroll', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }
    const payroll = {
        employeeId: employee.id,
        name: employee.name,
        totalPay: employee.hourlyRate * employee.hoursWorked,
    };
    res.json(payroll);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
