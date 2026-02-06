// src/features/userSamples/userSamplesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

export interface SampleItem {
  id: string;
  productSkuId: string;
  productSku: string;
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
  quantityLeft: number;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SampleAllocation {
  samples: SampleItem[];
  pagination: Pagination;
}

interface UserSamplesState {
  allocationData: SampleAllocation | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserSamplesState = {
  allocationData: null,
  loading: false,
  error: null,
  success: false,
};

export const fetchUserSamplesAllocation = createAsyncThunk<
  SampleAllocation,
  string,
  { rejectValue: string }
>("userSamples/fetchAllocation", async (userId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    //   const token = sessionStr ? JSON.parse(sessionStr).token : null;

    const response = await axios.get(`${baseUrl}api/v1/users/samplesAllocate/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.data || response.data;
  } catch (err: any) {
    const message = err.response?.data?.message || `User ${userId} ke samples load nahi hue`;
    return rejectWithValue(message);
  }
});

const userSamplesSlice = createSlice({
  name: "userSamples",
  initialState,
  reducers: {
    resetUserSamplesState: (state) => {
      state.allocationData = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSamplesAllocation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        fetchUserSamplesAllocation.fulfilled,
        (state, action: PayloadAction<SampleAllocation>) => {
          state.loading = false;
          state.allocationData = action.payload;
          state.success = true;
          state.error = null;
        }
      )
      .addCase(fetchUserSamplesAllocation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Samples load nahi hue";
        state.allocationData = null;
      });
  },
});

export const { resetUserSamplesState } = userSamplesSlice.actions;
export default userSamplesSlice.reducer;

export const selectUserSamplesAllocation = (state: { userSamples: UserSamplesState }) =>
  state.userSamples.allocationData;
export const selectUserSamplesLoading = (state: { userSamples: UserSamplesState }) =>
  state.userSamples.loading;
export const selectUserSamplesError = (state: { userSamples: UserSamplesState }) =>
  state.userSamples.error;
export const selectUserSamplesSuccess = (state: { userSamples: UserSamplesState }) =>
  state.userSamples.success;
