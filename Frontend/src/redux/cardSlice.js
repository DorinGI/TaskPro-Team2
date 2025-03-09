// src/redux/cardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance.js';

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async columnId => {
    const response = await axiosInstance.get(
      `/cards/columns/${columnId}/cards`
    );
    return { columnId, cards: response.data };
  }
);

export const createCard = createAsyncThunk(
  'cards/createCard',
  async ({ columnId, cardData }) => {
    const response = await axiosInstance.post(
      `/columns/${columnId}/cards`,
      cardData
    );
    return response.data;
  }
);

// export const createCard = createAsyncThunk('cards/create', async cardData => {
//   const response = await axiosInstance.post('/cards', cardData);
//   return response.data;
// });

export const deleteCard = createAsyncThunk('cards/delete', async cardId => {
  await axiosInstance.delete(`/cards/${cardId}`);
  return cardId;
});

const cardSlice = createSlice({
  name: 'cards',
  initialState: { cardsByColumn: {} },
  extraReducers: builder => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cardsByColumn[action.payload.columnId] = action.payload.cards;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        const columnId = action.payload.columnId;
        if (!state.cardsByColumn[columnId]) {
          state.cardsByColumn[columnId] = [];
        }
        state.cardsByColumn[columnId].push(action.payload);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        for (const columnId in state.cardsByColumn) {
          state.cardsByColumn[columnId] = state.cardsByColumn[columnId].filter(
            card => card._id !== action.payload
          );
        }
      });
  },
});

export default cardSlice.reducer;
