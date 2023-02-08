import { createSlice } from '@reduxjs/toolkit';

export const assetsSlice = createSlice({
    name: "assets",
    initialState: {
        assets: null,
    },
    reducers: {
        setAssets: (state,data) => {
            state.assets = data.payload
        }
    }
})

export const { setAssets } = assetsSlice.actions;