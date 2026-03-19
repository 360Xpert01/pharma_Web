import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface UserProfileResponse {
  success: boolean;
  message?: string;
  data: User;
}

interface UserProfileState {
  loading: boolean;
  success: boolean;
  error: string | null;
  user: User | null;
}

const initialState: UserProfileState = {
  loading: false,
  success: false,
  error: null,
  user: null,
};

// Async Thunk: Get User Profile (GET /api/v1/users/profile)
export const getUserProfile = createAsyncThunk<UserProfileResponse, void, { rejectValue: string }>(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }
      const response = await axios.get<UserProfileResponse>(`${baseUrl}api/v1/users/profile`, {
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
        "Failed to fetch user profile data.";
      return rejectWithValue(errorMessage);
    }
  }
);

const getUserProfileSlice = createSlice({
  name: "getUserProfile",
  initialState,
  reducers: {
    resetUserProfileState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<UserProfileResponse>) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.data;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load user profile";
        state.user = null;
      });
  },
});

export const { resetUserProfileState } = getUserProfileSlice.actions;
export default getUserProfileSlice.reducer;
