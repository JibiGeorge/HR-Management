import { createSlice } from '@reduxjs/toolkit';

export const assetsCategorySlice = createSlice({
    name: "assetsCategory",
    initialState: {
        category: []
    },
    reducers: {
        setAssetsCategories: (state, data) => {
            state.category = data.payload.allAssetsCategories
        }
    }
})

export const { setAssetsCategories } = assetsCategorySlice.actions;