// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null
};

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {
  },
});

export const {  } = merchantSlice.actions;

export default merchantSlice.reducer;