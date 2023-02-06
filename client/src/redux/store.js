import { configureStore } from '@reduxjs/toolkit';
import { adminSlice } from './features/adminLogin';
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

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const reducer = combineReducers({
    alerts: alertSlice.reducer,
    admin: adminSlice.reducer,
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
    education: EducationSlice.reducer
});

const persistReduhcer = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer: persistReduhcer
})