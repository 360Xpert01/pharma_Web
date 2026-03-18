import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ── Types ─────────────────────────────────────────────────────────────────────
export interface CreateDistributorPayload {
  pulseCode?: string;
  legacyCode?: string;
  zoneId: string;
  regionId?: string;
  distributorName: string;
  distributorStatus: "active" | "inactive";
  distributorTypeId: string;
  imageUrl?: string;
}

interface DistributorData {
  id: string;
  pulseCode: string;
  legacyCode: string;
  zoneId: string;
  regionId: string;
  distributorName: string;
  distributorStatus: string;
  distributorTypeId: string;
  imageUrl?: string;
}

interface CreateDistributorResponse {
  success: boolean;
  data: DistributorData;
}

interface CreateDistributorState {
  loading: boolean;
  success: boolean;
  error: string | null;
  createdDistributor: DistributorData | null;
}

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState: CreateDistributorState = {
  loading: false,
  success: false,
  error: null,
  createdDistributor: null,
};

// ── Async Thunk: POST /api/v1/distributor/create ──────────────────────────────
export const createDistributor = createAsyncThunk<
  CreateDistributorResponse,
  CreateDistributorPayload,
  { rejectValue: string }
>("distributors/create", async (payload, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreateDistributorResponse>(
      `${baseUrl}api/v1/distributor/create`,
      payload,
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
      "Failed to create distributor. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// ── Slice ─────────────────────────────────────────────────────────────────────
const createDistributorSlice = createSlice({
  name: "createDistributor",
  initialState,
  reducers: {
    resetCreateDistributorState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.createdDistributor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDistributor.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        createDistributor.fulfilled,
        (state, action: PayloadAction<CreateDistributorResponse>) => {
          state.loading = false;
          state.success = true;
          state.createdDistributor = action.payload.data;
        }
      )
      .addCase(createDistributor.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetCreateDistributorState } = createDistributorSlice.actions;
export default createDistributorSlice.reducer;
