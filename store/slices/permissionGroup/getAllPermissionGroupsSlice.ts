import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "@/store"; // ✅ import RootState

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface PermissionGroup {
  id: string;
  pulseCode: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface GetPermissionGroupsResponse {
  success: boolean;
  data: PermissionGroup[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface PermissionGroupState {
  loading: boolean;
  success: boolean;
  error: string | null;
  permissionGroups: PermissionGroup[];
}

const initialState: PermissionGroupState = {
  loading: false,
  success: false,
  error: null,
  permissionGroups: [],
};

export const getAllPermissionGroups = createAsyncThunk<
  GetPermissionGroupsResponse,
  void,
  { rejectValue: string; state: RootState } // ✅ typed state
>("permissionGroup/getAllPermissionGroups", async (_, { rejectWithValue, getState }) => {
  try {
    // ✅ read token from Redux — not localStorage directly
    const token = getState().verifyOtp.token;
    if (!token) return rejectWithValue("No session found. Please login again.");

    const response = await axios.get<GetPermissionGroupsResponse>(
      `${baseUrl}api/v1/permissionGroup`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch permission groups."
    );
  }
});

const getAllPermissionGroupsSlice = createSlice({
  name: "allPermissionGroups",
  initialState,
  reducers: {
    resetPermissionGroupsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.permissionGroups = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPermissionGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPermissionGroups.fulfilled,
        (state, action: PayloadAction<GetPermissionGroupsResponse>) => {
          state.loading = false;
          state.success = true;
          state.permissionGroups = action.payload.data || [];
        }
      )
      .addCase(getAllPermissionGroups.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load permission groups";
        state.permissionGroups = [];
      });
  },
});

export const { resetPermissionGroupsState } = getAllPermissionGroupsSlice.actions;
export default getAllPermissionGroupsSlice.reducer;
