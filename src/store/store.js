// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage for web

import sidebarReducer from "./sidebarSlice";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import clientReducer from "./clientSlice";

// 1) Combine your reducers
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  theme: themeReducer,
  auth: authReducer,
  client: clientReducer,
});

// 2) Configure what to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"],
};

// 3) Wrap root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4) Create store with correct middleware (ignore persist action checks)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5) Create persistor
export const persistor = persistStore(store);

export default store;
