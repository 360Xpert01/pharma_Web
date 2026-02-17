// src/features/schedule/scheduleHandleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface HandleSchedulePayload {
  status: "Accepted" | "Rejected";
  remarks?: string;
}

interface HandleScheduleResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface HandleScheduleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  lastHandledId: string | null;
}

const initialState: HandleScheduleState = {
  loading: false,
  success: false,
  error: null,
  lastHandledId: null,
};

// Base URL from env
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const handleSchedule = createAsyncThunk<
  { message: string; scheduleId: string },
  { scheduleId: string; payload: HandleSchedulePayload },
  { rejectValue: string }
>("schedule/handleSchedule", async ({ scheduleId, payload }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.put<HandleScheduleResponse>(
      `${API_BASE_URL}api/v1/schedule/${scheduleId}/handle`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to handle schedule");
    }

    return {
      message: response.data.message,
      scheduleId,
    };
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "Failed to update schedule status";
    return rejectWithValue(message);
  }
});

// ================== Slice ==================
const scheduleHandleSlice = createSlice({
  name: "scheduleHandle",
  initialState,
  reducers: {
    resetHandleState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.lastHandledId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(handleSchedule.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.lastHandledId = action.meta.arg.scheduleId;
      })
      // Fulfilled
      .addCase(handleSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        // You can store last message if needed
      })
      // Rejected
      .addCase(handleSchedule.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "An error occurred while handling schedule";
      });
  },
});

export const { resetHandleState } = scheduleHandleSlice.actions;
export default scheduleHandleSlice.reducer;
