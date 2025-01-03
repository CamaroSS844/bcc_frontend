import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const dataStorageSlice = createSlice({
  name: "dataStorageS", // Ensure this matches the key in the store
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.data = [...action.payload]; // Update the state with the payload
    }, 
    addNew: (state, action) => {
      // Implement adding a new grave
      state.data = [...state.data, action.payload];
    },
    updateGrave: (state, action) => {
      // Implement updating a grave
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    }
  },
});

// Correct selector to access the data
export const dataSelector = (state) => state.dataStorageS.data;

// Export the reducer and actions
export const { initialize, addNew, updateGrave } = dataStorageSlice.actions;

export default dataStorageSlice.reducer;
