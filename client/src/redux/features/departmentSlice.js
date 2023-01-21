import { createSlice } from '@reduxjs/toolkit';

export const departmentSlice = createSlice({
    name: 'department',
    initialState: {
        departmentDetails: []
    },
    reducers: {
        setDepartmentData: (state, data)=>{
            state.departmentDetails = data.payload;
        },
        deleteDepartmentData: (state, id)=>{
            state.departmentDetails = state.departmentDetails.filter(data => data._id !== id.payload)
        }
    }
})

export const {setDepartmentData,deleteDepartmentData} = departmentSlice.actions;