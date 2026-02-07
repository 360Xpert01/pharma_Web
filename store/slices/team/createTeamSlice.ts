import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface SaleRepBrick {
  id: string;
  brickIds: string[];
}

export interface CreateTeamPayload {
  pulseCode: string;
  legacyCode?: string;
  name: string;
  status: "active" | "inactive";
  callPointId?: string; // Keep for backward compatibility
  callPoints?: { id: string; name: string }[]; // New multi-select support with objects
  channelId: string;
  productIds: string[];
  saleRepIds: SaleRepBrick[];
}

interface CreatedTeam {
  id: string;
  pulseCode: string;
  legacyCode: string;
  name: string;
  status: string;
  callPointId: string;
  channelId: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CreateTeamResponse {
  success: boolean;
  message?: string;
  data?: CreatedTeam;
}

interface CreateTeamState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdTeam: CreatedTeam | null;
  status: number | null;
}

// Initial State
const initialState: CreateTeamState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdTeam: null,
  status: null,
};

// Async Thunk: Create Team (POST /api/v1/team/create)
export const createTeam = createAsyncThunk<
  CreateTeamResponse,
  CreateTeamPayload,
  { rejectValue: { message: string; status?: number } }
>("team/createTeam", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue({ message: "No session found. Please login again." });
    }

    console.log("createTeam thunk started with payload:", payload);

    const response = await axios.post<CreateTeamResponse>(
      `${baseUrl || "https://api.ceturo.com/"}api/v1/team/create`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("createTeam API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("createTeam thunk error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create team. Please try again.";

    return rejectWithValue({
      message: errorMessage,
      status: error.response?.status,
    });
  }
});

// Slice
const createTeamSlice = createSlice({
  name: "createTeam",
  initialState,
  reducers: {
    resetCreateTeamState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdTeam = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
        state.status = null;
      })
      .addCase(createTeam.fulfilled, (state, action: PayloadAction<CreateTeamResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Team created successfully!";
        state.createdTeam = action.payload.data || null;
        state.status = 200;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Something went wrong";
        state.status = action.payload?.status || null;
      });
  },
});

// Export actions
export const { resetCreateTeamState } = createTeamSlice.actions;

// Export reducer
export default createTeamSlice.reducer;
