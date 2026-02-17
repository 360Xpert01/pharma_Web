// src/features/schedule/singleScheduleByFilterSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { SingleScheduleDetail, SingleScheduleResponse } from "../../../lib/interface/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ScheduleByFilterState {
  detail: SingleScheduleDetail | null; // ← renamed from data
  isLoading: boolean; // ← more descriptive
  errorMessage: string | null; // ← more descriptive
}

const initialState: ScheduleByFilterState = {
  detail: null,
  isLoading: false,
  errorMessage: null,
};

// Thunk - same endpoint, just better naming
export const fetchScheduleByFilter = createAsyncThunk<
  SingleScheduleDetail,
  string, // scheduleId
  { rejectValue: string }
>("scheduleByFilter/fetchScheduleByFilter", async (scheduleId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found");
    }

    const response = await axios.get<SingleScheduleResponse>(
      `${API_BASE_URL}api/v1/schedule/${scheduleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.success) {
      return rejectWithValue(response.data.message);
    }

    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to fetch filtered schedule details"
    );
  }
});

const singleScheduleByFilterSlice = createSlice({
  name: "scheduleByFilter",
  initialState,
  reducers: {
    resetScheduleByFilter: (state) => {
      // ← renamed action
      state.detail = null;
      state.isLoading = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduleByFilter.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(
        fetchScheduleByFilter.fulfilled,
        (state, action: PayloadAction<SingleScheduleDetail>) => {
          state.isLoading = false;
          state.detail = action.payload;
        }
      )
      .addCase(fetchScheduleByFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload ?? "An unknown error occurred";
      });
  },
});

export const { resetScheduleByFilter } = singleScheduleByFilterSlice.actions;

export default singleScheduleByFilterSlice.reducer;
