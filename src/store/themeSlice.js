import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme:
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
      document.documentElement.classList.remove(
        `theme-${state.theme === "light" ? "dark" : "light"}`
      );
      document.documentElement.classList.add(`theme-${state.theme}`);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);
      document.documentElement.classList.remove(
        `theme-${state.theme === "light" ? "dark" : "light"}`
      );
      document.documentElement.classList.add(`theme-${state.theme}`);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
