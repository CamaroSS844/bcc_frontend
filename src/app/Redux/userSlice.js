import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userName: null,
    userType: null,
}

export const userSlice = createSlice({
    name: 'userS',
    initialState,
    reducers: {
        newUserLogin: (state = {}, action) => {
            state.value = { ...action.payload }
        },
        userLogout: (state) => {
            state.value = null
        }
    }
})

export const { newUserLogin, userLogout } = userSlice.actions

export default userSlice.reducer