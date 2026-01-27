import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface GiveawayDetail {
  id: string;
  pulseCode: string;
  name: string;
  category: string;
  productName?: string;
  imageUrl: string | null;
  description?: string;
  units: number;
  legacyCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GetGiveawayByIdState {
  loading: boolean;
  success: boolean;
  error: string | null;
  giveaway: GiveawayDetail | null;
}

const initialState: GetGiveawayByIdState = {
  loading: false,
  success: false,
  error: null,
  giveaway: null,
};

export const getGiveawayById = createAsyncThunk<GiveawayDetail, string, { rejectValue: string }>(
  "giveaway/getGiveawayById",
  async (giveawayId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userSession");
      if (!token) {
        return rejectWithValue("No session found. Please login again.");
      }
      const response = await axios.get<{ success: boolean; data: GiveawayDetail; message: string }>(
        `${baseUrl || "https://api.ceturo.com/"}api/v1/giveaway/${giveawayId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch giveaway");
    }
  }
);

const getGiveawayByIdSlice = createSlice({
  name: "getGiveawayById",
  initialState,
  reducers: {
    resetGetGiveawayByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.giveaway = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGiveawayById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getGiveawayById.fulfilled, (state, action: PayloadAction<GiveawayDetail>) => {
        state.loading = false;
        state.success = true;
        state.giveaway = action.payload;
      })
      .addCase(getGiveawayById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch giveaway";
      });
  },
});

export const { resetGetGiveawayByIdState } = getGiveawayByIdSlice.actions;
export default getGiveawayByIdSlice.reducer;
