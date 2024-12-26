import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userName: null,
    userType: null,
}

export const occupiedCemeteriesSlice = createSlice({
    name: 'occupiedCemeteriesS',
    initialState,
    reducers: {
        toAdd: (state = {}, action) => {
            state.value = { ...action.payload }
        }
    }
})

export const { newUserLogin, userLogout } = occupiedCemeteriesSlice.actions

export default occupiedCemeteriesSlice.reducer