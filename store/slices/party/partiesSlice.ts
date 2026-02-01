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
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

const initialState: PartiesState = {
  loading: false,
  success: false,
  error: null,
  parties: [],
  pagination: null,
};

// Pagination/Search Parameters Type
interface GetPartiesParams {
  channelTypeId: string;
  page?: number;
  limit?: number;
  search?: string;
  segmentId?: string;
  specializationId?: string;
  status?: string;
}

interface GetPartiesResponse {
  success: boolean;
  message?: string;
  data: PartyItem[]; // or sometimes wrapped in 'items'
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getPartiesByChannelType = createAsyncThunk<
  GetPartiesResponse,
  string | GetPartiesParams,
  { rejectValue: string }
>("parties/getPartiesByChannelType", async (params, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    let channelTypeId = "";
    let page = 1;
    let limit = 10;
    let search = "";
    let segmentId = "";
    let specializationId = "";
    let status = "";

    if (typeof params === "string") {
      channelTypeId = params;
    } else {
      channelTypeId = params.channelTypeId;
      page = params.page || 1;
      limit = params.limit || 10;
      search = params.search || "";
      segmentId = params.segmentId || "";
      specializationId = params.specializationId || "";
      status = params.status || "";
    }

    const queryParams: any = { channelTypeId, page, limit, search };
    if (segmentId) queryParams.segmentId = segmentId;
    if (specializationId) queryParams.specializationId = specializationId;
    if (status) queryParams.status = status;

    const response = await axios.get<GetPartiesResponse>(`${baseUrl}api/v1/parties`, {
      params: queryParams,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
    });

    // Normalize response data structure
    const resData: any = response.data;

    // If backend returns standard { success, data, pagination }
    if (
      resData.success !== undefined &&
      (Array.isArray(resData.data) || Array.isArray(resData.data?.items))
    ) {
      let items = Array.isArray(resData.data) ? resData.data : resData.data?.items || [];
      // If pagination is inside data
      let pagination = resData.pagination || resData.data?.pagination || null;

      return {
        success: true,
        data: items,
        pagination,
      };
    }

    // Fallback for simple array response or non-standard structure
    if (Array.isArray(resData)) {
      return {
        success: true,
        data: resData,
        pagination: null,
      };
    }

    // Fallback for { items: [] } structure
    if (resData?.items && Array.isArray(resData.items)) {
      return {
        success: true,
        data: resData.items,
        pagination: resData.pagination || null,
      };
    }

    return {
      success: true,
      data: [],
      pagination: null,
    };
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
      state.error = null;
      state.parties = [];
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
      .addCase(
        getPartiesByChannelType.fulfilled,
        (state, action: PayloadAction<GetPartiesResponse>) => {
          state.loading = false;
          state.success = true;
          state.parties = action.payload.data;
          state.pagination = action.payload.pagination || null;
        }
      )
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
