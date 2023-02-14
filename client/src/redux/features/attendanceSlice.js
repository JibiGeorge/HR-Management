import { createSlice } from "@reduxjs/toolkit";

export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState: {
        attendance : []
    },
    reducers: {
        setAllAttendance: (state, data)=>{
            // for(let i=0; i<data.payload.length;i++){
            //     let date = data.payload[i].date
            //     data.payload[i].date= new Date(date).toISOString().slice(0, 10)
            // }   
            
            state.attendance = data.payload
        }
    }
})

export const {setAllAttendance} = attendanceSlice.actions