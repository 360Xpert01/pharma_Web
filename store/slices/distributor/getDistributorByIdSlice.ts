import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ── Types ─────────────────────────────────────────────────────────────────────
export interface DistributorDetail {
  id: string;
  pulseCode: string;
  legacyCode: string;
  zoneId: string;
  regionId: string;
  distributorName: string;
  distributorStatus: string;
  distributorTypeId: string;
}

interface GetDistributorByIdResponse {
  success: boolean;
  data: DistributorDetail;
}

interface GetDistributorByIdState {
  loading: boolean;
  success: boolean;
  error: string | null;
  distributor: DistributorDetail | null;
}

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState: GetDistributorByIdState = {
  loading: false,
  success: false,
  error: null,
  distributor: null,
};

// ── Async Thunk: GET /api/v1/distributor/{id} ─────────────────────────────────
export const getDistributorById = createAsyncThunk<
  GetDistributorByIdResponse,
  string,
  { rejectValue: string }
>("distributors/getById", async (id, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetDistributorByIdResponse>(
      `${baseUrl}api/v1/distributor/${id}`,
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
      "Failed to fetch distributor. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// ── Slice ─────────────────────────────────────────────────────────────────────
const getDistributorByIdSlice = createSlice({
  name: "distributorById",
  initialState,
  reducers: {
    resetDistributorByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.distributor = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDistributorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDistributorById.fulfilled,
        (state, action: PayloadAction<GetDistributorByIdResponse>) => {
          state.loading = false;
          state.success = true;
          state.distributor = action.payload.data;
        }
      )
      .addCase(getDistributorById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load distributor";
        state.distributor = null;
      });
  },
});

export const { resetDistributorByIdState } = getDistributorByIdSlice.actions;
export default getDistributorByIdSlice.reducer;
