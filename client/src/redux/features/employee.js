import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employeesDetails: [],
        employeeData : []
    },
    reducers: {
        setEmployeesData: (state, data) => {
            state.employeesDetails = data.payload
        },
        setEmpIndividualData: (state, data)=>{
            state.employeeData = data.payload
        }
    }
})

export const { setEmployeesData, setEmpIndividualData } = employeeSlice.actions