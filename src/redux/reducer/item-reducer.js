import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
    name: 'item',
    initialState: {
        itemlist: []
    },
    reducers: {
        itemListChange: (state, action) => {
            state.itemlist= action.payload;
        }
    }
})

export const { itemListChange } = itemSlice.actions;
export default itemSlice.reducer;