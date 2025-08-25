import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "./sidebarSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
  },
});

export default store;
