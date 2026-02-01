// src/redux/slices/partySampleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ────────────────────────────────────────────────
//                Type Definitions
// ────────────────────────────────────────────────

export interface PartySample {
  id: string; // or pulseCode based on response? user types showed pulseCode in response but id in interface. fitting to response
  pulseCode?: string;
  date?: string;
  product?: string;
  sku?: string;
  callId?: string;
  allocated?: number;
  available?: number;
  // Add / adjust fields according to actual API response
}

interface PaginationState {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PartySampleState {
  data: PartySample[] | null;
  loading: boolean;
  error: string | null;
  lastFetchedPartyId: string | null;
  pagination: PaginationState | null;
}

const initialState: PartySampleState = {
  data: null,
  loading: false,
  error: null,
  lastFetchedPartyId: null,
  pagination: null,
};

// ────────────────────────────────────────────────
//                  Async Thunk
// ────────────────────────────────────────────────

interface FetchSamplesParams {
  partyId: string;
  page?: number;
  limit?: number;
}

interface FetchSamplesResponse {
  data: PartySample[];
  pagination?: PaginationState;
}

export const fetchPartySample = createAsyncThunk<
  FetchSamplesResponse,
  string | FetchSamplesParams,
  { rejectValue: string }
>("partySample/fetchPartySample", async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    let partyId = "";
    let page = 1;
    let limit = 10;

    if (typeof params === "string") {
      partyId = params;
    } else {
      partyId = params.partyId;
      page = params.page || 1;
      limit = params.limit || 10;
    }

    const url = `${API_BASE_URL}api/v1/parties/samples/${partyId}`;

    console.log(`Fetching party sample → ${url} with page=${page} limit=${limit}`);

    const response = await axios.get<{
      success: boolean;
      message?: string;
      data: PartySample[];
      pagination?: PaginationState;
    }>(url, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch party sample");
    }

    return {
      data: response.data.data || [],
      pagination: response.data.pagination,
    };
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
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartySample.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        if (typeof action.meta.arg === "string") {
          state.lastFetchedPartyId = action.meta.arg;
        } else {
          state.lastFetchedPartyId = action.meta.arg.partyId;
        }
      })
      .addCase(fetchPartySample.fulfilled, (state, action: PayloadAction<FetchSamplesResponse>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination || null;
      })
      .addCase(fetchPartySample.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch party sample";
      });
  },
});

export const { clearPartySample } = partySampleSlice.actions;
export default partySampleSlice.reducer;
