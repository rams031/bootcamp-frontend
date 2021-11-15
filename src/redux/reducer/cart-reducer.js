import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartlist: []
    },
    reducers: {
        cartListChange: (state, action) => {
            state.cartlist= action.payload;
        }
    }
})

export const { cartListChange } = cartSlice.actions;
export default cartSlice.reducer;