import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth_token: ''
    },
    reducers: {
        setAuth: (state, action) => {
            if(action.payload) {
                state.cartlist= action?.payload;
            } 
        },
        unSetAuth: (state, action) => {
            if(action.payload) {
                state.cartlist = '';
            } 
        }
    }
})

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;