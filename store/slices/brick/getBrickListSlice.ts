import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// Types
interface BrickItem {
  id: string;
  name: string;
  parentId?: string;
  latitude?: number;
  longitude?: number;
  brickCode?: string;
  description?: string;
  createdAt?: string;
}

interface BrickListResponse {
  zones?: BrickItem[];
  regions?: BrickItem[];
  bricks?: BrickItem[];
  [key: string]: BrickItem[] | undefined;
}

interface BrickListState {
  loading: boolean;
  success: boolean;
  error: string | null;
  zones: BrickItem[];
  regions: BrickItem[];
  bricks: BrickItem[];
}

// Initial State
const initialState: BrickListState = {
  loading: false,
  success: false,
  error: null,
  zones: [],
  regions: [],
  bricks: [],
};

// Async Thunk: Get Brick List (GET /api/v1/brick/list)
export const getBrickList = createAsyncThunk<BrickListResponse, void, { rejectValue: string }>(
  "brickList/getBrickList",
  async (_, { rejectWithValue }) => {
    try {
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
      state.zones = [];
      state.regions = [];
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
        state.zones = action.payload.zones || [];
        state.regions = action.payload.regions || [];
        state.bricks = action.payload.bricks || [];
      })
      .addCase(getBrickList.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load brick list";
        state.zones = [];
        state.regions = [];
        state.bricks = [];
      });
  },
});

// Export actions
export const { resetBrickListState } = getBrickListSlice.actions;

// Export types
export type { BrickItem, BrickListResponse, BrickListState };

// Export reducer
export default getBrickListSlice.reducer;
