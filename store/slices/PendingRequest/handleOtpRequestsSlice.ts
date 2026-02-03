// src/features/auth/handleOtpRequestsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ────────────────────────────────────────────────
//                Request Payload Type
// ────────────────────────────────────────────────

export interface HandleOtpRequestPayload {
  requestId: string; // ID of the pending OTP request
  action: "approve" | "reject" | "resend" | "cancel"; // or whatever actions your API supports
  comment?: string; // optional admin remark / rejection reason
  // Add any other fields your API expects (e.g. newOtp, userId, etc.)
}

// ────────────────────────────────────────────────
//                Response Type
// ────────────────────────────────────────────────

export interface HandleOtpResponse {
  success: boolean;
  message: string;
  data?: {
    requestId: string;
    status: "approved" | "rejected" | "cancelled" | "pending";
    updatedAt: string;
    [key: string]: any;
  };
}

// ────────────────────────────────────────────────
//                   State
// ────────────────────────────────────────────────

interface HandleOtpState {
  loading: boolean;
  success: boolean;
  error: string | null;
  lastActionResult: HandleOtpResponse | null;
  lastProcessedRequestId: string | null;
}

const initialState: HandleOtpState = {
  loading: false,
  success: false,
  error: null,
  lastActionResult: null,
  lastProcessedRequestId: null,
};

// ────────────────────────────────────────────────
//             Async Thunk (POST request)
// ────────────────────────────────────────────────

export const handleOtpRequest = createAsyncThunk<
  HandleOtpResponse,
  HandleOtpRequestPayload,
  { rejectValue: string }
>("auth/handleOtpRequest", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No authentication token found. Please login.");
    }

    const response = await axios.post<HandleOtpResponse>(
      `${baseUrl}api/v1/auth/handle-otp-requests`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to process OTP request");
    }

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to handle OTP request. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// ────────────────────────────────────────────────
//                     Slice
// ────────────────────────────────────────────────

const handleOtpSlice = createSlice({
  name: "handleOtp",
  initialState,
  reducers: {
    clearHandleOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.lastActionResult = null;
      state.lastProcessedRequestId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleOtpRequest.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.lastProcessedRequestId = action.meta.arg.requestId;
      })
      .addCase(handleOtpRequest.fulfilled, (state, action: PayloadAction<HandleOtpResponse>) => {
        state.loading = false;
        state.success = true;
        state.lastActionResult = action.payload;
      })
      .addCase(handleOtpRequest.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to process OTP request";
      });
  },
});

export const { clearHandleOtpState } = handleOtpSlice.actions;
export default handleOtpSlice.reducer;

// ────────────────────────────────────────────────
//                    Selectors
// ────────────────────────────────────────────────

export const selectOtpHandlingLoading = (state: any) => state.handleOtp.loading;
export const selectOtpHandlingSuccess = (state: any) => state.handleOtp.success;
export const selectOtpHandlingError = (state: any) => state.handleOtp.error;
export const selectLastOtpActionResult = (state: any) => state.handleOtp.lastActionResult;
export const selectLastProcessedRequestId = (state: any) => state.handleOtp.lastProcessedRequestId;
