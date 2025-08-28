import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
  documentId,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

const serialize = (snap) => {
  const data = snap.data();
  return {
    ...data,
    id: snap.id,
    createdAt: data.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : null,
    updatedAt: data.updatedAt?.toDate
      ? data.updatedAt.toDate().toISOString()
      : null,
  };
};

export const fetchClients = createAsyncThunk(
  "clients/fetchPage",
  async ({ table, pageSize = 10, cursor }, { rejectWithValue }) => {
    try {
      if (!table) throw new Error("fetchClients: missing 'table'");

      const parts = [];

      // stable ordering for pagination

      parts.push(orderBy("createdAt", "desc"));
      parts.push(orderBy(documentId(), "desc"));

      if (cursor?.id && cursor?.createdAt) {
        parts.push(
          startAfter(Timestamp.fromDate(new Date(cursor.createdAt)), cursor.id)
        );
      }

      parts.push(limit(pageSize));

      const q = query(collection(db, table), ...parts);
      const snap = await getDocs(q);

      const rows = snap.docs.map(serialize);
      const last = snap.docs[snap.docs.length - 1];

      const nextCursor = last
        ? {
            id: last.id,
            createdAt: last.data().createdAt?.toDate
              ? last.data().createdAt.toDate().toISOString()
              : null,
          }
        : null;

      return {
        table,
        data: rows,
        append: !!cursor, // append when loading more
        nextCursor, // feed this back in next call
        hasMore: rows.length === pageSize,
      };
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : String(e));
    }
  }
);

// delete a client document by id (include table so reducer knows which list to update)
export const deleteClient = createAsyncThunk(
  "clients/delete",
  async ({ table, id }, { rejectWithValue }) => {
    try {
      if (!id || !table) throw new Error("deleteClient: missing { id, table }");
      await deleteDoc(doc(db, table, id));
      return { id, table };
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : String(e));
    }
  }
);
