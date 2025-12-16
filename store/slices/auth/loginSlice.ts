import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface RequestOtpPayload {
  email: string;
  deviceId: string;
}

interface RequestOtpResponse {
  success: boolean;
  message: string;
  // Add other fields if your API returns more
}

interface AuthState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

// Initial State
const initialState: AuthState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

// Async Thunk: Request OTP
export const requestOtp = createAsyncThunk<
  RequestOtpResponse,
  RequestOtpPayload,
  { rejectValue: string }
>("auth/requestOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post<RequestOtpResponse>(
      `${baseUrl}api/v1/auth/request-otp`,
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
      error.response?.data?.message || error.message || "Failed to send OTP. Please try again.";

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
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      // Fulfilled
      .addCase(requestOtp.fulfilled, (state, action: PayloadAction<RequestOtpResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "OTP sent successfully!";
      })
      // Rejected
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetOtpState } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
