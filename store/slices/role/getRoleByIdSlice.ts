import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface RoleDetail {
  id: string;
  roleName: string;
  pulseCode: string;
  legacyCode?: string;
  parentRoleId?: string;
  responsibilities?: string;
  status?: string;
  [key: string]: any;
}

interface GetRoleResponse {
  success: boolean;
  role: RoleDetail;
}

interface RoleDetailState {
  loading: boolean;
  role: RoleDetail | null;
  error: string | null;
}

const initialState: RoleDetailState = {
  loading: false,
  role: null,
  error: null,
};

export const getRoleById = createAsyncThunk<GetRoleResponse, string, { rejectValue: string }>(
  "role/getRoleById",
  async (id, { rejectWithValue }) => {
    try {
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<GetRoleResponse>(`${baseUrl}api/v1/role/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStr}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch role details"
      );
    }
  }
);

const getRoleByIdSlice = createSlice({
  name: "roleById",
  initialState,
  reducers: {
    resetRoleDetailState: (state) => {
      state.loading = false;
      state.role = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload.role;
      })
      .addCase(getRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { resetRoleDetailState } = getRoleByIdSlice.actions;
export default getRoleByIdSlice.reducer;
