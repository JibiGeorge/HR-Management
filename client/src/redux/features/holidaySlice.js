import { createSlice } from '@reduxjs/toolkit';

export const holidaySlice = createSlice({
    name: 'holiday',
    initialState: {
        holidays: [],
    },
    reducers: {
        setHolidaysDetails: (state, data) => {
            state.holidays = data.payload
        }
    }
})

export const { setHolidaysDetails } = holidaySlice.actions