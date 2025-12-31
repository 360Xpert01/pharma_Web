import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface Region {
  id: string;
  name: string;
}

interface Province {
  id: string;
  name: string;
  regionId: string;
}

interface City {
  id: string;
  name: string;
  provinceId: string;
}

interface Area {
  id: string;
  name: string;
  cityId: string;
}

interface Brick {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  areaId: string;
}

interface BrickListResponse {
  regions: Region[];
  provinces: Province[];
  cities: City[];
  areas: Area[];
  bricks: Brick[];
}

interface BrickListState {
  loading: boolean;
  success: boolean;
  error: string | null;
  regions: Region[];
  provinces: Province[];
  cities: City[];
  areas: Area[];
  bricks: Brick[];
}

// Initial State
const initialState: BrickListState = {
  loading: false,
  success: false,
  error: null,
  regions: [],
  provinces: [],
  cities: [],
  areas: [],
  bricks: [],
};

// Async Thunk: Get Brick List (GET /api/v1/brick/list)
export const getBrickList = createAsyncThunk<BrickListResponse, void, { rejectValue: string }>(
  "brickList/getBrickList",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<BrickListResponse>(`${baseUrl}api/v1/brick/list`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch brick list. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const getBrickListSlice = createSlice({
  name: "brickList",
  initialState,
  reducers: {
    resetBrickListState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.regions = [];
      state.provinces = [];
      state.cities = [];
      state.areas = [];
      state.bricks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrickList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrickList.fulfilled, (state, action: PayloadAction<BrickListResponse>) => {
        state.loading = false;
        state.success = true;
        state.regions = action.payload.regions;
        state.provinces = action.payload.provinces;
        state.cities = action.payload.cities;
        state.areas = action.payload.areas;
        state.bricks = action.payload.bricks;
      })
      .addCase(getBrickList.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load brick list";
        state.regions = [];
        state.provinces = [];
        state.cities = [];
        state.areas = [];
        state.bricks = [];
      });
  },
});

// Export actions
export const { resetBrickListState } = getBrickListSlice.actions;

// Export types for use in components
export type { Region, Province, City, Area, Brick, BrickListState };

// Export reducer
export default getBrickListSlice.reducer;
