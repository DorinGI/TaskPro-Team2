// src/redux/cardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance.js'; // Fixed path

export const createCard = createAsyncThunk('cards/create', async (cardData) => {
  const response = await axiosInstance.post('/cards', cardData);
  return response.data;
});

export const deleteCard = createAsyncThunk('cards/delete', async (cardId) => {
  await axiosInstance.delete(`/cards/${cardId}`);
  return cardId;
});

const cardSlice = createSlice({
  name: 'cards',
  initialState: { cards: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.cards.push(action.payload);
    });
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.cards = state.cards.filter(card => card._id !== action.payload);
    });
  },
});

export default cardSlice.reducer;