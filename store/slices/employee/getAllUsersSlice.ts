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
  role?: {
    roleName: string;
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

// Async Thunk: Get All Users (GET /api/v1/users)
export const getAllUsers = createAsyncThunk<GetUsersResponse, void, { rejectValue: string }>(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<GetUsersResponse>(`${baseUrl}api/v1/users`, {
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
  }
);

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
