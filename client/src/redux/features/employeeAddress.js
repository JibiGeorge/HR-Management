import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
    name: 'employeeAddress',
    initialState:{
        employeeAddress: ''
    },
    reducers:{
        setEmployeeAddress: (state, data)=>{
            state.employeeAddress = data.payload;
        }
    }
})

export const { setEmployeeAddress } = addressSlice.actions