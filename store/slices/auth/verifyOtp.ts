import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { PermissionGroupName } from "@/lib/rbac";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface VerifyOtpPayload {
  deviceId: string;
  otp: number | string;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken?: string;
    userEmail?: string;
    permissionGroupId?: string;
    permissionGroupName?: PermissionGroupName;
    deviceId?: string;
    userName?: string;
    user?: any;
  };
  token?: string;
}

interface AuthState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  token: string | null;
  permissionGroupId: string | null;
  permissionGroupName: PermissionGroupName | null;
  userEmail: string | null;
  userName: string | null;
  user: any | null;
}

const initialState: AuthState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  token: null,
  permissionGroupId: null,
  permissionGroupName: null,
  userEmail: null,
  userName: null,
  user: null,
};

export const verifyOtp = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpPayload,
  { rejectValue: string }
>("auth/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.put<VerifyOtpResponse>(
      `${baseUrl}api/v1/auth/verify-otp`,
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
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Invalid OTP. Please try again."
    );
  }
});

const verifyOtpSlice = createSlice({
  name: "verifyAuth",
  initialState,
  reducers: {
    resetVerifyState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
    logout: (state) => {
      // ✅ wipe everything on logout
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<VerifyOtpResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Login successful!";

        // ✅ token
        state.token = action.payload.token ?? action.payload.data?.accessToken ?? null;

        // ✅ permission data (override from requestOtp if verify also returns it)
        if (action.payload.data?.permissionGroupId)
          state.permissionGroupId = action.payload.data.permissionGroupId;
        if (action.payload.data?.permissionGroupName)
          state.permissionGroupName = action.payload.data.permissionGroupName;
        if (action.payload.data?.userEmail) state.userEmail = action.payload.data.userEmail;
        if (action.payload.data?.userName) state.userName = action.payload.data.userName;
        if (action.payload.data?.user) state.user = action.payload.data.user;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "OTP verification failed";
      });
  },
});

export const { resetVerifyState, logout } = verifyOtpSlice.actions;
export default verifyOtpSlice.reducer;
