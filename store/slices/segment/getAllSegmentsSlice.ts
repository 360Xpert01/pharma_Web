import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BasePaginationParams } from "@/types/api";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// Types
interface Segment {
  id: string;
  name: string;
  pulseCode: string;
  status: "active" | "inactive";
  legacyCode?: string;
  createdAt: string;
  updatedAt: string;
}

interface GetSegmentsResponse {
  success: boolean;
  message: string;
  data: Segment[];
}

interface SegmentsState {
  segments: Segment[];
  loading: boolean;
  success: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

// Initial State
const initialState: SegmentsState = {
  segments: [],
  loading: false,
  success: false,
  error: null,
  pagination: null,
};

// Async Thunk: Get All Segments (GET request)
export const getAllSegments = createAsyncThunk<
  GetSegmentsResponse,
  BasePaginationParams | void,
  { rejectValue: string }
>("segment/getAllSegments", async (params, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const queryParams: any = {
      page: params?.page || 1,
      limit: params?.limit || 10,
      search: params?.search || "",
      sort: params?.sort || "pulseCode",
      order: params?.order || "asc",
    };

    const response = await axios.get<GetSegmentsResponse>(`${baseUrl}api/v1/segment/`, {
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
      "Failed to fetch segments. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllSegmentsSlice = createSlice({
  name: "allSegments",
  initialState,
  reducers: {
    resetSegmentsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.segments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSegments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSegments.fulfilled, (state, action: PayloadAction<GetSegmentsResponse>) => {
        state.loading = false;
        state.success = true;
        state.segments = action.payload.data || [];
        state.pagination = (action.payload as any).pagination || null;
      })
      .addCase(getAllSegments.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch segments";
      });
  },
});

// Export actions
export const { resetSegmentsState } = getAllSegmentsSlice.actions;

// Export reducer
export default getAllSegmentsSlice.reducer;
