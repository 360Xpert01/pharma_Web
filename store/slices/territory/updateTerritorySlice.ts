import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { TerritoryItem, UpdateTerritoryPayload, TerritoryCreateUpdateResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// State Interface
interface UpdateTerritoryState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  updatedTerritory: TerritoryItem | null;
}

// Initial State
const initialState: UpdateTerritoryState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  updatedTerritory: null,
};

// Async Thunk: Update Territory (PUT /api/v1/territory/:id)
export const updateTerritory = createAsyncThunk<
  TerritoryCreateUpdateResponse,
  UpdateTerritoryPayload,
  { rejectValue: string }
>("territory/updateTerritory", async (payload, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const { id, ...updateData } = payload;

    const response = await axios.put<TerritoryCreateUpdateResponse>(
      `${baseUrl}api/v1/territory/${id}`,
      updateData,
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
      "Failed to update territory. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const updateTerritorySlice = createSlice({
  name: "updateTerritory",
  initialState,
  reducers: {
    resetUpdateTerritoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.updatedTerritory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTerritory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        updateTerritory.fulfilled,
        (state, action: PayloadAction<TerritoryCreateUpdateResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;
          state.updatedTerritory = action.payload.data;
        }
      )
      .addCase(updateTerritory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update territory";
        state.message = null;
        state.updatedTerritory = null;
      });
  },
});

// Export actions
export const { resetUpdateTerritoryState } = updateTerritorySlice.actions;

// Export reducer
export default updateTerritorySlice.reducer;

// Export types
export type { UpdateTerritoryState };
