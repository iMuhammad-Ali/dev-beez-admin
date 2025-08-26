import { createSlice } from "@reduxjs/toolkit";
import { signIn, signOut } from "./authThunk";
const initialState = { user: null, status: "idle", error: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(signIn.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload;
      })
      .addCase(signIn.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      })
      .addCase(signOut.fulfilled, (s) => {
        s.user = null;
        s.status = "succeeded";
      });
  },
});
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
