import { createSlice } from "@reduxjs/toolkit";

export const EducationSlice = createSlice({
    name: 'education',
    initialState: {
        education: ''
    },
    reducers:{
        setEducations: (state, data)=>{
            console.log('hcvjhc',data);
            state.education = data.payload
            console.log('state.education',state.education);
        }
    }
})

export const { setEducations } = EducationSlice.actions