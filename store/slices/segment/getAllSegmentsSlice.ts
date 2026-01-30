import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
}

// Initial State
const initialState: SegmentsState = {
  segments: [],
  loading: false,
  success: false,
  error: null,
};

// Async Thunk: Get All Segments (GET request)
export const getAllSegments = createAsyncThunk<GetSegmentsResponse, void, { rejectValue: string }>(
  "segment/getAllSegments",
  async (_, { rejectWithValue }) => {
    try {
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<GetSegmentsResponse>(`${baseUrl}api/v1/segment/`, {
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
  }
);

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
        state.segments = action.payload.data;
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
