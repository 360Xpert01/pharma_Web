import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CreateGiveawayPayload {
  name: string;
  category?: string | null;
  productName?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  units: number;
  pulseCode: string;
  legacyCode?: string;
}

interface CreateGiveawayResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    category: string | null;
    productName: string | null;
    imageUrl: string | null;
    description: string | null;
    units: number;
    pulseCode: string;
    legacyCode: string;
    createdAt: string;
  };
}

interface GiveawayState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdGiveaway: any | null;
}

// Initial State
const initialState: GiveawayState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdGiveaway: null,
};

// Async Thunk: Create Giveaway (POST request)
export const createGiveaway = createAsyncThunk<
  CreateGiveawayResponse,
  CreateGiveawayPayload,
  { rejectValue: string }
>("giveaway/createGiveaway", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    // Transform payload to handle null values
    // Note: imageUrl should be omitted if not provided, as API expects valid URI format
    const transformedPayload: any = {
      ...payload,
      category: payload.category,
      productName: payload.productName,
      description: payload.description,
    };

    // Only include imageUrl if it's a valid URL (not base64, not null, not empty)
    // For now, we omit it entirely since we're not uploading images to a server
    // If you have image upload functionality, replace this with the actual uploaded URL
    if (payload.imageUrl && payload.imageUrl.startsWith("http")) {
      transformedPayload.imageUrl = payload.imageUrl;
    }
    // Otherwise, omit the field entirely

    const response = await axios.post<CreateGiveawayResponse>(
      `${baseUrl}api/v1/giveaway`,
      transformedPayload,
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
      "Failed to create giveaway. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createGiveawaySlice = createSlice({
  name: "createGiveaway",
  initialState,
  reducers: {
    resetGiveawayState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdGiveaway = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGiveaway.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(createGiveaway.fulfilled, (state, action: PayloadAction<CreateGiveawayResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Giveaway created successfully!";
        state.createdGiveaway = action.payload.data || null;
      })
      .addCase(createGiveaway.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetGiveawayState } = createGiveawaySlice.actions;

// Export reducer
export default createGiveawaySlice.reducer;
