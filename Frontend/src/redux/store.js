import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';

const initialState = {
  theme: 'Light',
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});
