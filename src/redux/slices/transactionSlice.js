// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
  },
});

export const {  } = transactionSlice.actions;

export default transactionSlice.reducer;