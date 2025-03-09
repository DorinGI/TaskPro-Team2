// src/redux/columnSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance.js';

export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async boardId => {
    const response = await axiosInstance.get(
      `columns/boards/${boardId}/columns`
    );
    return response.data;
  }
);

export const saveColumn = createAsyncThunk(
  'columns/saveColumn',
  async column => {
    const response = column.id
      ? await axiosInstance.put(`/columns/${column.id}`, column)
      : await axiosInstance.post('/columns', column);
    return response.data;
  }
);

// export const createColumn = createAsyncThunk(
//   'columns/create',
//   async columnData => {
//     const response = await axiosInstance.post('/columns', columnData);
//     return response.data;
//   }
// );

export const deleteColumn = createAsyncThunk(
  'columns/delete',
  async columnId => {
    await axiosInstance.delete(`/columns/${columnId}`);
    return columnId;
  }
);

const columnSlice = createSlice({
  name: 'columns',
  initialState: { columns: [], loading: false },
  extraReducers: builder => {
    builder
      .addCase(fetchColumns.pending, state => {
        state.loading = true;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.loading = false;
        state.columns = action.payload;
      })
      // .addCase(saveColumn.fulfilled, (state, action) => {
      //   state.columns.push(action.payload);
      // })
      .addCase(saveColumn.fulfilled, (state, action) => {
        const existingIndex = state.columns.findIndex(
          column => column._id === action.payload._id
        );
        if (existingIndex !== -1) {
          state.columns[existingIndex] = action.payload;
        } else {
          state.columns = [...state.columns, action.payload];
        }
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.columns = state.columns.filter(col => col._id !== action.payload);
      });
  },
});

export default columnSlice.reducer;
