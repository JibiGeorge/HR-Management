import { createSlice } from "@reduxjs/toolkit";

export const leaveApplicationSlice = createSlice({
    name: 'leaveApplications',
    initialState: {
        userLeaveApplications: []
    },
    reducers: {
        setUserLeaveApplications: (state,data)=>{
            let applications = data.payload?.applications
            for(let i=0; i<applications?.leaveApplications.length;i++){
                let apply = applications?.leaveApplications[i].applyDate
                let from = applications?.leaveApplications[i].fromDate
                let to = applications?.leaveApplications[i].toDate
                applications.leaveApplications[i].applyDate= new Date(apply).toISOString().slice(0, 10)
                applications.leaveApplications[i].fromDate= new Date(from).toISOString().slice(0, 10)
                applications.leaveApplications[i].toDate= new Date(to).toISOString().slice(0, 10)
            }
            state.userLeaveApplications = applications
        }
    }
});

export const {setUserLeaveApplications} = leaveApplicationSlice.actions;