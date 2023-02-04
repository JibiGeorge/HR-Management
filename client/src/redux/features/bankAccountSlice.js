import { createSlice } from "@reduxjs/toolkit";

export const bankAccountSlice = createSlice({
    name: 'empBankAccount',
    initialState: {
        empBankAccount: ''
    },
    reducers: {
        setBankAccount: (state, data)=>{
            state.empBankAccount = data.payload
        }
    }
})

export const {setBankAccount} = bankAccountSlice.actions