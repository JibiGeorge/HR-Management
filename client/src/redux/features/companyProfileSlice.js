import { createSlice } from "@reduxjs/toolkit";

export const companyProfileSlice = createSlice({
    name: 'companyProfile',
    initialState:{
        companyProfileData:''
    },
    reducers :{
        setCompanyProfileData : (state, actions)=>{
            state.companyProfileData = actions.payload;
        }
    }
})

export const {setCompanyProfileData} = companyProfileSlice.actions;