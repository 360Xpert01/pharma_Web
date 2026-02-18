import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Type Definitions
export interface AllocationInput {
  territoryId: string;
  percentage: number;
}

export interface BrickAllocationInput {
  brickId: string;
  allocations: AllocationInput[];
}

export interface TargetAllocationPayload {
  teamId: string;
  month?: number;
  year?: number;
  bricks: BrickAllocationInput[];
}

interface TargetAllocationResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface TargetAllocationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

// Initial State
const initialState: TargetAllocationState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

// Async Thunk: Target Allocation (POST /api/v1/targets/allocations)
export const targetAllocation = createAsyncThunk<
  TargetAllocationResponse,
  TargetAllocationPayload,
  { rejectValue: string }
>("target/targetAllocation", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<TargetAllocationResponse>(
      `${baseUrl}api/v1/targets/allocations`,
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
      "Failed to resolve target allocation. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const targetAllocationSlice = createSlice({
  name: "targetAllocation",
  initialState,
  reducers: {
    resetTargetAllocationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(targetAllocation.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(
        targetAllocation.fulfilled,
        (state, action: PayloadAction<TargetAllocationResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message || "Target allocation resolved successfully!";
        }
      )
      .addCase(targetAllocation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetTargetAllocationState } = targetAllocationSlice.actions;

// Export reducer
export default targetAllocationSlice.reducer;
