const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

// Mock database
let employees = {
    1: { name: "John Doe", position: "Software Engineer" },
    2: { name: "Jane Smith", position: "Project Manager" }
};

// Get all employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

// Get a specific employee by ID
app.get('/employees/:id', (req, res) => {
    const employee = employees[req.params.id];
    if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
});

// Create a new employee
app.post('/employees', (req, res) => {
    const newId = Object.keys(employees).length + 1;
    const newEmployee = {
        name: req.body.name,
        position: req.body.position
    };
    employees[newId] = newEmployee;
    res.status(201).json(newEmployee);
});

// Update an existing employee
app.put('/employees/:id', (req, res) => {
    const employee = employees[req.params.id];
    if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
    }
    employee.name = req.body.name || employee.name;
    employee.position = req.body.position || employee.position;
    res.json(employee);
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
    const employee = employees[req.params.id];
    if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
    }
    delete employees[req.params.id];
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Mock employee API listening at http://localhost:${port}`);
});
