import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersLoading: false,
  usersError: null,
  users: [],
  aggregatorUserLoading: false,
  aggregatorUserError: null,
  aggregatorUser: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersStart: (state) => {
      state.usersLoading = true;
      state.usersError = null;
    },
    usersSuccess: (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    },
    usersFailure: (state, action) => {
      state.usersLoading = false;
      state.usersError = action.payload;
    },
    aggregatorUserStart: (state) => {
      state.aggregatorUserLoading = true;
      state.aggregatorUserError = null;
    },
    aggregatorUserSuccess: (state, action) => {
      state.aggregatorUserLoading = false;
      state.aggregatorUser = action.payload;
    },
    aggregatorUserFailure: (state, action) => {
      state.aggregatorUserLoading = false;
      state.aggregatorUserError = action.payload;
    }
  },
});

export const { usersStart, usersSuccess, usersFailure, aggregatorUserStart, aggregatorUserSuccess, aggregatorUserFailure } = usersSlice.actions;

export default usersSlice.reducer;