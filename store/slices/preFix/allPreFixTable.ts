import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com";

// Types
interface PrefixItem {
  tableName: string; // e.g., "Employee Table"
  prefix: string; // e.g., "EMP"
  example: string; // e.g., "EMP-03"
  // Add more fields if your API returns them
}

interface FetchPrefixesResponse {
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

// Async Thunk: Fetch All Entity Prefixes (GET request)
export const fetchPrefixes = createAsyncThunk<
  FetchPrefixesResponse,
  void, // no payload needed
  { rejectValue: string }
>("prefix/fetchPrefixes", async (_, { rejectWithValue, getState }) => {
  try {
    const token = localStorage.getItem("userSession");

    const response = await axios.get<FetchPrefixesResponse>(`${baseUrl}api/v1/prefix/entity`, {
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
      "Failed to fetch prefixes. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const prefixSlice = createSlice({
  name: "prefix",
  initialState,
  reducers: {
    resetPrefixState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(fetchPrefixes.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      // Fulfilled
      .addCase(fetchPrefixes.fulfilled, (state, action: PayloadAction<FetchPrefixesResponse>) => {
        state.loading = false;
        state.success = true;
        state.prefixes = action.payload.data;
        console.log("Fetched prefixes:", state.prefixes);
      })
      // Rejected
      .addCase(fetchPrefixes.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load prefixes";
        state.prefixes = [];
      });
  },
});

// Export actions
export const { resetPrefixState } = prefixSlice.actions;

// Export reducer
export default prefixSlice.reducer;
