import { createSlice } from "@reduxjs/toolkit";

export const ContactsSlice = createSlice({
    name: 'emergencyContacts',
    initialState:{
        contacts : ''
    },
    reducers: {
        setContacts: (state, data)=>{
            state.contacts = data.payload;
        }
    }
})

export const {setContacts} = ContactsSlice.actions