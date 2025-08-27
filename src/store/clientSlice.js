import { createSlice } from "@reduxjs/toolkit";
import { fetchClients, deleteClient } from "./clientThunk";

const clientsSlice = createSlice({
  name: "clients",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchClients.fulfilled, (s, a) => {
      s.items = a.payload;
    });
    b.addCase(deleteClient.fulfilled, (s, a) => {
      s.items = s.items.filter((it) => it.id !== a.payload);
    });
  },
});

export default clientsSlice.reducer;
