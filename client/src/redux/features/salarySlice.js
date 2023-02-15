import { createSlice } from "@reduxjs/toolkit";

export const SalarySlice = createSlice({
    name: 'employeeSalary',
    initialState: {
        salaryDetails: []
    },
    reducers: {
        setEmployeeSalaryDetails: (state, data) => {
            state.salaryDetails = data.payload
        }
    }
})

export const { setEmployeeSalaryDetails } = SalarySlice.actions