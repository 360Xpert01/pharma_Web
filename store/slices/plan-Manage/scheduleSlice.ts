import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ScheduleItem {
  salesmanId: string;
  salesmanName: string;
  id: string;
  month: string;
  year: number;
  status: string;
  campaignId: string;
  teamId: string;
  teamName?: string;
  channelId?: string;
  channelName?: string;
  createdAt: string;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ScheduleState {
  data: ScheduleItem[];
  pagination: PaginationInfo;
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  data: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchCrmSchedule = createAsyncThunk<
  { data: ScheduleItem[]; pagination: PaginationInfo },
  { page: number; limit: number } | void,
  { rejectValue: string }
>("schedule/fetchCrmSchedule", async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;

    const response = await axios.get<{
      success: boolean;
      message: string;
      data: ScheduleItem[];
      pagination: PaginationInfo;
    }>(`${API_BASE_URL}api/v1/schedule/crm`, {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "API returned unsuccessful response");
    }

    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error: any) {
    let errorMessage = "Failed to fetch CRM schedule";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.message || error.message || "Network error or server is unreachable";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return rejectWithValue(errorMessage);
  }
});

// ================== Slice ==================
const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    clearSchedule: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrmSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCrmSchedule.fulfilled,
        (state, action: PayloadAction<{ data: ScheduleItem[]; pagination: PaginationInfo }>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchCrmSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export const { clearSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
