import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createRole } from "./addRole";
import { updateRole } from "./updateRoleSlice";
import { deleteRole } from "./deleteRoleSlice";

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
}

interface RoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  roles: RoleItem[];
}

// Initial State
const initialState: RoleState = {
  loading: false,
  success: false,
  error: null,
  roles: [],
};

// Async Thunk: Get All Roles (GET /api/v1/role)
export const getAllRoles = createAsyncThunk<GetRolesResponse, void, { rejectValue: string }>(
  "role/getAllRoles",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<GetRolesResponse>(`${baseUrl}api/v1/role`, {
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
  }
);

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
        state.roles = action.payload.roles;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load roles";
        state.roles = [];
      })
      // Handle Local Updates
      .addCase(createRole.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.data) {
          state.roles.push(action.payload.data as any);
        }
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { id, payload } = action.meta.arg;
          const roleIndex = state.roles.findIndex((role) => role.id === id);
          if (roleIndex !== -1) {
            state.roles[roleIndex] = { ...state.roles[roleIndex], ...payload };
          }
        }
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        if (action.payload.success) {
          const id = action.meta.arg;
          state.roles = state.roles.filter((role) => role.id !== id);
        }
      });
  },
});

// Export actions
export const { resetRolesState } = getAllRolesSlice.actions;

// Export reducer
export default getAllRolesSlice.reducer;
