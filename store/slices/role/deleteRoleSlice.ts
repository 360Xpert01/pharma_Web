import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface DeleteRoleResponse {
  success: boolean;
  message?: string;
}

interface DeleteRoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: DeleteRoleState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

export const deleteRole = createAsyncThunk<DeleteRoleResponse, string, { rejectValue: string }>(
  "role/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.delete<DeleteRoleResponse>(`${baseUrl}api/v1/role/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete role"
      );
    }
  }
);

const deleteRoleSlice = createSlice({
  name: "deleteRole",
  initialState,
  reducers: {
    resetDeleteRoleState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Role deleted successfully";
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { resetDeleteRoleState } = deleteRoleSlice.actions;
export default deleteRoleSlice.reducer;
