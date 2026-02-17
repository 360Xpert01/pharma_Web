import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface VerifyOtpPayload {
  deviceId: string;
  otp: number | string;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: any;
}

interface AuthState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  token: string | null;
}

// Initial State
const initialState: AuthState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  token: null,
};

// Async Thunk: Verify OTP (PUT request)
export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>("auth/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.put<VerifyOtpResponse>(
      `${baseUrl}api/v1/auth/verify-otp`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Invalid OTP. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
    logout: (state) => {
      state.token = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Verify OTP Pending
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      // Verify OTP Success
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<VerifyOtpResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Login successful!";
        state.token = action.payload.token || null;
      })
      // Verify OTP Failed
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "OTP verification failed";
      });
  },
});

export const { resetOtpState, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
