import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: null
}

export const authSlice = createSlice({
    name: 'authS',
    initialState,
    reducers: {
        newLoginToken: (state = {}, action) => {
            state.value = { ...action.payload }
        },
        clearLoginToken: (state) => {
            state.value = null
        }
    }
})

export const { newLoginToken, clearLoginToken } = authSlice.actions

export default authSlice.reducer