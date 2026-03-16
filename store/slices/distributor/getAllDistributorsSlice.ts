import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ── Types from API ───────────────────────────────────────────────────────────
export interface DistributorItem {
  id: string;
  pulseCode: string;
  legacyCode: string;
  zoneId: string;
  regionId: string;
  distributorName: string;
  distributorStatus: string;
  distributorTypeId: string;
  distributorTypeName?: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface GetDistributorsResponse {
  success: boolean;
  data: DistributorItem[];
  pagination: PaginationData;
}

interface DistributorsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  distributors: DistributorItem[];
  pagination: PaginationData | null;
}

// ── Query Params ─────────────────────────────────────────────────────────────
export interface GetDistributorsParams {
  page?: number;
  limit?: number;
  search?: string;
  distributorStatus?: string;
  distributorTypeId?: string;
  zoneId?: string;
  regionId?: string;
  sort?: string;
  order?: string;
}

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState: DistributorsState = {
  loading: false,
  success: false,
  error: null,
  distributors: [],
  pagination: null,
};

// ── Async Thunk: GET /api/v1/distributor/all ──────────────────────────────────
export const getAllDistributors = createAsyncThunk<
  GetDistributorsResponse,
  GetDistributorsParams | void,
  { rejectValue: string }
>("distributors/getAll", async (params, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const queryParams: Record<string, any> = {
      page: params?.page || 1,
      limit: params?.limit || 20,
    };

    if (params?.search) queryParams.search = params.search;
    if (params?.distributorStatus) queryParams.distributorStatus = params.distributorStatus;
    if (params?.distributorTypeId) queryParams.distributorTypeId = params.distributorTypeId;
    if (params?.zoneId) queryParams.zoneId = params.zoneId;
    if (params?.regionId) queryParams.regionId = params.regionId;
    if (params?.sort) queryParams.sort = params.sort;
    if (params?.order) queryParams.order = params.order;

    const response = await axios.get<GetDistributorsResponse>(`${baseUrl}api/v1/distributor/all`, {
      params: queryParams,
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
      "Failed to fetch distributors. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// ── Slice ─────────────────────────────────────────────────────────────────────
const getAllDistributorsSlice = createSlice({
  name: "allDistributors",
  initialState,
  reducers: {
    resetDistributorsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.distributors = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDistributors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllDistributors.fulfilled,
        (state, action: PayloadAction<GetDistributorsResponse>) => {
          state.loading = false;
          state.success = true;
          state.distributors = action.payload.data || [];
          state.pagination = action.payload.pagination || null;
        }
      )
      .addCase(getAllDistributors.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load distributors";
        state.distributors = [];
      });
  },
});

export const { resetDistributorsState } = getAllDistributorsSlice.actions;
export default getAllDistributorsSlice.reducer;
