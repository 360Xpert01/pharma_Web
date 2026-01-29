// src/features/parties/partiesSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

export interface PartyItem {
  id: string;
  party_id?: string;
  party_name?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  status?: string;
  segment?: string;
  segment_name?: string;
  segmentId?: string;
  type?: string;
  channel_id?: string;
  channel_name?: string;
  pmdcNumber?: string;
  specialization?: string;
  qualification?: string;
  designation?: string;
  date_of_birth?: string;
  attributes?: {
    id?: string;
    partyId?: string;
    pmdcNumber?: string;
    specialization?: string;
    qualification?: string;
    designation?: string;
    date_of_birth?: string;
  };
  locations?: Array<{
    city?: string;
    address?: string;
    country?: string;
  }>;
  parent?: string;
  created_at?: string;
  updated_at?: string;
}

interface PartiesState {
  loading: boolean;
  success: boolean;
  error: string | null;
  parties: PartyItem[];
}

const initialState: PartiesState = {
  loading: false,
  success: false,
  error: null,
  parties: [],
};

export const getPartiesByChannelType = createAsyncThunk<
  PartyItem[],
  string,
  { rejectValue: string }
>("parties/getPartiesByChannelType", async (channelTypeId: string, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<PartyItem[]>(
      `${baseUrl}api/v1/parties?channelTypeId=${channelTypeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      }
    );

    const resData = response.data as any;
    if (Array.isArray(resData)) return resData;
    if (resData?.data?.items && Array.isArray(resData.data.items)) {
      return resData.data.items;
    }
    if (resData?.items && Array.isArray(resData.items)) {
      return resData.items;
    }
    return [];
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch parties. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    resetPartiesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.parties = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartiesByChannelType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getPartiesByChannelType.fulfilled, (state, action: PayloadAction<PartyItem[]>) => {
        state.loading = false;
        state.success = true;
        state.parties = action.payload;
      })
      .addCase(getPartiesByChannelType.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load parties";
        state.parties = [];
      });
  },
});

export const { resetPartiesState } = partiesSlice.actions;
export default partiesSlice.reducer;

export const selectParties = (state: any) => state.parties.parties;
export const selectPartiesLoading = (state: any) => state.parties.loading;
export const selectPartiesError = (state: any) => state.parties.error;
