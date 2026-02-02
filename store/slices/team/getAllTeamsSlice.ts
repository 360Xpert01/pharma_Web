import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface TeamUser {
  id: string;
  profilePicture: string;
}

interface TeamSku {
  id: string;
  sku: string;
}

interface TeamProduct {
  id: string;
  name: string;
  skus: TeamSku[];
}

export interface TeamItem {
  id: string;
  name: string;
  pulseCode: string;
  legacyCode: string;
  callPointId: string;
  callPointName: string;
  channelId: string;
  channelName: string;
  users: TeamUser[];
  products: TeamProduct[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TeamsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  teams: TeamItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

// Initial State
const initialState: TeamsState = {
  loading: false,
  success: false,
  error: null,
  teams: [],
  pagination: null,
};

// Async Thunk: Get All Teams (GET /api/v1/team)
interface GetAllTeamsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getAllTeams = createAsyncThunk<
  { teams: TeamItem[]; pagination: any },
  GetAllTeamsParams | undefined,
  { rejectValue: string }
>("teams/getAllTeams", async (params, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get(`${baseUrl}api/v1/team`, {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        search: params?.search || "",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
    });

    // Check if response data is an array (old behavior) or object with pagination
    if (Array.isArray(response.data)) {
      return {
        teams: response.data,
        pagination: null,
      };
    }

    return {
      teams: response.data?.items || response.data?.data || [],
      pagination: response.data?.pagination || null,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch teams. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllTeamsSlice = createSlice({
  name: "allTeams",
  initialState,
  reducers: {
    resetTeamsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.teams = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teams = action.payload.teams;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load teams";
        state.teams = [];
        state.pagination = null;
      });
  },
});

// Export actions
export const { resetTeamsState } = getAllTeamsSlice.actions;

// Export reducer
export default getAllTeamsSlice.reducer;
