import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// Types
export interface DeviceItem {
  id: string;
  deviceId: string;
  deviceName: string;
  deviceType: string;
  status: "pending" | "approved";
  createdAt: string;
}

interface UserDevicesResponse {
  success: boolean;
  data: {
    devices: DeviceItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

interface UserDevicesState {
  loading: boolean;
  success: boolean;
  error: string | null;
  devices: DeviceItem[];
  pagination: UserDevicesResponse["data"]["pagination"] | null;
}

// Initial State
const initialState: UserDevicesState = {
  loading: false,
  success: false,
  error: null,
  devices: [],
  pagination: null,
};

// Async Thunk: Get User Devices (GET /api/v1/users/devices/{userId})
export const getUserDevices = createAsyncThunk<
  UserDevicesResponse,
  string,
  { rejectValue: string }
>("device/getUserDevices", async (userId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<UserDevicesResponse>(
      `${baseUrl}api/v1/users/devices/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to fetch user devices.";
    return rejectWithValue(errorMessage);
  }
});

// Slice
const getUserDevicesSlice = createSlice({
  name: "userDevices",
  initialState,
  reducers: {
    resetUserDevicesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.devices = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDevices.fulfilled, (state, action: PayloadAction<UserDevicesResponse>) => {
        state.loading = false;
        state.success = true;
        state.devices = action.payload.data.devices;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(getUserDevices.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "An unexpected error occurred.";
      });
  },
});

export const { resetUserDevicesState } = getUserDevicesSlice.actions;
export default getUserDevicesSlice.reducer;
