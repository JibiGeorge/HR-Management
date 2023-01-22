import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employeesDetails: []
    },
    reducers: {
        setEmployeesData: (state, data) => {
            state.employeesDetails = data.payload
        }
    }
})

export const { setEmployeesData } = employeeSlice.actions