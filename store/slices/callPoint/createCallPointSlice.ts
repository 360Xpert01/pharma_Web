import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CreateCallPointPayload {
  name: string;
  pulseCode: string;
  latitude: number;
  longitude: number;
  legacyCode: string;
  isActive: boolean;
}

interface CreateCallPointResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    legacyCode: string;
    isActive: boolean;
    createdAt: string;
  };
}

interface CallPointState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdCallPoint: any | null;
}

// Initial State
const initialState: CallPointState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdCallPoint: null,
};

// Async Thunk: Create Call Point (POST request)
export const createCallPoint = createAsyncThunk<
  CreateCallPointResponse,
  CreateCallPointPayload,
  { rejectValue: string }
>("callPoint/createCallPoint", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreateCallPointResponse>(
      `${baseUrl}api/v1/callPoint/create`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create call point. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createCallPointSlice = createSlice({
  name: "createCallPoint",
  initialState,
  reducers: {
    resetCallPointState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdCallPoint = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCallPoint.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createCallPoint.fulfilled,
        (state, action: PayloadAction<CreateCallPointResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message || "Call point created successfully!";
          state.createdCallPoint = action.payload.data || null;
        }
      )
      .addCase(createCallPoint.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetCallPointState } = createCallPointSlice.actions;

// Export reducer
export default createCallPointSlice.reducer;
