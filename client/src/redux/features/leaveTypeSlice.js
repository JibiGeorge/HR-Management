import { createSlice } from "@reduxjs/toolkit";

export const leaveTypeSlice = createSlice({
    name: 'leaveType',
    initialState: {
        leaveType: []
    },
    reducers: {
        setLeaveTypes: (state, data) => {
            state.leaveType = data.payload
        }
    }
})

export const { setLeaveTypes } = leaveTypeSlice.actions