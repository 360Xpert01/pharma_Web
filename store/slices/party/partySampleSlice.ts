// src/redux/slices/partySampleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ────────────────────────────────────────────────
//                Type Definitions
// ────────────────────────────────────────────────

export interface PartySample {
  id: string;
  partyId: string;
  name?: string;
  sampleName?: string;
  quantity?: number;
  unit?: string;
  givenAt?: string;
  notes?: string;
  status?: "given" | "returned" | "pending" | "expired";
  createdAt?: string;
  updatedAt?: string;
  // Add / adjust fields according to actual API response
}

interface PartySampleState {
  data: PartySample | null;
  loading: boolean;
  error: string | null;
  lastFetchedPartyId: string | null;
}

const initialState: PartySampleState = {
  data: null,
  loading: false,
  error: null,
  lastFetchedPartyId: null,
};

// ────────────────────────────────────────────────
//                  Async Thunk
// ────────────────────────────────────────────────

export const fetchPartySample = createAsyncThunk<
  PartySample,
  string, // argument: partyId
  { rejectValue: string }
>("partySample/fetchPartySample", async (partyId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    const url = `${API_BASE_URL}api/v1/parties/samples/${partyId}`;

    console.log(`Fetching party sample → ${url}`);

    const response = await axios.get<{
      success: boolean;
      message?: string;
      data: PartySample;
    }>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch party sample");
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : error.message || "Could not load party sample information";

    console.error("❌ fetchPartySample failed:", errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// ────────────────────────────────────────────────
//                     Slice
// ────────────────────────────────────────────────

const partySampleSlice = createSlice({
  name: "partySample",
  initialState,
  reducers: {
    clearPartySample: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetchedPartyId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartySample.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.lastFetchedPartyId = action.meta.arg;
      })
      .addCase(fetchPartySample.fulfilled, (state, action: PayloadAction<PartySample>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPartySample.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch party sample";
      });
  },
});

export const { clearPartySample } = partySampleSlice.actions;
export default partySampleSlice.reducer;
