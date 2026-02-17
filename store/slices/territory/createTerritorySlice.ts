import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { TerritoryItem, CreateTerritoryPayload, TerritoryCreateUpdateResponse } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// State Interface
interface CreateTerritoryState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdTerritory: TerritoryItem | null;
}

// Initial State
const initialState: CreateTerritoryState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdTerritory: null,
};

// Async Thunk: Create Territory (POST /api/v1/territory)
export const createTerritory = createAsyncThunk<
  TerritoryCreateUpdateResponse,
  CreateTerritoryPayload,
  { rejectValue: string }
>("territory/createTerritory", async (payload, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<TerritoryCreateUpdateResponse>(
      `${baseUrl}api/v1/territory`,
      payload,
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
      "Failed to create territory. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createTerritorySlice = createSlice({
  name: "createTerritory",
  initialState,
  reducers: {
    resetCreateTerritoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdTerritory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTerritory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createTerritory.fulfilled,
        (state, action: PayloadAction<TerritoryCreateUpdateResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;
          state.createdTerritory = action.payload.data;
        }
      )
      .addCase(createTerritory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to create territory";
        state.message = null;
        state.createdTerritory = null;
      });
  },
});

// Export actions
export const { resetCreateTerritoryState } = createTerritorySlice.actions;

// Export reducer
export default createTerritorySlice.reducer;

// Export types
export type { CreateTerritoryState };
