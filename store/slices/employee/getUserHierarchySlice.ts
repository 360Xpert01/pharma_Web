import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types matching API response structure
interface HierarchyUser {
  userId: string;
  email: string;
  fullName: string;
  roleId: string;
  roleName: string;
  supervisorId: string | null;
  hierarchyLevel: number;
  parentSalesRepId: string | null;
  isSalesRep: boolean;
  children: HierarchyUser[];
}

interface GetUserHierarchyResponse {
  success: boolean;
  message?: string;
  data: HierarchyUser;
}

interface UserHierarchyState {
  loading: boolean;
  success: boolean;
  error: string | null;
  hierarchy: HierarchyUser | null;
}

// Initial State
const initialState: UserHierarchyState = {
  loading: false,
  success: false,
  error: null,
  hierarchy: null,
};

// Async Thunk: Get User Hierarchy (GET /api/v1/users/hierarchy/sales-reps/{id})
export const getUserHierarchy = createAsyncThunk<
  GetUserHierarchyResponse,
  string,
  { rejectValue: string }
>("users/getUserHierarchy", async (userId, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetUserHierarchyResponse>(
      `${baseUrl}api/v1/users/hierarchy/sales-reps/${userId}`,
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
      "Failed to fetch user hierarchy. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getUserHierarchySlice = createSlice({
  name: "userHierarchy",
  initialState,
  reducers: {
    resetUserHierarchyState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.hierarchy = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserHierarchy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserHierarchy.fulfilled,
        (state, action: PayloadAction<GetUserHierarchyResponse>) => {
          state.loading = false;
          state.success = true;
          state.hierarchy = action.payload.data;
        }
      )
      .addCase(getUserHierarchy.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load user hierarchy";
        state.hierarchy = null;
      });
  },
});

// Export actions
export const { resetUserHierarchyState } = getUserHierarchySlice.actions;

// Export reducer
export default getUserHierarchySlice.reducer;
