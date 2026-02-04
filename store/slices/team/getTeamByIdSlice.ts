import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// --- Types based on provided JSON ---

export interface TeamResult {
  id: string;
  name: string;
  pulseCode: string; // e.g. "team02"
  callPointId: string;
  channelId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  legacyCode: string;
  callPointName: string;
  channelName: string;
}

export interface ProductSku {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  productsku: ProductSku[];
}

export interface TeamProduct {
  teamId: string;
  product: Product[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamUser {
  user: {
    id: string;
    name: string;
    role: string;
  };
  brick: {
    id: string;
    name: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GetTeamByIdResponse {
  result: TeamResult;
  memberInfo: any[]; // Empty in example, keeping as any[] for flexibility
  teamProducts: TeamProduct[];
  teamUsers: TeamUser[]; // Empty in example
}

interface TeamByIdState {
  loading: boolean;
  success: boolean;
  error: string | null;
  team: GetTeamByIdResponse | null;
}

// --- Initial State ---

const initialState: TeamByIdState = {
  loading: false,
  success: false,
  error: null,
  team: null,
};

// --- Async Thunk ---

export const getTeamById = createAsyncThunk<
  GetTeamByIdResponse,
  string, // id
  { rejectValue: string }
>("team/getTeamById", async (id, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get(`${baseUrl}api/v1/team/${id}`, {
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
      "Failed to fetch team details";
    return rejectWithValue(errorMessage);
  }
});

// --- Slice ---

const getTeamByIdSlice = createSlice({
  name: "getTeamById",
  initialState,
  reducers: {
    resetGetTeamByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.team = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getTeamById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.team = action.payload;
      })
      .addCase(getTeamById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch team details";
        state.team = null;
      });
  },
});

export const { resetGetTeamByIdState } = getTeamByIdSlice.actions;
export default getTeamByIdSlice.reducer;
