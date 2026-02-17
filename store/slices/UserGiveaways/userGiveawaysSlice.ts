// src/features/userGiveaways/userGiveawaysSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

export interface GiveawayItem {
  id: string; // Allocation Record ID
  giveawayId: string; // The Actual Giveaway ID (Must use this for allocation/update)
  name: string;
  description: string;
  imageUrl: string;
  productSku: string;
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

export interface GiveawayAllocation {
  giveaways: GiveawayItem[];
  pagination: Pagination;
}

interface UserGiveawaysState {
  allocationData: GiveawayAllocation | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserGiveawaysState = {
  allocationData: null,
  loading: false,
  error: null,
  success: false,
};

export const fetchUserGiveawaysAllocation = createAsyncThunk<
  GiveawayAllocation,
  string,
  { rejectValue: string }
>("userGiveaways/fetchAllocation", async (userId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    const response = await axios.get(`${baseUrl}api/v1/users/giveawaysAllocate/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.data || response.data;
  } catch (err: any) {
    const message = err.response?.data?.message || `User ${userId} ke giveaways load nahi hue`;
    return rejectWithValue(message);
  }
});

const userGiveawaysSlice = createSlice({
  name: "userGiveaways",
  initialState,
  reducers: {
    resetUserGiveawaysState: (state) => {
      state.allocationData = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserGiveawaysAllocation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        fetchUserGiveawaysAllocation.fulfilled,
        (state, action: PayloadAction<GiveawayAllocation>) => {
          state.loading = false;
          state.allocationData = action.payload;
          state.success = true;
          state.error = null;
        }
      )
      .addCase(fetchUserGiveawaysAllocation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Giveaways load nahi hue";
        state.allocationData = null;
      });
  },
});

export const { resetUserGiveawaysState } = userGiveawaysSlice.actions;
export default userGiveawaysSlice.reducer;

export const selectUserGiveawaysAllocation = (state: { userGiveaways: UserGiveawaysState }) =>
  state.userGiveaways.allocationData;
export const selectUserGiveawaysLoading = (state: { userGiveaways: UserGiveawaysState }) =>
  state.userGiveaways.loading;
export const selectUserGiveawaysError = (state: { userGiveaways: UserGiveawaysState }) =>
  state.userGiveaways.error;
export const selectUserGiveawaysSuccess = (state: { userGiveaways: UserGiveawaysState }) =>
  state.userGiveaways.success;
