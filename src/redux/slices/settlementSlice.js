// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null
};

const settlementSlice = createSlice({
  name: 'settlement',
  initialState,
  reducers: {
  },
});

export const {  } = settlementSlice.actions;

export default settlementSlice.reducer;