import { createSlice } from "@reduxjs/toolkit";

export const logSlice = createSlice({
    name: 'log',
    initialState: {
        loglist: []
    },
    reducers: {
        logListChange: (state, action) => {
            state.loglist= action.payload;
        }
    }
})

export const { logListChange } = logSlice.actions;
export default logSlice.reducer;