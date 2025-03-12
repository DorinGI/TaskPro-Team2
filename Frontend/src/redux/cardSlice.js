// src/redux/cardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance.js';

// Async Thunk: Fetch Cards for a Specific Column
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (columnId) => {
    const response = await axiosInstance.get(`/cards/column/${columnId}`);
    console.log('API response:', response.data);
    return { columnId, cards: response.data };
  }
);

// Async Thunk: Create a New Card
export const createCard = createAsyncThunk(
  'cards/createCard',
  async (cardData) => {
    const response = await axiosInstance.post('/cards', cardData);
    return response.data;
  }
);

// Async Thunk: Delete a Card
export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (cardId) => {
    await axiosInstance.delete(`/cards/${cardId}`);
    return cardId;
  }
);

const cardSlice = createSlice({
  name: 'cards',
  initialState: { cardsByColumn: {} },
  extraReducers: (builder) => {
    builder
      // Fetch Cards: Success State
      .addCase(fetchCards.fulfilled, (state, action) => {
        console.log('Fetched cards:', action.payload.cards);
        state.cardsByColumn[action.payload.columnId] = action.payload.cards;
      })
      // Create Card: Success State
      .addCase(createCard.fulfilled, (state, action) => {
        const columnId = action.payload.columnId;
        if (!state.cardsByColumn[columnId]) {
          state.cardsByColumn[columnId] = [];
        }
        state.cardsByColumn[columnId].push(action.payload);
      })
      // Delete Card: Success State
      .addCase(deleteCard.fulfilled, (state, action) => {
        for (const columnId in state.cardsByColumn) {
          state.cardsByColumn[columnId] = state.cardsByColumn[columnId].filter(
            (card) => card._id !== action.payload
          );
        }
      });
  },
});

export default cardSlice.reducer;