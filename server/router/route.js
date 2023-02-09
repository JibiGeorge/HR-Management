import express from 'express';
import { addAssets, addAssetsCategory, deleteAssets, deleteAssetsCategory, getAllAssetsCategories, getAssetCategoryData, getAssetData, getAssets, updateAsset, updateCategory } from '../controller/assetsController.js';
import { addAttendance, deleteAttendance, getAttendanceData, getAttendanceList, updateAttendance } from '../controller/attendanceController.js';
import { generateCredentials, reGenerateCredentials } from '../controller/credentialsController.js';
import { addDepartment, deleteDeparatment, getDepartments, updateDepartment } from '../controller/departmentController.js';
import { addDesignation, deleteDesignation, getAllDesignation } from '../controller/designationController.js';
import { addEducation, getEducation } from '../controller/educationController.js';
import { addEmployeeAddress, getEmployeeAddress } from '../controller/employeeAddressController.js';
import { addEmployeeBankAccount, getEmployeeBankAccount } from '../controller/employeeBankAccount.js';
import { addEmergencyContacts, getEmergencyContacts } from '../controller/employeeContacts.js';
import { addEmployee, getAllEmployees, getEmployeeData, updatePersonal, updateProfile } from '../controller/employeeController.js';
import { addHoliday, deleteHoliday, getAllHolidays, getHolidayData, updateHolidayData } from '../controller/holidayController.js';
import { addJobRoleLeaves, getAllJobRoleLeaves } from '../controller/jobRoleLeavesController.js';
import { applyLeave, getAllApplications, getUserLeaveApplications, updateLeaveStatus } from '../controller/leaveApplicatonController.js';
import { addLeaveType, deleteLeaveType, getAllLeaveTypes, getLeaveTypeData, updateLeaveType } from '../controller/leaveTypeController.js';
import { login } from '../controller/login.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/login', login);
// router.post('/verifyToken', verifyToken);

router.post('/addDepartment', auth, addDepartment);
router.get('/getAllDepartments', auth, getDepartments)
router.delete('/deleteDepartment', auth, deleteDeparatment)
router.put('/updateDepartment', auth, updateDepartment)

// Designation Routes
router.post('/addDesignation', auth, addDesignation)
router.get('/getAllDesignation', auth, getAllDesignation)
router.delete('/deleteDesignation', auth, deleteDesignation)

// Employee Routes
router.post('/employee/add', auth, addEmployee)
router.get('/employee/getAllEmployees', auth, getAllEmployees)
router.get('/employee/getEmployeeData', auth, getEmployeeData)
router.put('/employee/updateProfile', auth, updateProfile)
router.put('/employee/personalinfo/update/:id', auth, updatePersonal)

// Asstes Category
router.post('/assetsCategory/add', auth, addAssetsCategory)
router.get('/assetsCategory/get', auth, getAllAssetsCategories)
router.delete('/assetsCategory/delete', auth, deleteAssetsCategory)
router.get('/assetsCategory/getData/:id', auth, getAssetCategoryData)
router.put('/assetsCategory/update', auth, updateCategory)

// Assets
router.post('/assets/add', auth, addAssets)
router.get('/assets/get', auth, getAssets)
router.delete('/assets/delete/:id', auth, deleteAssets)
router.get('/assets/getData/:id', auth, getAssetData)
router.put('/assets/update', auth, updateAsset)

// Holiday
router.post('/holiday/add', auth, addHoliday)
router.get('/holidays/getAll', auth, getAllHolidays)
router.delete('/holidays/delete/:id', auth, deleteHoliday)
router.get('/holidays/getData/:id', auth, getHolidayData)
router.put('/holidays/update', auth, updateHolidayData)

// LeaveType
router.post('/leaveType/add', auth, addLeaveType)
router.get('/leaveType/getAll', auth, getAllLeaveTypes)
router.delete('/leaveType/delete/:id', auth, deleteLeaveType)
router.get('/leaveType/getLeaveTypeData/:id', auth, getLeaveTypeData)
router.put('/leaveType/update/', auth, updateLeaveType)

// Attendance
router.post('/attendance/add', auth, addAttendance)
router.get('/attendance/getAll', auth, getAttendanceList)
router.delete('/attendance/delete/:id', auth, deleteAttendance)
router.get('/attendance/getData/:id', auth, getAttendanceData)
router.put('/attendance/update', auth, updateAttendance)

// Employee Address
router.get('/employee/address/:id', auth, getEmployeeAddress)
router.post('/employee/address/add/:id', auth, addEmployeeAddress)

// Employee Bank Account
router.put('/employee/bankAccount/add/:id', auth, addEmployeeBankAccount)
router.get('/employee/bankAccount/get/:id', auth, getEmployeeBankAccount)

// Employee Emergency contacts
router.put('/employee/contacts/add/:id', auth, addEmergencyContacts);
router.get('/employee/contatcts/get/:id', auth, getEmergencyContacts);

// Employee Education
router.put('/employee/eduation/add/:id', auth, addEducation);
router.get('/employee/education/get/:id', auth, getEducation);

//Job Role Leaves
router.post('/leave/jobRoleLeave/add', auth, addJobRoleLeaves);
router.get('/leave/jobRoleLeave/getAll', auth, getAllJobRoleLeaves);

// credentialGenrate for Employees
router.post('/employee/credentialGenrate/:id', auth, generateCredentials);
router.put('/employee/credential/reGenerate/:id', auth, reGenerateCredentials);

// Leave Application
router.post('/leave/applyLeave', auth, applyLeave);
router.get('/leave/userLeaveApplications', auth, getUserLeaveApplications);
router.get('/leave/allApplications/get',auth, getAllApplications);
router.put('/leave/allApplications/updateStatus',auth, updateLeaveStatus);


export default router;