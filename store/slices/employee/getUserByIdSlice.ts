import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface UserData {
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
  status?: string;
}

interface GetUserByIdResponse {
  success: boolean;
  message?: string;
  data: UserData;
}

interface GetUserByIdState {
  loading: boolean;
  success: boolean;
  error: string | null;
  user: UserData | null;
}

// Initial State
const initialState: GetUserByIdState = {
  loading: false,
  success: false,
  error: null,
  user: null,
};

// Async Thunk: Get User By ID (GET /api/v1/users/{userId})
export const getUserById = createAsyncThunk<GetUserByIdResponse, string, { rejectValue: string }>(
  "users/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<GetUserByIdResponse>(`${baseUrl}api/v1/users/${userId}`, {
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
        "Failed to fetch user data. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const getUserByIdSlice = createSlice({
  name: "getUserById",
  initialState,
  reducers: {
    resetGetUserByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<GetUserByIdResponse>) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load user";
        state.user = null;
      });
  },
});

// Export actions
export const { resetGetUserByIdState } = getUserByIdSlice.actions;

// Export reducer
export default getUserByIdSlice.reducer;
