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

interface GetAllocationResponse {
  success: boolean;
  message?: string;
  data: AllocationItem[];
}

interface AllocationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  allocations: AllocationItem[];
}

// Initial State
const initialState: AllocationState = {
  loading: false,
  success: false,
  error: null,
  allocations: [],
};

// Async Thunk: Get All Allocations (GET /api/v1/users/allocate)
export const getAllocationList = createAsyncThunk<
  GetAllocationResponse,
  void,
  { rejectValue: string }
>("allocation/getAllocationList", async (_, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetAllocationResponse>(`${baseUrl}api/v1/users/allocate`, {
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
