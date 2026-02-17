import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Territory {
  territoryId: string;
  territoryName: string;
  percentage: number;
}

interface Conflict {
  brickId: string;
  brickName: string;
  territories: Territory[];
  totalPercentage: number;
  isResolved: boolean;
}

interface TeamConflictsData {
  teamId: string;
  teamName: string;
  conflicts: Conflict[];
}

interface TeamConflictsResponse {
  success: boolean;
  data: TeamConflictsData;
}

interface TeamConflictsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: TeamConflictsData | null;
}

const initialState: TeamConflictsState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

export const getTeamConflicts = createAsyncThunk<
  TeamConflictsResponse,
  string,
  { rejectValue: string }
>("team/getTeamConflicts", async (teamId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<TeamConflictsResponse>(
      `${baseUrl}api/v1/team/conflict/${teamId}`,
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
      "Failed to fetch team conflicts.";
    return rejectWithValue(errorMessage);
  }
});

const getTeamConflictsSlice = createSlice({
  name: "teamConflicts",
  initialState,
  reducers: {
    resetTeamConflictsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamConflicts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamConflicts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })
      .addCase(getTeamConflicts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { resetTeamConflictsState } = getTeamConflictsSlice.actions;
export default getTeamConflictsSlice.reducer;
