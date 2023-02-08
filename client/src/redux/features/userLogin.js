import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userDetails: [],
    },
    reducers: {
        setUserDetails: (state, response) => {
            state.userDetails = response.payload;
            console.log(state.userDetails);
        }
    }
})

export const { setUserDetails } = userSlice.actions;