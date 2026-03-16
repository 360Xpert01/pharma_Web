import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { PermissionGroupName } from "@/lib/rbac";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface RequestOtpPayload {
  email: string;
  deviceId: string;
}

interface RequestOtpResponse {
  success: boolean;
  message: string;
  data?: {
    deviceId: string;
    userEmail: string;
    deviceName: string;
    deviceType: string;
    permissionGroupId: string;
    permissionGroupName: PermissionGroupName;
  };
}

interface AuthState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  permissionGroupId: string | null;
  permissionGroupName: PermissionGroupName | null;
  userEmail: string | null;
  deviceId: string | null;
}

const initialState: AuthState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  permissionGroupId: null,
  permissionGroupName: null,
  userEmail: null,
  deviceId: null,
};

export const requestOtp = createAsyncThunk<
  RequestOtpResponse,
  RequestOtpPayload,
  { rejectValue: string }
>("auth/requestOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post<RequestOtpResponse>(
      `${baseUrl}api/v1/auth/request-otp`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    if (
      response.data?.success &&
      response.data?.data?.permissionGroupName === "Sales Representative"
    ) {
      return rejectWithValue("Access denied. Please use the mobile app.");
    }

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message || "Failed to send OTP.");
  }
});

const requestOtpSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      // ✅ keep permission fields — needed for OTP verify step
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(requestOtp.fulfilled, (state, action: PayloadAction<RequestOtpResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "OTP sent successfully!";
        // ✅ store from request-otp response
        if (action.payload.data) {
          state.permissionGroupId = action.payload.data.permissionGroupId;
          state.permissionGroupName = action.payload.data.permissionGroupName;
          state.userEmail = action.payload.data.userEmail;
          state.deviceId = action.payload.data.deviceId;
        }
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
        state.permissionGroupId = null;
        state.permissionGroupName = null;
      });
  },
});

export const { resetOtpState } = requestOtpSlice.actions;
export default requestOtpSlice.reducer;
