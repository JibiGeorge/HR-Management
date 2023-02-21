import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './features/userLogin';
import { alertSlice } from './features/alertSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { departmentSlice } from './features/departmentSlice';
import { designationSlice } from './features/designationSlice';
import { employeeSlice } from './features/employee';
import { assetsCategorySlice } from './features/assetsCategorySlice';
import { assetsSlice } from './features/assetsSlice';
import { holidaySlice } from './features/holidaySlice';
import { leaveTypeSlice } from './features/leaveTypeSlice';
import { attendanceSlice } from './features/attendanceSlice';
import { addressSlice } from './features/employeeAddress';
import { bankAccountSlice } from './features/bankAccountSlice';
import { ContactsSlice } from './features/contactsSlice';
import { EducationSlice } from './features/educationSlice';
import { jobRoleLeavesSlice } from './features/jobRoleLeavesSlice';
import { leaveApplicationSlice } from './features/leaveApplicationsSlice';
import { punchingSlice } from './features/punching';
import { SalarySlice } from './features/salarySlice';
import { noticeSlice } from './features/noticeSlice';
import { companyProfileSlice } from './features/companyProfileSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const reducer = combineReducers({
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
    department: departmentSlice.reducer,
    designation: designationSlice.reducer,
    employees: employeeSlice.reducer,
    assetsCategory: assetsCategorySlice.reducer,
    assets: assetsSlice.reducer,
    holiday: holidaySlice.reducer,
    leaveType: leaveTypeSlice.reducer,
    attendance: attendanceSlice.reducer,
    employeeAddress: addressSlice.reducer,
    empBankAccount: bankAccountSlice.reducer,
    emergencyContacts: ContactsSlice.reducer,
    education: EducationSlice.reducer,
    jobRoleLeaves: jobRoleLeavesSlice.reducer,
    leaveApplications: leaveApplicationSlice.reducer,
    punching: punchingSlice.reducer,
    employeeSalary: SalarySlice.reducer,
    notices : noticeSlice.reducer,
    companyProfile: companyProfileSlice.reducer
});

const persistReduhcer = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer: persistReduhcer
})