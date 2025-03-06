import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance.js";

// Fetch boards from backend
export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const response = await axiosInstance.get("/boards");
  return response.data;
});

// Create or edit a board
export const saveBoard = createAsyncThunk("boards/saveBoard", async (board) => {
  const response = board.id
    ? await axiosInstance.put(`/boards/${board.id}`, board) // Edit
    : await axiosInstance.post("/boards", board); // Create
  return response.data;
});

// Delete a board
export const deleteBoard = createAsyncThunk(
  "boards/deleteBoard",
  async (id) => {
    await axiosInstance.delete(`/boards/${id}`);
    return id;
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
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
          (b) => b.id === action.payload.id
        );
        if (existingIndex !== -1) {
          state.boards[existingIndex] = action.payload;
        } else {
          state.boards.push(action.payload);
        }
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter((b) => b.id !== action.payload);
      });
  },
});

export default boardsSlice.reducer;
