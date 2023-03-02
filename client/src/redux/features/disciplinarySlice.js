import { createSlice } from "@reduxjs/toolkit";

export const disciplinarySlice = createSlice({
    name: 'disciplinary',
    initialState:{
        disciplinaryData: []
    },
    reducers:{
        setDisciplinaryData : (state, data)=>{
            state.disciplinaryData =data.payload
        }
    }
})

export const {setDisciplinaryData} = disciplinarySlice.actions;