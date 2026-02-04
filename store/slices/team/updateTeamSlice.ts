import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TeamItem } from "./getAllTeamsSlice"; // Importing TeamItem type from getAllTeamsSlice

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Type for the update payload
// Adjust fields based on what the API expects for updates
export interface UpdateTeamPayload {
  id: string; // ID is required to identify the team
  name?: string;
  channelId?: string;
  callPointId?: string;
  isActive?: boolean;
  status?: string; // "active" | "inactive"
  productIds?: string[];
  userIds?: string[]; // Array of user IDs - might be deprecated in favor of saleRepIds
  saleRepIds?: { id: string; brickIds: string[] }[]; // Match CreateTeamPayload structure
  // Add other fields as needed
}

interface UpdateTeamState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UpdateTeamState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

export const updateTeam = createAsyncThunk<
  { message: string; team: TeamItem }, // Return type
  UpdateTeamPayload, // Argument type
  { rejectValue: string }
>("team/updateTeam", async (payload, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    // Extract ID from payload and remove it from the body data if preferred,
    // or keep it. Usually ID is in URL.
    const { id, ...data } = payload;

    const response = await axios.put(`${baseUrl}api/v1/team/${id}`, data, {
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
      "Failed to update team. Please try again.";
    return rejectWithValue(errorMessage);
  }
});

const updateTeamSlice = createSlice({
  name: "updateTeam",
  initialState,
  reducers: {
    resetUpdateTeamState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Team updated successfully";
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update team";
      });
  },
});

export const { resetUpdateTeamState } = updateTeamSlice.actions;
export default updateTeamSlice.reducer;
