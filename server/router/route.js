import express from 'express';
import { addAssets, addAssetsCategory, deleteAssets, deleteAssetsCategory, getAllAssetsCategories, getAssetCategoryData, getAssetData, getAssets, updateAsset, updateCategory } from '../controller/assetsController.js';
import { addAttendance, deleteAttendance, getAttendanceData, getAttendanceList, updateAttendance } from '../controller/attendanceController.js';
import { addDepartment, deleteDeparatment, getDepartments, updateDepartment } from '../controller/departmentController.js';
import { addDesignation, deleteDesignation, getAllDesignation } from '../controller/designationController.js';
import { addEducation, getEducation } from '../controller/educationController.js';
import { addEmployeeAddress, getEmployeeAddress } from '../controller/employeeAddressController.js';
import { addEmployeeBankAccount, getEmployeeBankAccount } from '../controller/employeeBankAccount.js';
import { addEmergencyContacts, getEmergencyContacts } from '../controller/employeeContacts.js';
import { addEmployee, getAllEmployees, getEmployeeData, updatePersonal, updateProfile } from '../controller/employeeController.js';
import { addHoliday, deleteHoliday, getAllHolidays, getHolidayData, updateHolidayData } from '../controller/holidayController.js';
import { addJobRoleLeaves, getAllJobRoleLeaves } from '../controller/jobRoleLeavesController.js';
import { addLeaveType, deleteLeaveType, getAllLeaveTypes, getLeaveTypeData, updateLeaveType } from '../controller/leaveTypeController.js';
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
router.put('/employee/personalinfo/update/:id',updatePersonal)

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

// Holiday
router.post('/holiday/add',addHoliday)
router.get('/holidays/getAll',getAllHolidays)
router.delete('/holidays/delete/:id',deleteHoliday)
router.get('/holidays/getData/:id',getHolidayData)
router.put('/holidays/update',updateHolidayData)

// LeaveType
router.post('/leaveType/add',addLeaveType)
router.get('/leaveType/getAll',getAllLeaveTypes)
router.delete('/leaveType/delete/:id',deleteLeaveType)
router.get('/leaveType/getLeaveTypeData/:id',getLeaveTypeData)
router.put('/leaveType/update/',updateLeaveType)

// Attendance
router.post('/attendance/add',addAttendance )
router.get('/attendance/getAll',getAttendanceList)
router.delete('/attendance/delete/:id',deleteAttendance)
router.get('/attendance/getData/:id',getAttendanceData)
router.put('/attendance/update',updateAttendance)

// Employee Address
router.get('/employee/address/:id',getEmployeeAddress)
router.post('/employee/address/add/:id',addEmployeeAddress)

// Employee Bank Account
router.put('/employee/bankAccount/add/:id',addEmployeeBankAccount)
router.get('/employee/bankAccount/get/:id',getEmployeeBankAccount)

// Employee Emergency contacts
router.put('/employee/contacts/add/:id',addEmergencyContacts);
router.get('/employee/contatcts/get/:id',getEmergencyContacts)

// Employee Education
router.put('/employee/eduation/add/:id',addEducation)
router.get('/employee/education/get/:id',getEducation)

//Job Role Leaves
router.post('/leave/jobRoleLeave/add',addJobRoleLeaves)
router.get('/leave/jobRoleLeave/getAll',getAllJobRoleLeaves)


export default router;