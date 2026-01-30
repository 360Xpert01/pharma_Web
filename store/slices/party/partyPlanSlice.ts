// src/features/parties/partyPlanSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ────────────────────────────────────────────────
//                Type Definitions
// ────────────────────────────────────────────────

export interface SampleItem {
  product: string;
  sku: string;
  date: string;
  quantity: number;
}

export interface GiveawayItem {
  giveawayName: string;
  date: string;
  quantity: number;
}

export interface CallRecord {
  callId: string;
  callDate: string;
  saleRep: string;
  pulseCode: string;
  location?: string;
  sampleItems: SampleItem[];
  giveawayItems: GiveawayItem[];
  remarks: string;
  attachments: any[];
}

export interface PartyPlan {
  id?: string;
  partyId: string;
  planId?: string;
  planName?: string;
  planType?: string; // e.g. "monthly", "quarterly", "enterprise"
  status?: "active" | "inactive" | "expired" | "pending";
  startDate?: string;
  endDate?: string;
  coverage?: string[]; // e.g. ["samples", "visits", "promotions"]
  assignedBy?: string;
  assignedAt?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  calls?: CallRecord[]; // Array of call records
  // Add more fields once you see the real response
}

interface PartyPlanState {
  loading: boolean;
  success: boolean;
  error: string | null;
  plan: CallRecord[] | null; // Changed to array of calls
  lastFetchedPartyId: string | null;
}

const initialState: PartyPlanState = {
  loading: false,
  success: false,
  error: null,
  plan: null,
  lastFetchedPartyId: null,
};

// ────────────────────────────────────────────────
//                  Async Thunk
// ────────────────────────────────────────────────

export const fetchPartyPlan = createAsyncThunk<
  CallRecord[], // Changed to array of CallRecord
  string, // partyId
  { rejectValue: string }
>("partyPlan/fetchPartyPlan", async (partyId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const url = `${baseUrl}api/v1/parties/plan/${partyId}`;

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = response.data;

    // Flexible response handling
    if (resData?.success && resData?.data) {
      // If data is array, return it directly
      if (Array.isArray(resData.data)) {
        return resData.data;
      }
      // If data.calls exists and is array
      if (resData.data.calls && Array.isArray(resData.data.calls)) {
        return resData.data.calls;
      }
      // If resData.data is a single PartyPlan object, extract its calls
      if (resData.data.calls) {
        return resData.data.calls;
      }
    }

    // If response is array directly
    if (Array.isArray(resData)) {
      return resData;
    }

    // If the response has a calls property
    if (resData?.calls && Array.isArray(resData.calls)) {
      return resData.calls;
    }

    throw new Error("Unexpected response format");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch party plan information.";

    return rejectWithValue(errorMessage);
  }
});

// ────────────────────────────────────────────────
//                     Slice
// ────────────────────────────────────────────────

const partyPlanSlice = createSlice({
  name: "partyPlan",
  initialState,
  reducers: {
    clearPartyPlan: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.plan = null;
      state.lastFetchedPartyId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartyPlan.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.lastFetchedPartyId = action.meta.arg;
      })
      .addCase(fetchPartyPlan.fulfilled, (state, action: PayloadAction<CallRecord[]>) => {
        state.loading = false;
        state.success = true;
        state.plan = action.payload;
      })
      .addCase(fetchPartyPlan.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load party plan";
        state.plan = null;
      });
  },
});

export const { clearPartyPlan } = partyPlanSlice.actions;
export default partyPlanSlice.reducer;

// ────────────────────────────────────────────────
//                    Selectors
// ────────────────────────────────────────────────

export const selectPartyPlan = (state: any) => state.partyPlan.plan;
export const selectPartyPlanLoading = (state: any) => state.partyPlan.loading;
export const selectPartyPlanError = (state: any) => state.partyPlan.error;
export const selectLastFetchedPartyId = (state: any) => state.partyPlan.lastFetchedPartyId;
