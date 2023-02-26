import { createSlice } from "@reduxjs/toolkit";

export const PayrolSlice = createSlice({
    name: 'payrol',
    initialState: {
        generatedPayrolData: [],
        paidPayrolLiist: []
    },
    reducers: {
        setGeneratedPayrolData: (state, data) => {
            state.generatedPayrolData = data.payload;
        },
        setPaidPayrolData: (state, data) => {
            state.paidPayrolLiist = data.payload;
        }
    }
})

export const { setGeneratedPayrolData, setPaidPayrolData } = PayrolSlice.actions