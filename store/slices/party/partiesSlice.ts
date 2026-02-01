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
  totalParties: number;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
}

const initialState: PartiesState = {
  loading: false,
  success: false,
  error: null,
  parties: [],
  totalParties: 0,
  pagination: null,
};

export const getPartiesByChannelType = createAsyncThunk<
  { items: PartyItem[]; pagination: any; total: number },
  { channelTypeId: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  "parties/getPartiesByChannelType",
  async ({ channelTypeId, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get(
        `${baseUrl}api/v1/parties?channelTypeId=${channelTypeId}&page=${page}&limit=${limit}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStr}`,
          },
        }
      );

      const resData = response.data;

      // Check for success: true structure
      if (resData.success && resData.data) {
        // Support for structure: { success: true, data: { items: [], pagination: {}, ... } }
        if (resData.data.items) {
          return {
            items: resData.data.items,
            pagination: resData.data.pagination || null,
            total: resData.data.pagination?.total || resData.data.total || 0,
          };
        }
        // If data is just the array
        if (Array.isArray(resData.data)) {
          return { items: resData.data, pagination: null, total: resData.data.length };
        }
      }

      // Direct array response
      if (Array.isArray(resData)) {
        return { items: resData, pagination: null, total: resData.length };
      }

      return { items: [], pagination: null, total: 0 };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch parties. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    resetPartiesState: (state) => {
      state.loading = false;
      state.error = null;
      state.parties = [];
      state.totalParties = 0;
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartiesByChannelType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getPartiesByChannelType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.parties = action.payload.items;
        state.totalParties = action.payload.total;
        state.pagination = action.payload.pagination;
      })
      .addCase(getPartiesByChannelType.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load parties";
        state.parties = [];
        state.totalParties = 0;
        state.pagination = null;
      });
  },
});

export const { resetPartiesState } = partiesSlice.actions;
export default partiesSlice.reducer;

export const selectParties = (state: any) => state.parties.parties;
export const selectPartiesLoading = (state: any) => state.parties.loading;
export const selectPartiesError = (state: any) => state.parties.error;
