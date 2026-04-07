import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ManagerCall {
  id: string;
  status: string;
  remarks: string | null;
  comments: string | null;
  scheduleId: string;
  partyId: string;
  locationId: string;
  partyScheduleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ManagerScheduleDay {
  callDate: string;
  calls: ManagerCall[];
}

export interface ManagerScheduleItem {
  id: string;
  salesmanId: string;
  teamId: string;
  month: number;
  year: number;
  status: string;
  approvedBy: string | null;
  approvedAt: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  row_version: number;
  updated_by: string | null;
  salesmanName: string;
  salesmanPhone: string;
  totalCalls: number;
  calls: ManagerScheduleDay[];
}

interface ManagerScheduleState {
  data: ManagerScheduleItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ManagerScheduleState = {
  data: [],
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchManagerSchedule = createAsyncThunk<
  ManagerScheduleItem[],
  void,
  { rejectValue: string }
>("managerSchedule/fetchManagerSchedule", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    const response = await axios.get<{
      schedule: ManagerScheduleItem[];
    }>(`${API_BASE_URL}api/v1/schedule`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.schedule;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch manager schedules");
  }
});

const managerScheduleSlice = createSlice({
  name: "managerSchedule",
  initialState,
  reducers: {
    clearManagerSchedules: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagerSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManagerSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchManagerSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearManagerSchedules } = managerScheduleSlice.actions;
export default managerScheduleSlice.reducer;
