// src/features/parties/partiesSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ── Types ────────────────────────────────────────────────────────────────

export interface LocationScheduleTimeSlot {
  start: string; // e.g. "09:00"
  end: string; // e.g. "13:00"
}

export interface LocationScheduleData {
  days: string[]; // ["MONDAY", "WEDNESDAY", ...]
  time_slots: LocationScheduleTimeSlot[];
}

export interface LocationSchedule {
  scheduleType: "WEEKLY" | string;
  validFrom: string; // "2026-01-01"
  validUntil: string | null;
  scheduleData: LocationScheduleData[];
}

export interface PartyLocation {
  locationType: "CLINIC" | string;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  schedules: LocationSchedule[];
}

export interface BasicInfo {
  party_type: "DOCTOR" | "CLINIC" | string;
  name: string;
  email: string;
  phoneNumber: string;
  image: string;
  description: string;
  segmentId: string;
  status: "ACTIVE" | "INACTIVE" | string;
}

export interface PartyAttributes {
  specialization: string; // UUID
  qualification: string;
  segment: string;
  designation: string;
  date_of_birth: string;
  pmdcNumber: string;
}

export interface CreatePartyPayload {
  channelTypeId: string;
  basicInfo: BasicInfo;
  attributes: PartyAttributes;
  locations: PartyLocation[];
}

// Response type (adjust based on actual API response)
export interface CreatedParty {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  // ... add more fields as per real response
}

interface PartiesState {
  createLoading: boolean;
  createSuccess: boolean;
  createError: string | null;
  createdParty: CreatedParty | null;
}

// ── Initial State ───────────────────────────────────────────────────────

const initialState: PartiesState = {
  createLoading: false,
  createSuccess: false,
  createError: null,
  createdParty: null,
};

// ── Async Thunk: Create Party (POST) ────────────────────────────────────

export const createParty = createAsyncThunk<
  CreatedParty,
  CreatePartyPayload,
  { rejectValue: string }
>("parties/createParty", async (payload: CreatePartyPayload, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreatedParty>(`${baseUrl}api/v1/parties`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create party. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// ── Slice ────────────────────────────────────────────────────────────────

const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    resetCreatePartyState: (state) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = null;
      state.createdParty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createParty.pending, (state) => {
        state.createLoading = true;
        state.createSuccess = false;
        state.createError = null;
      })
      .addCase(createParty.fulfilled, (state, action: PayloadAction<CreatedParty>) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.createdParty = action.payload;
      })
      .addCase(createParty.rejected, (state, action) => {
        state.createLoading = false;
        state.createSuccess = false;
        state.createError = action.payload || "Failed to create party";
        state.createdParty = null;
      });
  },
});

// ── Exports ─────────────────────────────────────────────────────────────

export const { resetCreatePartyState } = partiesSlice.actions;
export default partiesSlice.reducer;

// ── Selectors ───────────────────────────────────────────────────────────

export const selectCreatePartyLoading = (state: any) => state.parties.createLoading;
export const selectCreatePartySuccess = (state: any) => state.parties.createSuccess;
export const selectCreatePartyError = (state: any) => state.parties.createError;
export const selectCreatedParty = (state: any) => state.parties.createdParty;
