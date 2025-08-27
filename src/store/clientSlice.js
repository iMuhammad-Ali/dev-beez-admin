import { createSlice } from "@reduxjs/toolkit";
import { fetchClients, deleteClient } from "./clientThunk";

const clientsSlice = createSlice({
  name: "clients",
  initialState: { items: [], filter: "all" },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchClients.fulfilled, (s, a) => {
      s.items = a.payload;
    });
    b.addCase(deleteClient.fulfilled, (s, a) => {
      s.items = s.items.filter((it) => it.id !== a.payload);
    });
  },
});

export const { setFilter } = clientsSlice.actions;
export default clientsSlice.reducer;
