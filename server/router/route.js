import express from 'express';
import { addDepartment, deleteDeparatment, getDepartments, updateDepartment } from '../controller/departmentController.js';
import { login,verifyToken } from '../controller/login.js';
const router = express.Router();

router.post('/login',login);
router.post('/verifyToken',verifyToken);
router.post('/addDepartment',addDepartment);
router.get('/getAllDepartments',getDepartments)
router.delete('/deleteDepartment',deleteDeparatment)
router.put('/updateDepartment',updateDepartment)

export default router;