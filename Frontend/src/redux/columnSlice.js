// src/redux/columnSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance.js'; 

export const createColumn = createAsyncThunk('columns/create', async (columnData) => {
  const response = await axiosInstance.post('/columns', columnData);
  return response.data;
});

export const deleteColumn = createAsyncThunk('columns/delete', async (columnId) => {
  await axiosInstance.delete(`/columns/${columnId}`);
  return columnId;
});

const columnSlice = createSlice({
  name: 'columns',
  initialState: { columns: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createColumn.fulfilled, (state, action) => {
      state.columns.push(action.payload);
    });
    builder.addCase(deleteColumn.fulfilled, (state, action) => {
      state.columns = state.columns.filter(col => col._id !== action.payload);
    });
  },
});

export default columnSlice.reducer;