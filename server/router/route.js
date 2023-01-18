import express from 'express';
import { addDepartment, getDepartments } from '../controller/departmentController.js';
import { login,verifyToken } from '../controller/login.js';
const router = express.Router();

router.post('/login',login);
router.post('/verifyToken',verifyToken);
router.post('/addDepartment',addDepartment);
router.get('/getAllDepartments',getDepartments)

export default router;