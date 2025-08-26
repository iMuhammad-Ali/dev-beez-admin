import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "./sidebarSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import clientReducer from "./clientSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    auth: authReducer,
    client: clientReducer,
  },
});

export default store;
