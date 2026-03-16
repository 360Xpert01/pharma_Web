import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ── Types ─────────────────────────────────────────────────────────────────────
export interface UpdateDistributorPayload {
  id: string; // used in URL, stripped from body
  legacyCode?: string;
  zoneId: string;
  regionId?: string;
  distributorName: string;
  distributorStatus: "active" | "inactive";
  distributorTypeId: string;
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
}

interface UpdateDistributorResponse {
  success: boolean;
  data: DistributorData;
}

interface UpdateDistributorState {
  loading: boolean;
  success: boolean;
  error: string | null;
  updatedDistributor: DistributorData | null;
}

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState: UpdateDistributorState = {
  loading: false,
  success: false,
  error: null,
  updatedDistributor: null,
};

// ── Async Thunk: PUT /api/v1/distributor/{id} ─────────────────────────────────
export const updateDistributor = createAsyncThunk<
  UpdateDistributorResponse,
  UpdateDistributorPayload,
  { rejectValue: string }
>("distributors/update", async (payload, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const { id, ...body } = payload;

    const response = await axios.put<UpdateDistributorResponse>(
      `${baseUrl}api/v1/distributor/${id}`,
      body,
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
      "Failed to update distributor. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// ── Slice ─────────────────────────────────────────────────────────────────────
const updateDistributorSlice = createSlice({
  name: "updateDistributor",
  initialState,
  reducers: {
    resetUpdateDistributorState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.updatedDistributor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDistributor.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(
        updateDistributor.fulfilled,
        (state, action: PayloadAction<UpdateDistributorResponse>) => {
          state.loading = false;
          state.success = true;
          state.updatedDistributor = action.payload.data;
        }
      )
      .addCase(updateDistributor.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetUpdateDistributorState } = updateDistributorSlice.actions;
export default updateDistributorSlice.reducer;
