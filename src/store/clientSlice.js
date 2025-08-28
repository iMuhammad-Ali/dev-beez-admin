import { createSlice } from "@reduxjs/toolkit";
import { fetchClients, deleteClient } from "./clientThunk";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    schedule_calls: [],
    book_services: [],
    filter: "all",
    meta: {
      schedule_calls: {
        cursor: null,
        hasMore: true,
      },
      book_services: {
        cursor: null,
        hasMore: true,
      },
    },
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchClients.fulfilled, (s, a) => {
      const { table, data, append, nextCursor, hasMore } = a.payload;
      if (!Array.isArray(s[table])) s[table] = [];
      s[table] = append ? [...s[table], ...data] : data;

      s.meta ??= {};
      s.meta[table] ??= {
        cursor: null,
        hasMore: true,
      };
      s.meta[table].cursor = nextCursor;
      s.meta[table].hasMore = hasMore;
    });

    b.addCase(deleteClient.fulfilled, (s, a) => {
      const { table, id } = a.payload || {};
      if (!table || !Array.isArray(s[table])) return;
      s[table] = s[table].filter((it) => it.id !== id);
    });
  },
});

export const { setFilter } = clientsSlice.actions;
export default clientsSlice.reducer;
