import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
export interface Product {
  id: string;
  productName: string;
  targetPackets: number;
  achievementPercentage: number;
}

export interface TargetListItem {
  userId: string;
  username: string;
  profilePic: string | null;
  roleName: string;
  teamName: string;
  channelId: string;
  channelName: string;
  lineManagerId: string;
  lineManagerName: string;
  territoryId: string | null;
  territoryPulseCode: string | null;
  targetId: string;
  targetMonth: number;
  targetYear: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
  tags?: string[];
}

interface GetTargetListResponse {
  success: boolean;
  message?: string;
  data: TargetListItem[];
}

interface TargetListState {
  loading: boolean;
  success: boolean;
  error: string | null;
  targets: TargetListItem[];
}

// Initial State
const initialState: TargetListState = {
  loading: false,
  success: false,
  error: null,
  targets: [],
};

// Async Thunk: Get Target List (GET /api/v1/targets/targetList)
export const getTargetList = createAsyncThunk<GetTargetListResponse, void, { rejectValue: string }>(
  "target/getTargetList",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<GetTargetListResponse>(
        `${baseUrl}api/v1/targets/targetList`,
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
        "Failed to fetch target list. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const getTargetListSlice = createSlice({
  name: "targetList",
  initialState,
  reducers: {
    resetTargetListState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.targets = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTargetList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTargetList.fulfilled, (state, action: PayloadAction<GetTargetListResponse>) => {
        state.loading = false;
        state.success = true;
        state.targets = action.payload.data;
      })
      .addCase(getTargetList.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load target list";
        state.targets = [];
      });
  },
});

// Export actions
export const { resetTargetListState } = getTargetListSlice.actions;

// Export reducer
export default getTargetListSlice.reducer;
