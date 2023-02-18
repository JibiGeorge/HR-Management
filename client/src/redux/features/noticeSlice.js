import { createSlice } from "@reduxjs/toolkit";

export const noticeSlice = createSlice({
    name: 'notices',
    initialState: {
        allNotices: ''
    },
    reducers: {
        setAllNotices: (state, data) => {
            state.allNotices = data.payload;
        }
    }
})

export const { setAllNotices } = noticeSlice.actions;