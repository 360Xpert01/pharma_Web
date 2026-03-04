import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BasePaginationParams } from "@/types/api";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// Types
export interface ChannelItem {
  id: string;
  name: string;
  legacyCode: string;
  pulseCode: string;
  code: string;
  isActive: boolean;
}

interface GetChannelsResponse {
  success: boolean;
  message?: string;
  data: ChannelItem[];
}

interface ChannelsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  channels: ChannelItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

// Initial State
const initialState: ChannelsState = {
  loading: false,
  success: false,
  error: null,
  channels: [],
  pagination: null,
};

// Async Thunk: Get All Channels (GET /api/v1/channel/all)
export const getAllChannels = createAsyncThunk<
  GetChannelsResponse,
  BasePaginationParams | void,
  { rejectValue: string }
>("channels/getAllChannels", async (params, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const queryParams: any = {};
    if (params) {
      if (params.sort) queryParams.sort = params.sort;
      if (params.order) queryParams.order = params.order;
      if (params.search) queryParams.search = params.search;
      if (params.page) queryParams.page = params.page;
      if (params.limit) queryParams.limit = params.limit;
    }

    const response = await axios.get<GetChannelsResponse>(`${baseUrl}api/v1/channel/all`, {
      params: queryParams,
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
      "Failed to fetch channels. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllChannelsSlice = createSlice({
  name: "allChannels",
  initialState,
  reducers: {
    resetChannelsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.channels = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChannels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllChannels.fulfilled, (state, action: PayloadAction<GetChannelsResponse>) => {
        state.loading = false;
        state.success = true;
        state.channels = action.payload.data;
        state.pagination = (action.payload as any).pagination || null;
      })
      .addCase(getAllChannels.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load channels";
        state.channels = [];
      });
  },
});

// Export actions
export const { resetChannelsState } = getAllChannelsSlice.actions;

// Export reducer
export default getAllChannelsSlice.reducer;
