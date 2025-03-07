import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice.js';
import boardsReducer from './boardsSlice.js';
import columnReducer from './columnSlice.js'; 
import cardReducer from './cardSlice.js';
import themeReducer from './themeSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    columns: columnReducer,
    cards: cardReducer,
    theme: themeReducer,
  },
});

export default store; 