import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  user: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('auth')) || initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
