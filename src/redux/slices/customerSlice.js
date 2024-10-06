// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
  },
});

export const {  } = customerSlice.actions;

export default customerSlice.reducer;