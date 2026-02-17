import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// Types from API
interface DistributorTypeFromAPI {
  id: string;
  name: string;
  legacyCode: string;
  pulseCode: string;
  isActive: boolean;
  code: string;
}

// Internal type with normalized status
interface DistributorTypeItem {
  id: string;
  name: string;
  legacyCode: string;
  pulseCode: string;
  code: string;
  status: "active" | "inactive";
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface GetDistributorTypesResponse {
  success: boolean;
  data: DistributorTypeFromAPI[];
  pagination: PaginationData;
}

interface DistributorTypesState {
  loading: boolean;
  success: boolean;
  error: string | null;
  distributorTypes: DistributorTypeItem[];
  pagination: PaginationData | null;
}

// Initial State
const initialState: DistributorTypesState = {
  loading: false,
  success: false,
  error: null,
  distributorTypes: [],
  pagination: null,
};

// Async Thunk: Get All DistributorTypes (GET /api/v1/distributor-type)
export const getAllDistributorTypes = createAsyncThunk<
  GetDistributorTypesResponse,
  void,
  { rejectValue: string }
>("distributorTypes/getAllDistributorTypes", async (_, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetDistributorTypesResponse>(
      `${baseUrl}api/v1/distributorType/all`,
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
      "Failed to fetch distributor types. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllDistributorTypesSlice = createSlice({
  name: "allDistributorTypes",
  initialState,
  reducers: {
    resetDistributorTypesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.distributorTypes = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDistributorTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllDistributorTypes.fulfilled,
        (state, action: PayloadAction<GetDistributorTypesResponse>) => {
          state.loading = false;
          state.success = true;
          // Transform API data to internal format
          state.distributorTypes = (action.payload.data || []).map((item) => ({
            id: item.id,
            name: item.name,
            legacyCode: item.legacyCode,
            pulseCode: item.pulseCode,
            code: item.code,
            status: item.isActive ? "active" : "inactive",
          }));
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(getAllDistributorTypes.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load distributor types";
        state.distributorTypes = [];
      });
  },
});

// Export actions
export const { resetDistributorTypesState } = getAllDistributorTypesSlice.actions;

// Export reducer
export default getAllDistributorTypesSlice.reducer;
