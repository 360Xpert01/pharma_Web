import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CallPointItem {
  id: string;
  name: string;
  pulseCode: string;
  legacyCode: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
}

interface GetCallPointsResponse {
  success: boolean;
  message?: string;
  data: CallPointItem[];
}

interface CallPointsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  callPoints: CallPointItem[];
}

// Initial State
const initialState: CallPointsState = {
  loading: false,
  success: false,
  error: null,
  callPoints: [],
};

// Async Thunk: Get All Call Points (GET /api/v1/callPoint/all)
export const getAllCallPoints = createAsyncThunk<
  GetCallPointsResponse,
  void,
  { rejectValue: string }
>("callPoints/getAllCallPoints", async (_, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetCallPointsResponse>(`${baseUrl}api/v1/callPoint/all`, {
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
      "Failed to fetch call points. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllCallPointsSlice = createSlice({
  name: "allCallPoints",
  initialState,
  reducers: {
    resetCallPointsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.callPoints = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCallPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllCallPoints.fulfilled,
        (state, action: PayloadAction<GetCallPointsResponse>) => {
          state.loading = false;
          state.success = true;
          state.callPoints = action.payload.data;
        }
      )
      .addCase(getAllCallPoints.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load call points";
        state.callPoints = [];
      });
  },
});

// Export actions
export const { resetCallPointsState } = getAllCallPointsSlice.actions;

// Export reducer
export default getAllCallPointsSlice.reducer;
