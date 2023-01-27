import express from 'express';
import { addDepartment, deleteDeparatment, getDepartments, updateDepartment } from '../controller/departmentController.js';
import { addDesignation, deleteDesignation, getAllDesignation } from '../controller/designationController.js';
import { addEmployee, getAllEmployees, getEmployeeData, updateProfile } from '../controller/employeeController.js';
import { login, verifyToken } from '../controller/login.js';
const router = express.Router();

router.post('/login', login);
router.post('/verifyToken', verifyToken);

router.post('/addDepartment', addDepartment);
router.get('/getAllDepartments', getDepartments)
router.delete('/deleteDepartment', deleteDeparatment)
router.put('/updateDepartment', updateDepartment)

// Designation Routes
router.post('/addDesignation', addDesignation)
router.get('/getAllDesignation', getAllDesignation)
router.delete('/deleteDesignation', deleteDesignation)

// Employee Routes
router.post('/employee/add', addEmployee)
router.get('/employee/getAllEmployees', getAllEmployees)
router.get('/employee/getEmployeeData',getEmployeeData)
router.put('/employee/updateProfile',updateProfile)

export default router;