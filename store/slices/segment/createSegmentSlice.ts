import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CreateSegmentPayload {
  pulseCode: string;
  name: string;
  status: "active" | "inactive";
  legacyCode?: string;
}

interface CreateSegmentResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    pulseCode: string;
    status: "active" | "inactive";
    legacyCode?: string;
    createdAt: string;
  };
}

interface SegmentState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdSegment: any | null;
}

// Initial State
const initialState: SegmentState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdSegment: null,
};

// Async Thunk: Create Segment (POST request)
export const createSegment = createAsyncThunk<
  CreateSegmentResponse,
  CreateSegmentPayload,
  { rejectValue: string }
>("segment/createSegment", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreateSegmentResponse>(`${baseUrl}api/v1/segment/`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create segment. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createSegmentSlice = createSlice({
  name: "createSegment",
  initialState,
  reducers: {
    resetSegmentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdSegment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSegment.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(createSegment.fulfilled, (state, action: PayloadAction<CreateSegmentResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Segment created successfully!";
        state.createdSegment = action.payload.data || null;
      })
      .addCase(createSegment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetSegmentState } = createSegmentSlice.actions;

// Export reducer
export default createSegmentSlice.reducer;
