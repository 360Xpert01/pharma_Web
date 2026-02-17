import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TerritoryDeleteResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// State Interface
interface DeleteTerritoryState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

// Initial State
const initialState: DeleteTerritoryState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

// Async Thunk: Delete Territory (DELETE /api/v1/territory/:id)
export const deleteTerritory = createAsyncThunk<
  TerritoryDeleteResponse,
  string,
  { rejectValue: string }
>("territory/deleteTerritory", async (id, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.delete<TerritoryDeleteResponse>(
      `${baseUrl}api/v1/territory/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to delete territory. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const deleteTerritorySlice = createSlice({
  name: "deleteTerritory",
  initialState,
  reducers: {
    resetDeleteTerritoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTerritory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteTerritory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(deleteTerritory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to delete territory";
        state.message = null;
      });
  },
});

// Export actions
export const { resetDeleteTerritoryState } = deleteTerritorySlice.actions;

// Export reducer
export default deleteTerritorySlice.reducer;

// Export types
export type { DeleteTerritoryState };
