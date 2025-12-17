import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL (आप .env में रख सकते हो)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CreateRolePayload {
  roleName: string;
}

interface CreateRoleResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    roleName: string;
    createdAt: string;
    // आपके API response के अनुसार add करो
  };
}

interface RoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdRole: any | null; // success के बाद role data save करने के लिए
}

// Initial State
const initialState: RoleState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdRole: null,
};

const token = localStorage.getItem("userSession");

// Async Thunk: Create Role (POST request)
export const createRole = createAsyncThunk<
  CreateRoleResponse,
  CreateRolePayload,
  { rejectValue: string }
>("role/createRole", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post<CreateRoleResponse>(`${baseUrl}api/v1/role`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create role. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    resetRoleState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      // Fulfilled
      .addCase(createRole.fulfilled, (state, action: PayloadAction<CreateRoleResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Role created successfully!";
        state.createdRole = action.payload.data || null;
      })
      // Rejected
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetRoleState } = roleSlice.actions;

// Export reducer
export default roleSlice.reducer;
