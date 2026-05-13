import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface CallProduct {
  id: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CallSample {
  id: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyCallRecord {
  id: string;
  callDate: string;
  salrepname: string;
  status: string;
  checkInAt: string;
  remarks: string;
  comments: string;
  fake_call: string | boolean;
  partyId: string;
  partyname: string;
  segment: string;
  territoryname: string;
  callProducts: CallProduct[];
  callSamples: CallSample[];
}

export interface DailyCallPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface DailyCallReportState {
  list: DailyCallRecord[];
  pagination: DailyCallPagination;
  loading: boolean;
  error: string | null;
}

const initialState: DailyCallReportState = {
  list: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface FetchDailyCallReportParams {
  salrepname?: string;
  territoryname?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
}

export const fetchDailyCallReport = createAsyncThunk<
  { data: DailyCallRecord[]; pagination: DailyCallPagination },
  FetchDailyCallReportParams,
  { rejectValue: string }
>("dailyCallReport/fetch", async (params, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");

    const queryParams: any = {
      page: params.page || 1,
      limit: params.limit || 10,
    };

    if (params.salrepname) queryParams.salrepname = params.salrepname;
    if (params.territoryname) queryParams.territoryname = params.territoryname;
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    if (params.search) queryParams.search = params.search;
    if (params.sort) queryParams.sort = params.sort;
    if (params.order) queryParams.order = params.order;

    const response = await axios.get(`${baseUrl}api/v1/call/daily-call-report`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
      params: queryParams,
    });

    return {
      data: response.data.data.calls || [],
      pagination: response.data.data.pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        total: 0,
        totalPages: 0,
      },
    };
  } catch (err: any) {
    const message =
      err.response?.data?.message || err.message || "Failed to load daily call report";
    return rejectWithValue(message);
  }
});

const dailyCallReportSlice = createSlice({
  name: "dailyCallReport",
  initialState,
  reducers: {
    resetDailyCallReport: (state) => {
      state.list = [];
      state.pagination = initialState.pagination;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyCallReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDailyCallReport.fulfilled,
        (
          state,
          action: PayloadAction<{ data: DailyCallRecord[]; pagination: DailyCallPagination }>
        ) => {
          state.loading = false;
          state.list = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchDailyCallReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDailyCallReport } = dailyCallReportSlice.actions;
export default dailyCallReportSlice.reducer;
