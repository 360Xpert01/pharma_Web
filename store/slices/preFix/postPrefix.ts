import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com";

// Types
interface CreatePrefixPayload {
  code: string;
  entity: string;
}

interface CreatePrefixResponse {
  success: boolean;
  message: string;
  data?: any; // adjust if you know the response structure
}

interface CreatePrefixState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdPrefix: any | null;
}

const initialState: CreatePrefixState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdPrefix: null,
};

// Async Thunk: Create Prefix (POST /api/v1/prefix)
export const createPrefix = createAsyncThunk<
  CreatePrefixResponse,
  CreatePrefixPayload,
  { rejectValue: string }
>("prefix/createPrefix", async (payload, { rejectWithValue }) => {
  try {
    // Extract token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    let accessToken: string;
    try {
    } catch (e) {
      return rejectWithValue("Invalid session data. Please login again.");
    }

    const response = await axios.post<CreatePrefixResponse>(
      `${baseUrl}api/v1/prefix`, // ← Correct endpoint
      payload,
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
      "Failed to create prefix. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createPrefixSlice = createSlice({
  name: "createPrefix", // or 'prefix' if you want to merge with fetch slice
  initialState,
  reducers: {
    resetCreatePrefixState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdPrefix = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPrefix.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createPrefix.fulfilled, (state, action: PayloadAction<CreatePrefixResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Prefix created successfully!";
        state.createdPrefix = action.payload.data || null;
      })
      .addCase(createPrefix.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to create prefix";
      });
  },
});

export const { resetCreatePrefixState } = createPrefixSlice.actions;
export default createPrefixSlice.reducer;
