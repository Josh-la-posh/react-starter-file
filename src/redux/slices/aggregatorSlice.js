// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null
};

const aggregatorSlice = createSlice({
  name: 'aggregator',
  initialState,
  reducers: {
  },
});

export const {  } = aggregatorSlice.actions;

export default aggregatorSlice.reducer;