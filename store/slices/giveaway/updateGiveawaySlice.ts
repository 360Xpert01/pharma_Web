import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export interface UpdateGiveawayPayload {
  id: string;
  pulseCode: string;
  name: string;
  category: string;
  productName?: string;
  imageUrl?: string | null;
  description?: string;
  units: number;
  legacyCode?: string;
}

export interface UpdatedGiveaway {
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

interface UpdateGiveawayState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  updatedGiveaway: UpdatedGiveaway | null;
}

const initialState: UpdateGiveawayState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  updatedGiveaway: null,
};

export const updateGiveaway = createAsyncThunk<
  UpdatedGiveaway,
  UpdateGiveawayPayload,
  { rejectValue: string }
>("giveaway/updateGiveaway", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }
    const response = await axios.put<{ success: boolean; data: UpdatedGiveaway; message: string }>(
      `${baseUrl || "https://api.ceturo.com/"}api/v1/giveaway/${payload.id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error?.response?.data?.message || "Failed to update giveaway");
  }
});

const updateGiveawaySlice = createSlice({
  name: "updateGiveaway",
  initialState,
  reducers: {
    resetUpdateGiveawayState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.updatedGiveaway = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateGiveaway.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(updateGiveaway.fulfilled, (state, action: PayloadAction<UpdatedGiveaway>) => {
        state.loading = false;
        state.success = true;
        state.updatedGiveaway = action.payload;
        state.message = "Giveaway updated successfully!";
      })
      .addCase(updateGiveaway.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update giveaway";
      });
  },
});

export const { resetUpdateGiveawayState } = updateGiveawaySlice.actions;
export default updateGiveawaySlice.reducer;
