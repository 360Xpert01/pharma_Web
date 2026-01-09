// src/features/schedule/singleScheduleDetailSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { SingleScheduleDetail, SingleScheduleResponse } from "../../../lib/interface/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface SingleScheduleState {
  data: SingleScheduleDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: SingleScheduleState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchScheduleDetail = createAsyncThunk<
  SingleScheduleDetail,
  string,
  { rejectValue: string }
>("singleSchedule/fetchScheduleDetail", async (scheduleId, { rejectWithValue }) => {
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
      error.response?.data?.message || error.message || "Failed to fetch schedule details"
    );
  }
});

const singleScheduleDetailSlice = createSlice({
  name: "singleScheduleDetail",
  initialState,
  reducers: {
    clearScheduleDetail: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduleDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchScheduleDetail.fulfilled,
        (state, action: PayloadAction<SingleScheduleDetail>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchScheduleDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknown error occurred";
      });
  },
});

export const { clearScheduleDetail } = singleScheduleDetailSlice.actions;

export default singleScheduleDetailSlice.reducer;
