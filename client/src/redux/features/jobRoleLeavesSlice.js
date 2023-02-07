import { createSlice } from "@reduxjs/toolkit";

export const jobRoleLeavesSlice = createSlice({
    name: 'jobRoleLeaves',
    initialState: {
        jobRoleLeaves : []
    },
    reducers: {
        setJobRoleLeaves: (state, data)=>{
            state.jobRoleLeaves = data.payload
        }
    }
})

export const {setJobRoleLeaves} = jobRoleLeavesSlice.actions;