import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance.js";

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
  const response = await axiosInstance.get('/boards');
  return response.data;
});

export const saveBoard = createAsyncThunk('boards/saveBoard', async board => {
  const response = board.id
    ? await axiosInstance.put(`/boards/${board.id}`, board)
    : await axiosInstance.post('/boards', board);
  return response.data;
});

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async id => {
  await axiosInstance.delete(`/boards/${id}`);
  return id;
});

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
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
        state.boards = state.boards.filter(b => b._id !== action.payload);
      });
  },
});

export default boardsSlice.reducer;
