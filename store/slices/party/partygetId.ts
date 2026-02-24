// src/redux/slices/partySlice.ts  (or singlePartySlice.ts)
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ================== Types ==================
export interface Party {
  id: string;
  party_id?: string;
  name?: string;
  party_name?: string;
  type?: string;
  party_type?: string;
  email?: string;
  image?: string;
  phone?: string;
  phone_number?: string;
  pulsecode?: string;
  channel_id?: string;
  channel_name?: string;
  segmentId?: string;
  segment_name?: string;
  specializationId?: string;
  specialization_name?: string;
  description?: string;
  status?: string;
  parent?: string;
  parent_id?: string | null;
  party_parent_name?: string | null;

  organization?: {
    parent_id?: string | null;
    party_parent_name?: string | null;
  };

  attributes?: {
    id?: string;
    partyId?: string;
    pmdcNumber?: string;
    specialization?: string;
    qualification?: string;
    designation?: string;
    date_of_birth?: string;
    segment?: string;
    legacyCode?: string;
    [key: string]: any;
  };

  locations?: Array<{
    id?: string;
    city?: string;
    state?: string;
    country?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    brickId?: string;
    geographic_unit_id?: string | null;
    geographic_unit_name?: string | null;
    schedules?: Array<{
      scheduleData?: Array<{
        days?: string[];
        time_slots?: Array<{
          start?: string;
          end?: string;
        }>;
      }>;
    }>;
    [key: string]: any;
  }>;

  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PartyState {
  data: Party | null;
  loading: boolean;
  error: string | null;
  lastFetchedId: string | null;
}

const initialState: PartyState = {
  data: null,
  loading: false,
  error: null,
  lastFetchedId: null,
};

// ================== Async Thunk ==================
export const fetchPartyById = createAsyncThunk<
  Party,
  string, // argument: partyId
  { rejectValue: string }
>("party/fetchPartyById", async (partyId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    const url = `${API_BASE_URL}api/v1/parties/${partyId}`;

    console.log(`Fetching party: ${url}`);

    const response = await axios.get<{
      success: boolean;
      message?: string;
      data: Party;
    }>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch party details");
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : error.message || "Failed to load party information";

    console.error("❌ Fetch party error:", errorMessage);
    return rejectWithValue(errorMessage);
  }
});

// ================== Slice ==================
const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    clearParty: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastFetchedId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartyById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.lastFetchedId = action.meta.arg; // save which ID we tried to fetch
      })
      .addCase(fetchPartyById.fulfilled, (state, action: PayloadAction<Party>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPartyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch party details";
      });
  },
});

export const { clearParty } = partySlice.actions;
export default partySlice.reducer;
