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
}

const initialState: PartyGiveawayState = {
  data: null,
  loading: false,
  error: null,
  lastFetchedPartyId: null,
};

// ────────────────────────────────────────────────
//                  Async Thunk
// ────────────────────────────────────────────────

export const fetchPartyGiveaways = createAsyncThunk<
  GiveawayRecord[],
  string, // argument = partyId
  { rejectValue: string }
>("partyGiveaway/fetchPartyGiveaways", async (partyId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("No authentication token found. Please login.");
    }

    const url = `${API_BASE_URL}api/v1/parties/giveaway/${partyId}`;

    console.log(`→ Fetching giveaways for party: ${url}`);

    const response = await axios.get<{
      success: boolean;
      message?: string;
      data: GiveawayRecord[];
    }>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch giveaway records");
    }

    return response.data.data;
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartyGiveaways.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.lastFetchedPartyId = action.meta.arg;
      })
      .addCase(fetchPartyGiveaways.fulfilled, (state, action: PayloadAction<GiveawayRecord[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPartyGiveaways.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch giveaway records";
      });
  },
});

export const { clearPartyGiveaways } = partyGiveawaySlice.actions;
export default partyGiveawaySlice.reducer;
