import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//sign-in thunk

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return { uid: cred.user.uid, email: cred.user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Sign-oot thunk

export const signOut = createAsyncThunk("auth/logout", async () => {
  await firebaseSignOut(auth);
  return null;
});
