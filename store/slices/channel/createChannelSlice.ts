import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CreateChannelPayload {
  pulseCode: string;
  legacyCode: string;
  name: string;
  isActive: boolean;
}

interface CreateChannelResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    pulseCode: string;
    legacyCode: string;
    isActive: boolean;
    createdAt: string;
  };
}

interface ChannelState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdChannel: any | null;
}

// Initial State
const initialState: ChannelState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdChannel: null,
};

// Async Thunk: Create Channel (POST request)
export const createChannel = createAsyncThunk<
  CreateChannelResponse,
  CreateChannelPayload,
  { rejectValue: string }
>("channel/createChannel", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreateChannelResponse>(
      `${baseUrl}api/v1/channel/create`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create channel. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createChannelSlice = createSlice({
  name: "createChannel",
  initialState,
  reducers: {
    resetChannelState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdChannel = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChannel.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(createChannel.fulfilled, (state, action: PayloadAction<CreateChannelResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Channel created successfully!";
        state.createdChannel = action.payload.data || null;
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetChannelState } = createChannelSlice.actions;

// Export reducer
export default createChannelSlice.reducer;
