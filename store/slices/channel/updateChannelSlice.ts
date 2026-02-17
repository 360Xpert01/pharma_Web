import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface UpdateChannelPayload {
  legacyCode?: string;
  name: string;
  isActive: boolean;
  code: string;
}

interface UpdateChannelResponse {
  success: boolean;
  data: {
    legacyCode: string;
    name: string;
    isActive: boolean;
    code: string;
  };
  message: string;
}

interface UpdateChannelState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  updatedChannel: any | null;
}

export const updateChannel = createAsyncThunk<
  UpdateChannelResponse,
  { id: string; data: UpdateChannelPayload },
  { rejectValue: string }
>("channel/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.put<UpdateChannelResponse>(
      `${baseUrl}api/v1/channel/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || error.message || "Failed to update channel"
    );
  }
});

const initialState: UpdateChannelState = {
  loading: false,
  error: null,
  success: false,
  message: null,
  updatedChannel: null,
};

const updateChannelSlice = createSlice({
  name: "updateChannel",
  initialState,
  reducers: {
    resetUpdateChannelState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
      state.updatedChannel = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(updateChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.updatedChannel = action.payload.data;
      })
      .addCase(updateChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.message = null;
      });
  },
});

export const { resetUpdateChannelState } = updateChannelSlice.actions;
export default updateChannelSlice.reducer;
