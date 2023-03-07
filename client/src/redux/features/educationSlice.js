import { createSlice } from "@reduxjs/toolkit";

export const EducationSlice = createSlice({
    name: 'education',
    initialState: {
        education: ''
    },
    reducers:{
        setEducations: (state, data)=>{
            state.education = data.payload
        }
    }
})

export const { setEducations } = EducationSlice.actions