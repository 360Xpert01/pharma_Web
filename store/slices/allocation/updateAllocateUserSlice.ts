import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface AllocationItem {
  id: string;
  quantity: number;
}

export interface UpdateAllocateUserPayload {
  giveaway: AllocationItem[];
  sample: AllocationItem[];
}

interface UpdateAllocateUserResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface UpdateAllocateUserState {
  loading: boolean;
  success: boolean;
  error: string | null;
  response: UpdateAllocateUserResponse | null;
}

const initialState: UpdateAllocateUserState = {
  loading: false,
  success: false,
  error: null,
  response: null,
};

// Async Thunk: Update User Allocation (PUT /api/v1/users/allocate/:userId)
export const updateAllocateUser = createAsyncThunk<
  UpdateAllocateUserResponse,
  { userId: string; payload: UpdateAllocateUserPayload },
  { rejectValue: string }
>("allocation/updateAllocateUser", async ({ userId, payload }, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.put<UpdateAllocateUserResponse>(
      `${baseUrl}api/v1/users/allocate/${userId}`,
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
      "Failed to update allocation. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

const updateAllocateUserSlice = createSlice({
  name: "updateAllocateUser",
  initialState,
  reducers: {
    resetUpdateAllocateUserState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAllocateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        updateAllocateUser.fulfilled,
        (state, action: PayloadAction<UpdateAllocateUserResponse>) => {
          state.loading = false;
          state.success = true;
          state.response = action.payload;
          state.error = null;
        }
      )
      .addCase(updateAllocateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update allocation";
        state.response = null;
      });
  },
});

export const { resetUpdateAllocateUserState } = updateAllocateUserSlice.actions;
export default updateAllocateUserSlice.reducer;
