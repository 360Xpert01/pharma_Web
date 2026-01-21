// src/features/calls/callSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ── Types ────────────────────────────────────────────────────────────────

interface CallUpdatePayload {
  callId: string;
  status: "pending" | "approved" | "rejected" | "completed" | string; // add more statuses as needed
}

interface CallUpdateResponse {
  id: string;
  status: string;
  updatedAt: string;
  // add other fields that the API returns if needed
}

interface CallState {
  updateLoading: boolean;
  updateSuccess: boolean;
  updateError: string | null;
  lastUpdatedCallId: string | null;
}

// ── Initial State ───────────────────────────────────────────────────────

const initialState: CallState = {
  updateLoading: false,
  updateSuccess: false,
  updateError: null,
  lastUpdatedCallId: null,
};

// ── Async Thunk: Update Call Status (PUT) ───────────────────────────────

export const updateCallStatus = createAsyncThunk<
  CallUpdateResponse, // returned data on success
  CallUpdatePayload, // argument passed to thunk
  { rejectValue: string }
>("calls/updateCallStatus", async ({ callId, status }, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.put<CallUpdateResponse>(
      `${baseUrl}api/v1/call/${callId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to update call status. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// ── Slice ────────────────────────────────────────────────────────────────

const callSlice = createSlice({
  name: "calls",
  initialState,
  reducers: {
    resetCallUpdateState: (state) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = null;
      state.lastUpdatedCallId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Update status cases ──
      .addCase(updateCallStatus.pending, (state) => {
        state.updateLoading = true;
        state.updateSuccess = false;
        state.updateError = null;
      })
      .addCase(updateCallStatus.fulfilled, (state, action: PayloadAction<CallUpdateResponse>) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        state.lastUpdatedCallId = action.payload.id;
        // Optional: you can store more data here if the response contains it
      })
      .addCase(updateCallStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = false;
        state.updateError = action.payload || "Failed to update call status";
      });
  },
});

// ── Exports ─────────────────────────────────────────────────────────────

export const { resetCallUpdateState } = callSlice.actions;
export default callSlice.reducer;

// ── Selector examples (optional) ────────────────────────────────────────

export const selectCallUpdateLoading = (state: any) => state.calls.updateLoading;
export const selectCallUpdateSuccess = (state: any) => state.calls.updateSuccess;
export const selectCallUpdateError = (state: any) => state.calls.updateError;
export const selectLastUpdatedCallId = (state: any) => state.calls.lastUpdatedCallId;
