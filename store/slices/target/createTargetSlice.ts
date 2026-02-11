import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Type Definitions
interface SkuAllocation {
  productSkuId: string;
  targetValue: number;
  percentage: number;
}

interface BrickAllocation {
  brickId: string;
  skuAllocations: SkuAllocation[];
}

interface UserAllocation {
  userId: string;
  brickAllocations: BrickAllocation[];
}

export interface CreateTargetPayload {
  teamId: string;
  month: number;
  year: number;
  allocations: UserAllocation[];
}

interface CreateTargetResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface CreateTargetState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

// Initial State
const initialState: CreateTargetState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

// Async Thunk: Create Target (POST /api/v1/targets/)
export const createTarget = createAsyncThunk<
  CreateTargetResponse,
  CreateTargetPayload,
  { rejectValue: string }
>("target/createTarget", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreateTargetResponse>(`${baseUrl}api/v1/targets/`, payload, {
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
      "Failed to create target allocation. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createTargetSlice = createSlice({
  name: "createTarget",
  initialState,
  reducers: {
    resetCreateTargetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTarget.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(createTarget.fulfilled, (state, action: PayloadAction<CreateTargetResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Target allocation created successfully!";
      })
      .addCase(createTarget.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetCreateTargetState } = createTargetSlice.actions;

// Export reducer
export default createTargetSlice.reducer;
