import { combineReducers } from 'redux';

// Reducers
const initialState = {
    toggle: false
};

const markerPopUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_DETAILS':
      return { ...state, toggle: !state.counter };
    case 'ADD_DETAILS':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  toggleMarkerAction: markerPopUpReducer,
  // Add other reducers here if you have more
});

export default rootReducer;