import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance.js'; // Add .js extension

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await axiosInstance.get('/api/boards');
  return response.data;
});

export const saveBoard = createAsyncThunk('boards/saveBoard', async (board) => {
  const response = board._id 
    ? await axiosInstance.put(`/api/boards/${board._id}`, board)
    : await axiosInstance.post('/api/boards', board);
  return response.data;
});

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id) => {
  await axiosInstance.delete(`/api/boards/${id}`);
  return id;
});

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(saveBoard.fulfilled, (state, action) => {
        const existingIndex = state.boards.findIndex(
          b => b._id === action.payload._id
        );
        if (existingIndex !== -1) {
          state.boards[existingIndex] = action.payload;
        } else {
          state.boards = [...state.boards, action.payload];
        }
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        console.log('Deleted board ID:', action.payload);
        console.log('Boards before filter:', state.boards);

        state.boards = state.boards.filter(b => b._id !== action.payload);

        console.log('Boards after filter:', state.boards);
      });
  },
});

export default boardsSlice.reducer;