import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface UserItem {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  pulseCode: string;
  roleId?: string;
  mobileNumber?: string;
  fullAddress?: string;
  empLegacyCode?: string;
  profilePicture?: string;
  dob?: string;
  supervisorId?: string;
  teamId?: string;
  role?: {
    roleName: string;
  };
  teams?: Array<{
    id: string;
    name: string;
  }>;
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

interface UsersState {
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

// Initial State
const initialState: UsersState = {
  loading: false,
  success: false,
  error: null,
  users: [],
  pagination: null,
};

// Pagination Parameters Type
interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  roleId?: string;
  teamId?: string;
  supervisorId?: string;
}

// Async Thunk: Get All Users (GET /api/v1/users)
export const getAllUsers = createAsyncThunk<
  GetUsersResponse,
  PaginationParams | void,
  { rejectValue: string }
>("users/getAllUsers", async (params, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    // Build query parameters
    const page = params && typeof params === "object" ? params.page || 1 : 1;
    const limit = params && typeof params === "object" ? params.limit || 10 : 10;
    const search = params && typeof params === "object" ? params.search || "" : "";
    const status = params && typeof params === "object" ? params.status || "" : "";
    const roleId = params && typeof params === "object" ? params.roleId || "" : "";
    const teamId = params && typeof params === "object" ? params.teamId || "" : "";
    const supervisorId = params && typeof params === "object" ? params.supervisorId || "" : "";

    // Build query params object, only include filters if they have values
    const queryParams: any = { page, limit, search };
    if (status) queryParams.status = status;
    if (roleId) queryParams.roleId = roleId;
    if (teamId) queryParams.teamId = teamId;
    if (supervisorId) queryParams.supervisorId = supervisorId;

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

// Slice
const getAllUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    resetUsersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<GetUsersResponse>) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination || null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load users";
        state.users = [];
      });
  },
});

// Export actions
export const { resetUsersState } = getAllUsersSlice.actions;

// Export reducer
export default getAllUsersSlice.reducer;
