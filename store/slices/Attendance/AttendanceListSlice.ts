import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface AttendanceUser {
  id: string;
  name: string;
  email: string;
}

export interface AttendanceRecordItem {
  id?: string;
  checkInAtPKT?: string | null;
  checkOutAtPKT?: string | null;
  flaggedReason?: string | null;
  totalSeconds?: number | null;
  territory?: { id?: string; pulseCode?: string; description?: string } | null;
}

export interface AttendanceItem {
  id?: string;
  attendanceDateFormatted?: string;
  day?: string;
  user?: AttendanceUser;
  // Flat user fields sometimes returned
  name?: string;
  email?: string;
  records?: AttendanceRecordItem[];
  // Flat attendance fields sometimes returned
  checkInAtPKT?: string | null;
  checkOutAtPKT?: string | null;
  totalSeconds?: number | null;
  territory?: { id?: string; pulseCode?: string; description?: string } | null;
}

export interface AttendancePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface AttendanceListState {
  list: AttendanceItem[];
  pagination: AttendancePagination;
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceListState = {
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

interface FetchAttendanceParams {
  userId?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
  regionId?: string;
  searchTerm?: string;
  sort?: string;
  order?: string;
}

export const fetchAttendanceTableList = createAsyncThunk<
  { data: AttendanceItem[]; pagination: AttendancePagination },
  FetchAttendanceParams,
  { rejectValue: string }
>("attendanceList/fetch", async (params, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");

    // Clean up params to avoid sending empty strings which might fail date validation
    const queryParams: any = {
      page: params.page,
      limit: params.limit,
    };

    if (params.userId) queryParams.userId = params.userId;
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    if (params.regionId) queryParams.territoryId = params.regionId;
    if (params.searchTerm) queryParams.search = params.searchTerm;
    if (params.sort) queryParams.sort = params.sort;
    if (params.order) queryParams.order = params.order;

    const response = await axios.get(`${baseUrl}api/v1/attendance/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
      params: queryParams,
    });

    return {
      data: response.data.data || [],
      pagination: response.data.pagination || {
        page: params.page || 1,
        limit: params.limit || 10,
        total: (response.data.data || []).length,
        totalPages: 1,
      },
    };
  } catch (err: any) {
    const message = err.response?.data?.message || err.message || "Failed to load attendance list";
    return rejectWithValue(message);
  }
});

const attendanceListSlice = createSlice({
  name: "attendanceList",
  initialState,
  reducers: {
    resetAttendanceList: (state) => {
      state.list = [];
      state.pagination = initialState.pagination;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceTableList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAttendanceTableList.fulfilled,
        (
          state,
          action: PayloadAction<{ data: AttendanceItem[]; pagination: AttendancePagination }>
        ) => {
          state.loading = false;
          state.list = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchAttendanceTableList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAttendanceList } = attendanceListSlice.actions;
export default attendanceListSlice.reducer;

// Selectors
export const selectAttendanceTableList = (state: { attendanceList: AttendanceListState }) =>
  state.attendanceList.list;
export const selectAttendanceTablePagination = (state: { attendanceList: AttendanceListState }) =>
  state.attendanceList.pagination;
export const selectAttendanceTableLoading = (state: { attendanceList: AttendanceListState }) =>
  state.attendanceList.loading;
export const selectAttendanceTableError = (state: { attendanceList: AttendanceListState }) =>
  state.attendanceList.error;
