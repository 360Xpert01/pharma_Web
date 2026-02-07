import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface GiveawayItem {
  id: string;
  name: string;
  category: string | null;
  productName: string | null;
  imageUrl: string | null;
  description: string | null;
  units: number;
  pulseCode: string;
  legacyCode: string;
  createdAt?: string;
  updatedAt?: string;
}

// Transformed item with N/A fallbacks for display
export interface GiveawayItemDisplay {
  id: string;
  name: string;
  category: string;
  productName: string;
  imageUrl: string;
  description: string;
  units: number;
  pulseCode: string;
  legacyCode: string;
  createdAt?: string;
  updatedAt?: string;
}

interface GetGiveawaysResponse {
  success: boolean;
  message?: string;
  data: GiveawayItem[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  // Legacy support for flat structure
  total?: number;
  page?: number;
  limit?: number;
}

interface GiveawaysState {
  loading: boolean;
  success: boolean;
  error: string | null;
  giveaways: GiveawayItemDisplay[];
  total: number;
  page: number;
  limit: number;
}

// Initial State
const initialState: GiveawaysState = {
  loading: false,
  success: false,
  error: null,
  giveaways: [],
  total: 0,
  page: 1,
  limit: 10,
};

// Helper function to transform null values to "N/A"
const transformGiveaway = (item: GiveawayItem): GiveawayItemDisplay => ({
  ...item,
  category: item.category || "N/A",
  productName: item.productName || "N/A",
  imageUrl: item.imageUrl || "N/A",
  description: item.description || "N/A",
});

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

// Async Thunk: Get All Giveaways (GET /api/v1/giveaway)
export const getAllGiveaways = createAsyncThunk<
  GetGiveawaysResponse,
  PaginationParams | void,
  { rejectValue: string }
>("giveaways/getAllGiveaways", async (params, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const page = params && typeof params === "object" ? params.page || 1 : 1;
    const limit = params && typeof params === "object" ? params.limit || 10 : 10;
    const search = params && typeof params === "object" ? params.search || "" : "";
    const status = params && typeof params === "object" ? params.status || "" : "";

    // Build params object, only including non-empty values
    const queryParams: Record<string, any> = { page, limit };
    if (search) queryParams.search = search;
    if (status) queryParams.status = status;

    const response = await axios.get<GetGiveawaysResponse>(`${baseUrl}api/v1/giveaway`, {
      params: queryParams,
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
      "Failed to fetch giveaways. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllGiveawaysSlice = createSlice({
  name: "allGiveaways",
  initialState,
  reducers: {
    resetGiveawaysState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.giveaways = [];
      state.total = 0;
      state.page = 1;
      state.limit = 10;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGiveaways.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGiveaways.fulfilled, (state, action: PayloadAction<GetGiveawaysResponse>) => {
        state.loading = false;
        state.success = true;
        // Transform all items to replace null with "N/A"
        state.giveaways = (action.payload.data || []).map(transformGiveaway);
        // Extract pagination from pagination object or fallback to root level
        state.total = action.payload.pagination?.total || action.payload.total || 0;
        state.page = action.payload.pagination?.page || action.payload.page || 1;
        state.limit = action.payload.pagination?.limit || action.payload.limit || 10;
      })
      .addCase(getAllGiveaways.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load giveaways";
        state.giveaways = [];
      });
  },
});

// Export actions
export const { resetGiveawaysState } = getAllGiveawaysSlice.actions;

// Export reducer
export default getAllGiveawaysSlice.reducer;
