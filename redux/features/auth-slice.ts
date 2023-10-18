import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signIn, signOut } from "next-auth/react";

type AuthState = {
  isAuth: boolean;
  username: string;
  email: string;
  id: string;
  isAdmin: boolean;
};

type InitialState = {
  value: AuthState;
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
    email: "",
    id: "",
    isAdmin: false,
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<any>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload.name,
          email: action.payload.email,
          id: action.payload.id,
          isAdmin: action.payload.isAdmin || false,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
