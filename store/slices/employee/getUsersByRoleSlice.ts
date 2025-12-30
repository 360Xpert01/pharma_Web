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
}

interface GetUsersByRoleResponse {
  success: boolean;
  message?: string;
  data: UserItem[];
}

interface UsersByRoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  users: UserItem[];
}

// Initial State
const initialState: UsersByRoleState = {
  loading: false,
  success: false,
  error: null,
  users: [],
};

// Async Thunk: Get Users by Role (GET /api/v1/users/role/{roleId})
export const getUsersByRole = createAsyncThunk<
  GetUsersByRoleResponse,
  string,
  { rejectValue: string }
>("users/getUsersByRole", async (roleId, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetUsersByRoleResponse>(
      `${baseUrl}api/v1/users/role/${roleId}`,
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
      "Failed to fetch users by role. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getUsersByRoleSlice = createSlice({
  name: "usersByRole",
  initialState,
  reducers: {
    resetUsersByRoleState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersByRole.fulfilled, (state, action: PayloadAction<GetUsersByRoleResponse>) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
      })
      .addCase(getUsersByRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load users by role";
        state.users = [];
      });
  },
});

// Export actions
export const { resetUsersByRoleState } = getUsersByRoleSlice.actions;

// Export reducer
export default getUsersByRoleSlice.reducer;
