import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface AllocationItem {
  userId: string;
  pulseCode: string;
  employeeName: string;
  email: string;
  totalGiveaways: number;
  totalSamples: number;
  profilePicture?: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface GetAllocationResponse {
  success: boolean;
  message?: string;
  data: AllocationItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface AllocationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  allocations: AllocationItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

// Initial State
const initialState: AllocationState = {
  loading: false,
  success: false,
  error: null,
  allocations: [],
  pagination: null,
};

// Pagination Parameters Type
interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  employeeId?: string;
}

// Async Thunk: Get All Allocations (GET /api/v1/users/allocate)
export const getAllocationList = createAsyncThunk<
  GetAllocationResponse,
  PaginationParams | void,
  { rejectValue: string }
>("allocation/getAllocationList", async (params, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const page = params && typeof params === "object" ? params.page || 1 : 1;
    const limit = params && typeof params === "object" ? params.limit || 10 : 10;
    const search = params && typeof params === "object" ? params.search || "" : "";
    const employeeId = params && typeof params === "object" ? params.employeeId || "" : "";

    // Build query params object, only include employeeId if it has a value
    const queryParams: any = { page, limit, search };
    if (employeeId) queryParams.employeeId = employeeId;

    const response = await axios.get<GetAllocationResponse>(`${baseUrl}api/v1/users/allocate`, {
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
      "Failed to fetch allocation list. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllocationListSlice = createSlice({
  name: "allocationList",
  initialState,
  reducers: {
    resetAllocationListState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.allocations = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllocationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllocationList.fulfilled,
        (state, action: PayloadAction<GetAllocationResponse>) => {
          state.loading = false;
          state.success = true;
          state.allocations = action.payload.data;
          state.pagination = action.payload.pagination || null;
        }
      )
      .addCase(getAllocationList.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load allocations";
        state.allocations = [];
      });
  },
});

// Export actions
export const { resetAllocationListState } = getAllocationListSlice.actions;

// Export reducer
export default getAllocationListSlice.reducer;
