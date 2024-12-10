import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email?: string | null;
  token?: string | null;
  isLoggedIn?: boolean;
}

const initialState: AuthState = {
  email: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        email?: string;
        token?: string;
        isLoggedIn?: boolean;
      }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.email = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
