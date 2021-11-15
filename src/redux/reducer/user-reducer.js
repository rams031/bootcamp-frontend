import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        validate: false,
        email: '',
        username: '',
    },
    reducers: {
        validateChange: (state, action) => {
            state.validate= action.payload;
        },
        userEmailChange: (state, action) => {
            state.email= action.payload;
        },
        userUserNameChange: (state, action) => {
            state.username= action.payload;
        }
    }
})

export const { validateChange, userEmailChange, userUserNameChange } = userSlice.actions;
export default userSlice.reducer;