import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance.js';

// Fetch boards from backend
export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await axiosInstance.get('/boards');
  return response.data;
});

// Create or edit a board
export const saveBoard = createAsyncThunk('boards/saveBoard', async board => {
  const response = board.id
    ? await axiosInstance.put(`/boards/${board.id}`, board) // Edit
    : await axiosInstance.post('/boards', board); // Create
  return response.data;
});

// Delete a board
export const deleteBoard = createAsyncThunk('boards/deleteBoard', async id => {
  await axiosInstance.delete(`/boards/${id}`);
  return id;
});

const boardsSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBoards.pending, state => {
        state.loading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveBoard.fulfilled, (state, action) => {
        const existingIndex = state.boards.findIndex(
          b => b._id === action.payload.id
        );
        if (existingIndex !== -1) {
          state.boards = state.boards.map(b =>
            b._id === action.payload.id ? action.payload : b
          );
        } else {
          state.boards = [...state.boards, action.payload]; // Creează un nou array
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
