// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
  },
});

export const {  } = invoiceSlice.actions;

export default invoiceSlice.reducer;