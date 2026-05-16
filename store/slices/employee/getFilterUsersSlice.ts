import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BasePaginationParams } from "@/types/api";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Dedicated users slice for filter dropdowns (Supervisor / Employee / Sales Rep).
 *
 * This intentionally mirrors getAllUsersSlice but lives in its own state key
 * (`filterUsers`). The filter dropdowns previously dispatched getAllUsers into
 * the shared `allUsers` slice, which is also the data source for the employee
 * list table. Opening a filter therefore reloaded and re-paginated the table
 * (looked like an auto page refresh and broke pagination). Keeping the filter's
 * lookup list in a separate slice removes that collision.
 */

interface UserItem {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  pulseCode: string;
  roleId?: string;
  mobileNumber?: string;
  role?: {
    roleName: string;
  };
  teams?: Array<{
    id: string;
    name: string;
  }>;
  team?: {
    id: string;
    name: string;
  };
  supervisor?: {
    id: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
  };
}

interface GetUsersResponse {
  success: boolean;
  message?: string;
  data: UserItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface FilterUsersState {
  loading: boolean;
  success: boolean;
  error: string | null;
  users: UserItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

const initialState: FilterUsersState = {
  loading: false,
  success: false,
  error: null,
  users: [],
  pagination: null,
};

interface PaginationParams extends BasePaginationParams {
  status?: string;
  roleId?: string;
  teamId?: string;
  supervisorId?: string;
}

// Async Thunk: Get Users for filter dropdowns (GET /api/v1/users)
export const getFilterUsers = createAsyncThunk<
  GetUsersResponse,
  PaginationParams | void,
  { rejectValue: string }
>("filterUsers/getFilterUsers", async (params, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const search = params?.search || "";
    const status = params?.status || "";
    const roleId = params?.roleId || "";
    const teamId = params?.teamId || "";
    const supervisorId = params?.supervisorId || "";
    const sort = params?.sort || "";
    const order = params?.order || "";

    const queryParams: any = { page, limit, search };
    if (status) queryParams.status = status;
    if (roleId) queryParams.roleId = roleId;
    if (teamId) queryParams.teamId = teamId;
    if (supervisorId) queryParams.supervisorId = supervisorId;
    if (sort) queryParams.sort = sort;
    if (order) queryParams.order = order;

    const response = await axios.get<GetUsersResponse>(`${baseUrl}api/v1/users`, {
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
      "Failed to fetch users. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

const getFilterUsersSlice = createSlice({
  name: "filterUsers",
  initialState,
  reducers: {
    resetFilterUsersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.users = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilterUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilterUsers.fulfilled, (state, action: PayloadAction<GetUsersResponse>) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getFilterUsers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load users";
        state.users = [];
      });
  },
});

export const { resetFilterUsersState } = getFilterUsersSlice.actions;

export default getFilterUsersSlice.reducer;
