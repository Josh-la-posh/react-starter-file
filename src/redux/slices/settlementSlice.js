// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settlementLoading: false,
  settlementError: null,
  settlement: [],
  settlementConfigurationLoading: false,
  settlementConfigurationError: null,
  settlementConfiguration: [],
  settlementConfigurationDetailLoading: false,
  settlementConfigurationDetailError: null,
  settlementConfigurationDetail: [],
};

const settlementSlice = createSlice({
  name: 'settlement',
  initialState,
  reducers: {
    settlementStart: (state) => {
      state.settlementLoading = true;
      state.settlementError = null;
    },
    settlementSuccess: (state, action) => {
      state.settlementLoading = false;
      state.settlement = action.payload;
    },
    settlementFailure: (state, action) => {
      state.settlementLoading = false;
      state.settlementError = action.payload;
    },
    settlementConfigurationStart: (state) => {
      state.settlementConfigurationLoading = true;
      state.settlementConfigurationError = null;
    },
    settlementConfigurationSuccess: (state, action) => {
      state.settlementConfigurationLoading = false;
      state.settlementConfiguration = action.payload;
    },
    settlementConfigurationFailure: (state, action) => {
      state.settlementConfigurationLoading = false;
      state.settlementConfigurationError = action.payload;
    },
    settlementConfigurationDetailStart: (state) => {
      state.settlementConfigurationDetailLoading = true;
      state.settlementConfigurationDetailError = null;
    },
    settlementConfigurationDetailSuccess: (state, action) => {
      state.settlementConfigurationDetailLoading = false;
      state.settlementConfigurationDetail = action.payload;
    },
    settlementConfigurationDetailFailure: (state, action) => {
      state.settlementConfigurationDetailLoading = false;
      state.settlementConfigurationDetailError = action.payload;
    }
  },
});

export const { settlementStart, settlementSuccess, settlementFailure, settlementConfigurationStart, settlementConfigurationSuccess, settlementConfigurationFailure, settlementConfigurationDetailStart, settlementConfigurationDetailSuccess, settlementConfigurationDetailFailure } = settlementSlice.actions;

export default settlementSlice.reducer;