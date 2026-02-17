import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface TeamDropdownItem {
  id: string;
  name: string;
}

interface TeamAllResponse {
  success: boolean;
  data: TeamDropdownItem[];
}

interface TeamAllState {
  loading: boolean;
  success: boolean;
  error: string | null;
  teams: TeamDropdownItem[];
}

const initialState: TeamAllState = {
  loading: false,
  success: false,
  error: null,
  teams: [],
};

export const getTeamAll = createAsyncThunk<TeamAllResponse, void, { rejectValue: string }>(
  "team/getTeamAll",
  async (_, { rejectWithValue }) => {
    try {
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<TeamAllResponse>(`${baseUrl}api/v1/team/all`, {
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
        "Failed to fetch teams for dropdown.";
      return rejectWithValue(errorMessage);
    }
  }
);

const getTeamAllSlice = createSlice({
  name: "teamAll",
  initialState,
  reducers: {
    resetTeamAllState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.teams = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamAll.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teams = action.payload.data;
      })
      .addCase(getTeamAll.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { resetTeamAllState } = getTeamAllSlice.actions;
export default getTeamAllSlice.reducer;
