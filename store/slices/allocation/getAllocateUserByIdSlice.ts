import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface SalesmanInfo {
  pulseCode: string;
  employeeName: string;
  profilePicture: string;
  supervisorId: string | null;
  supervisorName: string | null;
  role: string;
}

export interface AllocatedSample {
  id: string; // Allocation Record ID
  productSkuId: string; // The Actual Product SKU ID
  quantity: number;
  quantityLeft: number;
  name?: string; // Optional for UI display
  productSku?: string; // Optional for UI display
}

export interface AllocatedGiveaway {
  id: string; // Allocation Record ID
  giveawayId: string; // The Actual Giveaway ID
  quantity: number;
  quantityLeft: number;
  name?: string; // Optional for UI display
}

export interface UserAllocationDetails {
  salesman: SalesmanInfo;
  sample: AllocatedSample[];
  giveaways: AllocatedGiveaway[];
}

interface GetAllocateUserByIdState {
  loading: boolean;
  success: boolean;
  error: string | null;
  allocation: UserAllocationDetails | null;
}

const initialState: GetAllocateUserByIdState = {
  loading: false,
  success: false,
  error: null,
  allocation: null,
};

// Async Thunk: Get User Allocation (GET /api/v1/users/allocate/:userId)
export const getAllocateUserById = createAsyncThunk<
  UserAllocationDetails,
  string,
  { rejectValue: string }
>("allocation/getAllocateUserById", async (userId, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<{ success: boolean; data: UserAllocationDetails }>(
      `${baseUrl}api/v1/users/allocate/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStr}`,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch allocation data.";

    return rejectWithValue(errorMessage);
  }
});

const getAllocateUserByIdSlice = createSlice({
  name: "getAllocateUserById",
  initialState,
  reducers: {
    resetGetAllocateUserByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.allocation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllocateUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        getAllocateUserById.fulfilled,
        (state, action: PayloadAction<UserAllocationDetails>) => {
          state.loading = false;
          state.success = true;
          state.allocation = action.payload;
          state.error = null;
        }
      )
      .addCase(getAllocateUserById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch allocation data";
        state.allocation = null;
      });
  },
});

export const { resetGetAllocateUserByIdState } = getAllocateUserByIdSlice.actions;
export default getAllocateUserByIdSlice.reducer;
