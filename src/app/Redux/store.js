import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import userReducer from './userSlice'
// import occupiedCemeteriesReducer from './occupiedCemeteriesSlice'
// import reservedCemeteriesReducer from './reservedCemeteriesSlice'
// import cemeteryReducer from './cemeterySlice'
// import newCemeteryReducer from './newCemeterySlice'


export const store = configureStore({
    reducer: {
        authToken: authReducer,
        user: userReducer,
        // occupiedCemeteries: occupiedCemeteriesReducer,
        // reservedCemeteries: reservedCemeteriesReducer,
        // cemetery: cemeteryReducer,
        // newCemetery: newCemeteryReducer,
    },
})