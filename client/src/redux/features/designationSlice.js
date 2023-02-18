import { createSlice } from '@reduxjs/toolkit';

export const designationSlice = createSlice({
    name: 'designation',
    initialState: {
        designationDetails: []
    },
    reducers: {
        setDesignatonData: (state, data) => {
            console.log(data.payload);
            state.designationDetails = data.payload
        },
        deleteDesigntionData: (state, id) => {
            state.designationDetails = state.designationDetails.filter(data => data._id !== id.payload)
        }
    }
})

export const { setDesignatonData, deleteDesigntionData } = designationSlice.actions