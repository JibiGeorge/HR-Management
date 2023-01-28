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
    assets: assetsSlice.reducer
});

const persistReduhcer = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer: persistReduhcer
})