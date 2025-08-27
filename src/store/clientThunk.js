import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";

// One-off fetch (no realtime)
export const fetchClients = createAsyncThunk(
  "clients/fetch",
  async ({ table }, { rejectWithValue }) => {
    try {
      const q = query(collection(db, table), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// delete a client document by id
export const deleteClient = createAsyncThunk(
  "clients/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "clients", id));
      return id;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
