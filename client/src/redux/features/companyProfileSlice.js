import { createSlice } from "@reduxjs/toolkit";

export const companyProfileSlice = createSlice({
    name: 'companyProfile',
    initialState:{
        companyProfileData:'',
        companyIcon: ''
    },
    reducers :{
        setCompanyProfileData : (state, actions)=>{
            state.companyProfileData = actions.payload;
        },
        setCompanyIcon : (state,actions)=>{
            state.companyIcon = actions.payload
        }
    }
})

export const {setCompanyProfileData,setCompanyIcon} = companyProfileSlice.actions;