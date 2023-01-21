import {createSlice} from '@reduxjs/toolkit';

export const designationSlice = createSlice({
    name: 'designation',
    initialState: {
        designationDetails: []
    },
    reducers: {
        setDesignatonData : (state, data)=>{
            state.designationDetails = data.payload.data
            console.log('===>',state.designationDetails);
        },
        deleteDesigntionData: (state, id)=>{
            state.designationDetails = state.designationDetails.filter(data => data._id !== id.payload)
        }
    }
})

export const {setDesignatonData, deleteDesigntionData} = designationSlice.actions