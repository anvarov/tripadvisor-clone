import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'authReducer',
  initialState: {
      isAuthorized: false,
      username: '',
  },
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuthorized = true;
      state.username = action.payload;
    },
    logout: state => {
      state.isAuthorized = false;
      state.username = '';
    },
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer