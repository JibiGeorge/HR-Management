import express from 'express';
import { addAssets, addAssetsCategory, deleteAssets, deleteAssetsCategory, getAllAssetsCategories, getAssetCategoryData, getAssetData, getAssets, updateAsset, updateCategory } from '../controller/assetsController.js';
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

// Asstes Category
router.post('/assetsCategory/add',addAssetsCategory)
router.get('/assetsCategory/get',getAllAssetsCategories)
router.delete('/assetsCategory/delete',deleteAssetsCategory)
router.get('/assetsCategory/getData/:id',getAssetCategoryData)
router.put('/assetsCategory/update',updateCategory)

// Assets
router.post('/assets/add',addAssets)
router.get('/assets/get',getAssets)
router.delete('/assets/delete/:id',deleteAssets)
router.get('/assets/getData/:id',getAssetData)
router.put('/assets/update',updateAsset)

export default router;