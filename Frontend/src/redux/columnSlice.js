// src/redux/columnSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance.js';

// Async Thunk: Fetch Columns for a Specific Board
export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (boardId) => {
    const response = await axiosInstance.get(`columns/boards/${boardId}/columns`);
    return response.data;
  }
);

// Async Thunk: Save or Update a Column
export const saveColumn = createAsyncThunk(
  'columns/saveColumn',
  async (column) => {
    const response = column.id
      ? await axiosInstance.put(`/columns/${column.id}`, column)
      : await axiosInstance.post('/columns', column);
    return response.data;
  }
);

// Async Thunk: Delete a Column
export const deleteColumn = createAsyncThunk(
  'columns/delete',
  async (columnId) => {
    await axiosInstance.delete(`/columns/${columnId}`);
    return columnId;
  }
);

const columnSlice = createSlice({
  name: 'columns',
  initialState: {
    columns: [], // Array of columns, each with an array of cards
    loading: false,
  },
  reducers: {
    // Reorder Cards Within the Same Column
    reorderCards: (state, action) => {
      const { columnId, startIndex, endIndex } = action.payload;

      // Find the column by ID
      const column = state.columns.find((col) => col._id === columnId);

      // Ensure the column exists and has a valid `cards` array
      if (!column || !Array.isArray(column.cards)) {
        console.error('Invalid column ID or missing cards array:', columnId);
        return;
      }

      // Perform the reordering
      const [removed] = column.cards.splice(startIndex, 1);
      column.cards.splice(endIndex, 0, removed);
    },

    // Move a Card Between Columns
    moveCard: (state, action) => {
      const { sourceColumnId, destColumnId, sourceIndex, destIndex } = action.payload;

      // Find the source and destination columns
      const sourceColumn = state.columns.find((col) => col._id === sourceColumnId);
      const destColumn = state.columns.find((col) => col._id === destColumnId);

      // Ensure both columns exist and have valid `cards` arrays
      if (
        !sourceColumn ||
        !destColumn ||
        !Array.isArray(sourceColumn.cards) ||
        !Array.isArray(destColumn.cards)
      ) {
        console.error('Invalid column IDs or missing cards array:', {
          sourceColumnId,
          destColumnId,
        });
        return;
      }

      // Move the card
      const [removed] = sourceColumn.cards.splice(sourceIndex, 1);
      destColumn.cards.splice(destIndex, 0, removed);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Columns: Pending State
      .addCase(fetchColumns.pending, (state) => {
        state.loading = true;
      })
      // Fetch Columns: Success State
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.loading = false;

        // Ensure the fetched data is an array and initialize `cards` arrays if missing
        state.columns = Array.isArray(action.payload)
          ? action.payload.map((column) => ({
              ...column,
              cards: Array.isArray(column.cards) ? column.cards : [],
            }))
          : [];
      })
      // Save Column: Success State
      .addCase(saveColumn.fulfilled, (state, action) => {
        const existingIndex = state.columns.findIndex(
          (column) => column._id === action.payload._id
        );

        if (existingIndex !== -1) {
          // Update existing column
          state.columns[existingIndex] = {
            ...action.payload,
            cards: Array.isArray(action.payload.cards) ? action.payload.cards : [],
          };
        } else {
          // Add new column with an initialized `cards` array
          state.columns.push({
            ...action.payload,
            cards: Array.isArray(action.payload.cards) ? action.payload.cards : [],
          });
        }
      })
      // Delete Column: Success State
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.columns = state.columns.filter((col) => col._id !== action.payload);
      });
  },
});

export const { reorderCards, moveCard } = columnSlice.actions;
export default columnSlice.reducer;