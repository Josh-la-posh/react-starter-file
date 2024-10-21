import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersLoading: false,
  usersError: null,
  users: []
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
    }
  },
});

export const { usersStart, usersSuccess, usersFailure } = usersSlice.actions;

export default usersSlice.reducer;