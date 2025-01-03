import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './features/dataStorageSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        dataStorageS: dataReducer
    }
  })
}