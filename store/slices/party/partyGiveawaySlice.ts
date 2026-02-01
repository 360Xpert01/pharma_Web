// src/redux/slices/partyGiveawaySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ────────────────────────────────────────────────
//                Type Definitions
// ────────────────────────────────────────────────

export interface GiveawayRecord {
  id: string;
  partyId: string;
  productId?: string;
  productName?: string;
  quantity: number;
  unit?: string; // e.g. "pcs", "boxes", "samples"
  giveawayDate?: string; // ISO date or "2026-01-15"
  notes?: string;
  status?: "given" | "confirmed" | "returned" | "expired" | "pending";
  givenBy?: string; // salesman id or name
  createdAt: string;
  updatedAt?: string;
  // Add more fields once you see real response
}

interface PartyGiveawayState {
  data: GiveawayRecord[] | null; // usually array of giveaways
  loading: boolean;
  error: string | null;
  lastFetchedPartyId: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

const initialState: PartyGiveawayState = {
  data: null,
  loading: false,
  error: null,
  lastFetchedPartyId: null,
  pagination: null,
};

// ────────────────────────────────────────────────
//                  Async Thunk
// ────────────────────────────────────────────────

interface FetchGiveawaysParams {
  partyId: string;
  page?: number;
  limit?: number;
}

interface FetchGiveawaysResponse {
  data: GiveawayRecord[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const fetchPartyGiveaways = createAsyncThunk<
  FetchGiveawaysResponse,
  string | FetchGiveawaysParams,
  { rejectValue: string }
>("partyGiveaway/fetchPartyGiveaways", async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("No authentication token found. Please login.");
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

    const url = `${API_BASE_URL}api/v1/parties/giveaway/${partyId}`;

    console.log(`→ Fetching giveaways for party: ${url} with page=${page} limit=${limit}`);

    // Update query params
    const response = await axios.get<{
      success: boolean;
      message?: string;
      data: GiveawayRecord[];
      pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>(url, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const resData = response.data;

    if (resData.success === false) {
      throw new Error(resData.message || "Failed to fetch giveaway records");
    }

    return {
      data: resData.data || [],
      pagination: resData.pagination,
    };
  } catch (error: any) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : error.message || "Could not load giveaway history";

    console.error("fetchPartyGiveaways failed:", errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// ────────────────────────────────────────────────
//                     Slice
// ────────────────────────────────────────────────

const partyGiveawaySlice = createSlice({
  name: "partyGiveaway",
  initialState,
  reducers: {
    clearPartyGiveaways: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetchedPartyId = null;
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartyGiveaways.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        if (typeof action.meta.arg === "string") {
          state.lastFetchedPartyId = action.meta.arg;
        } else {
          state.lastFetchedPartyId = action.meta.arg.partyId;
        }
      })
      .addCase(
        fetchPartyGiveaways.fulfilled,
        (state, action: PayloadAction<FetchGiveawaysResponse>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.pagination = action.payload.pagination || null;
        }
      )
      .addCase(fetchPartyGiveaways.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch giveaway records";
      });
  },
});

export const { clearPartyGiveaways } = partyGiveawaySlice.actions;
export default partyGiveawaySlice.reducer;
