import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../api/store";

import { IAuthSlice } from "../../ts/interfaces";

const initialState: IAuthSlice = {
  id: "",
  userData: {
    name: "",
    role: null,
  },
  token: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { id, userData, token, isAuth } = action.payload;

      state.id = id;
      state.userData = userData;
      state.token = token;
      state.isAuth = isAuth;
    },
    logOut: (state) => {
      state.id = "";
      state.userData = {
        name: "",
        role: null,
      };
      state.token = "";
      state.isAuth = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentId = (state: RootState) => state.auth.id;
export const selectCurrentUser = (state: RootState) => state.auth.userData;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectAuthStatus = (state: RootState) => state.auth.isAuth;
export const selectCurrentUserData = (state: RootState) => state.auth;
