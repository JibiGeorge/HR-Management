import { createSlice } from "@reduxjs/toolkit";

export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState: {
        attendance : []
    },
    reducers: {
        setAllAttendance: (state, data)=>{
            state.attendance = data.payload
        }
    }
})

export const {setAllAttendance} = attendanceSlice.actions