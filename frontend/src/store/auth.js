import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  email: "",
  name: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.email = action.payload.email;
      state.name = action.name;
    },
    logout: (state) => {
      state.isLogin = false;
      state.email = "";
      state.name = "";
    },
  },
});

export default AuthSlice.reducer;
export const AuthAction = AuthSlice.actions;
