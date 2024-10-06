// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null
};

const disputeSlice = createSlice({
  name: 'dispute',
  initialState,
  reducers: {
  },
});

export const {  } = disputeSlice.actions;

export default disputeSlice.reducer;