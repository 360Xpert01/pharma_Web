import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com";

// Types
interface GeneratePrefixPayload {
  entity: string; // e.g., "Employee", "Product", etc.
}

interface GeneratePrefixResponse {
  success: boolean;
  message?: string;
  data: string; // e.g., "emp12" - the generated pulse code
}

interface GeneratePrefixState {
  loading: boolean;
  success: boolean;
  error: string | null;
  generatedPrefix: string | null;
}

// Initial State
const initialState: GeneratePrefixState = {
  loading: false,
  success: false,
  error: null,
  generatedPrefix: null,
};

// Async Thunk: Generate Prefix (GET /api/v1/prefix/generate)
export const generatePrefix = createAsyncThunk<
  GeneratePrefixResponse,
  GeneratePrefixPayload,
  { rejectValue: string }
>("prefix/generatePrefix", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GeneratePrefixResponse>(
      `${baseUrl}api/v1/prefix/generate?entity=${payload.entity}`,
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
      "Failed to generate prefix. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const generatePrefixSlice = createSlice({
  name: "generatePrefix",
  initialState,
  reducers: {
    resetGeneratePrefixState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.generatedPrefix = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generatePrefix.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(generatePrefix.fulfilled, (state, action: PayloadAction<GeneratePrefixResponse>) => {
        state.loading = false;
        state.success = true;
        state.generatedPrefix = action.payload.data; // data is directly the pulse code string
      })
      .addCase(generatePrefix.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to generate prefix";
        state.generatedPrefix = null;
      });
  },
});

// Export actions
export const { resetGeneratePrefixState } = generatePrefixSlice.actions;

// Export reducer
export default generatePrefixSlice.reducer;
