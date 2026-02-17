import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { TerritoryItem, TerritoryDetailResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// State Interface
interface TerritoryByIdState {
  loading: boolean;
  success: boolean;
  error: string | null;
  territory: TerritoryItem | null;
}

// Initial State
const initialState: TerritoryByIdState = {
  loading: false,
  success: false,
  error: null,
  territory: null,
};

// Async Thunk: Get Territory By ID (GET /api/v1/territory/:id)
export const getTerritoryById = createAsyncThunk<TerritoryItem, string, { rejectValue: string }>(
  "territory/getTerritoryById",
  async (id, { rejectWithValue }) => {
    try {
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<TerritoryDetailResponse>(
        `${baseUrl}api/v1/territory/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStr}`,
          },
        }
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch territory details. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const getTerritoryByIdSlice = createSlice({
  name: "territoryById",
  initialState,
  reducers: {
    resetTerritoryByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.territory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTerritoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTerritoryById.fulfilled, (state, action: PayloadAction<TerritoryItem>) => {
        state.loading = false;
        state.success = true;
        state.territory = action.payload;
      })
      .addCase(getTerritoryById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load territory details";
        state.territory = null;
      });
  },
});

// Export actions
export const { resetTerritoryByIdState } = getTerritoryByIdSlice.actions;

// Export reducer
export default getTerritoryByIdSlice.reducer;

// Export types
export type { TerritoryByIdState };
