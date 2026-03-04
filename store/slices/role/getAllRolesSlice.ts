import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BasePaginationParams } from "@/types/api";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface RoleItem {
  id: string;
  roleName: string;
  pulseCode: string;
  legacyCode?: string;
  parentRoleId?: string;
  createdAt?: string;
  permissions?: number;
  status?: "active" | "inactive";
}

interface GetRolesResponse {
  success: boolean;
  message?: string;
  roles: RoleItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface RoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  roles: RoleItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

// Initial State
const initialState: RoleState = {
  loading: false,
  success: false,
  error: null,
  roles: [],
  pagination: null,
};

// Async Thunk: Get All Roles (GET /api/v1/role)
export const getAllRoles = createAsyncThunk<
  GetRolesResponse,
  BasePaginationParams | void,
  { rejectValue: string }
>("role/getAllRoles", async (params, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const queryParams: any = {
      page: params?.page || 1,
      limit: params?.limit || 10,
      search: params?.search || "",
      sort: params?.sort || "pulseCode",
      order: params?.order || "asc",
    };

    if (params?.pagination !== undefined) {
      queryParams.pagination = params.pagination;
    }

    const response = await axios.get<GetRolesResponse>(`${baseUrl}api/v1/role`, {
      params: queryParams,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch roles. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllRolesSlice = createSlice({
  name: "allRoles",
  initialState,
  reducers: {
    resetRolesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.roles = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRoles.fulfilled, (state, action: PayloadAction<GetRolesResponse>) => {
        state.loading = false;
        state.success = true;
        state.roles = action.payload.roles || [];
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load roles";
        state.roles = [];
        state.pagination = null;
      });
  },
});

// Export actions
export const { resetRolesState } = getAllRolesSlice.actions;

// Export reducer
export default getAllRolesSlice.reducer;
