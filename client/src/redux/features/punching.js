import { createSlice } from "@reduxjs/toolkit";

export const punchingSlice = createSlice({
    name: 'punching',
    initialState: {
        punchingData: ''
    },
    reducers: {
        setPunchingData: (state, data) => {
            state.punchingData = data?.payload;
        }
    }
})

export const { setPunchingData } = punchingSlice.actions;