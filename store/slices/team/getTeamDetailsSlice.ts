import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Type Definitions based on actual API response
interface TeamUser {
  id: string;
  profilePicture: string;
}

interface ProductSku {
  sku: string;
  id: string;
}

interface TeamProduct {
  id: string;
  name: string;
  skus: ProductSku[];
}

export interface TeamDetailData {
  id: string;
  name: string;
  pulseCode: string;
  callPoints: any[];
  channelId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  legacyCode: string;
  channelName: string;
  users: TeamUser[];
  products: TeamProduct[];
}

interface GetTeamDetailResponse {
  success: boolean;
  data: TeamDetailData;
}

interface TeamDetailState {
  loading: boolean;
  success: boolean;
  error: string | null;
  teamDetails: TeamDetailData | null;
}

// Initial State
const initialState: TeamDetailState = {
  loading: false,
  success: false,
  error: null,
  teamDetails: null,
};

// Async Thunk: Get Team Details with Users and Products
export const getTeamDetails = createAsyncThunk<
  GetTeamDetailResponse,
  string, // teamId
  { rejectValue: string }
>("team/getTeamDetails", async (teamId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetTeamDetailResponse>(`${baseUrl}api/v1/team/${teamId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch team details. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getTeamDetailsSlice = createSlice({
  name: "teamDetails",
  initialState,
  reducers: {
    resetTeamDetailsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.teamDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamDetails.fulfilled, (state, action: PayloadAction<GetTeamDetailResponse>) => {
        state.loading = false;
        state.success = true;
        state.teamDetails = action.payload.data;
      })
      .addCase(getTeamDetails.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load team details";
        state.teamDetails = null;
      });
  },
});

// Export actions
export const { resetTeamDetailsState } = getTeamDetailsSlice.actions;

// Export reducer
export default getTeamDetailsSlice.reducer;
