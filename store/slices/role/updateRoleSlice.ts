import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface UpdateRolePayload {
  roleName?: string;
  pulseCode?: string;
  parentRoleId?: string;
  responsibilities?: string;
}

interface UpdateRoleResponse {
  success: boolean;
  message?: string;
}

interface UpdateRoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UpdateRoleState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

export const updateRole = createAsyncThunk<
  UpdateRoleResponse,
  { id: string; payload: UpdateRolePayload },
  { rejectValue: string }
>("role/updateRole", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.patch<UpdateRoleResponse>(`${baseUrl}api/v1/role/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to update role"
    );
  }
});

const updateRoleSlice = createSlice({
  name: "updateRole",
  initialState,
  reducers: {
    resetUpdateRoleState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Role updated successfully";
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { resetUpdateRoleState } = updateRoleSlice.actions;
export default updateRoleSlice.reducer;
