import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
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

// Initial State
const initialState: PermissionGroupState = {
  loading: false,
  success: false,
  error: null,
  permissionGroups: [],
};

// Async Thunk: Get All Permission Groups (GET /api/v1/permissionGroup)
export const getAllPermissionGroups = createAsyncThunk<
  GetPermissionGroupsResponse,
  void,
  { rejectValue: string }
>("permissionGroup/getAllPermissionGroups", async (_, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetPermissionGroupsResponse>(
      `${baseUrl}api/v1/permissionGroup`,
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
      "Failed to fetch permission groups.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
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

// Export actions
export const { resetPermissionGroupsState } = getAllPermissionGroupsSlice.actions;

// Export reducer
export default getAllPermissionGroupsSlice.reducer;
