import { createSlice } from "@reduxjs/toolkit";
import { fetchClients, deleteClient } from "./clientThunk";

const clientsSlice = createSlice({
  name: "clients",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchClients.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchClients.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchClients.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload || "Failed to load";
    });
    b.addCase(deleteClient.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(deleteClient.fulfilled, (s, a) => {
      s.loading = false;
      s.items = s.items.filter((it) => it.id !== a.payload);
    });
    b.addCase(deleteClient.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload || "Failed to delete";
    });
  },
});

export default clientsSlice.reducer;
