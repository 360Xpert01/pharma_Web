import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface PrefixItem {
  id?: string;
  code: string; // e.g., "EMP"
  entity: string; // long entity string
  tableName?: string; // if API returns display name
  example?: string; // e.g., "EMP-01"
  // Add more fields based on actual response
}

interface GetPrefixesResponse {
  success: boolean;
  message?: string;
  data: PrefixItem[];
}

interface PrefixState {
  loading: boolean;
  success: boolean;
  error: string | null;
  prefixes: PrefixItem[];
}

// Initial State
const initialState: PrefixState = {
  loading: false,
  success: false,
  error: null,
  prefixes: [],
};

// Async Thunk: Get All Prefixes (GET /api/v1/prefix)
export const getAllPrefixes = createAsyncThunk<GetPrefixesResponse, void, { rejectValue: string }>(
  "prefix/getAllPrefixes",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      let accessToken: string;
      try {
      } catch (e) {
        return rejectWithValue("Invalid session data. Please login again.");
      }

      const response = await axios.get<GetPrefixesResponse>(`${baseUrl}api/v1/prefix`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`, // ← Token from localStorage
        },
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch prefixes. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const getAllPrefixesSlice = createSlice({
  name: "allPrefixes",
  initialState,
  reducers: {
    resetPrefixesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.prefixes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPrefixes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPrefixes.fulfilled, (state, action: PayloadAction<GetPrefixesResponse>) => {
        state.loading = false;
        state.success = true;
        state.prefixes = action.payload.data;
      })
      .addCase(getAllPrefixes.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load prefixes";
        state.prefixes = [];
      });
  },
});

// Export actions
export const { resetPrefixesState } = getAllPrefixesSlice.actions;

// Export reducer
export default getAllPrefixesSlice.reducer;
