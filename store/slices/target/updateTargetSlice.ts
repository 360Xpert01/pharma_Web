import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UpdateTargetPayload, UpdateTargetResponse } from "../../../types/target";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface UpdateTargetState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

// Initial State
const initialState: UpdateTargetState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

// Async Thunk: Update Target (PUT /api/v1/targets/{targetId})
export const updateTarget = createAsyncThunk<
  UpdateTargetResponse,
  { targetId: string; payload: UpdateTargetPayload },
  { rejectValue: string }
>("target/updateTarget", async ({ targetId, payload }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.put<UpdateTargetResponse>(
      `${baseUrl}api/v1/targets/${targetId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to update target. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const updateTargetSlice = createSlice({
  name: "updateTarget",
  initialState,
  reducers: {
    resetUpdateTargetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTarget.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(updateTarget.fulfilled, (state, action: PayloadAction<UpdateTargetResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Target updated successfully!";
      })
      .addCase(updateTarget.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetUpdateTargetState } = updateTargetSlice.actions;
export default updateTargetSlice.reducer;
