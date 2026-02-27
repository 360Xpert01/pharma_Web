import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  TerritoryItem,
  TerritoryListResponse,
  GetTerritoriesParams,
  Pagination,
} from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// State Interface
interface TerritoriesState {
  loading: boolean;
  success: boolean;
  error: string | null;
  territories: TerritoryItem[];
  pagination: Pagination | null;
}

// Initial State
const initialState: TerritoriesState = {
  loading: false,
  success: false,
  error: null,
  territories: [],
  pagination: null,
};

// Async Thunk: Get All Territories (GET /api/v1/territory)
export const getAllTerritories = createAsyncThunk<
  { territories: TerritoryItem[]; pagination: Pagination | null },
  GetTerritoriesParams | undefined,
  { rejectValue: string }
>("territories/getAllTerritories", async (params, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<TerritoryListResponse>(`${baseUrl}api/v1/territory`, {
      params: {
        ...(params?.page !== undefined && { page: params.page }),
        ...(params?.limit !== undefined && { limit: params.limit }),
        ...(params?.search && { search: params.search }),
        ...(params?.notassigned !== undefined && { notassigned: params.notassigned }),
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
    });

    return {
      territories: response.data?.data || [],
      pagination: response.data?.pagination || null,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch territories. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllTerritoriesSlice = createSlice({
  name: "allTerritories",
  initialState,
  reducers: {
    resetTerritoriesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.territories = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTerritories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTerritories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.territories = action.payload.territories;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllTerritories.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load territories";
        state.territories = [];
        state.pagination = null;
      });
  },
});

// Export actions
export const { resetTerritoriesState } = getAllTerritoriesSlice.actions;

// Export reducer
export default getAllTerritoriesSlice.reducer;

// Export types
export type { TerritoriesState };
