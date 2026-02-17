import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface TeamUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string;
  supervisorId: string;
  supervisorName: string;
  supervisorEmail: string;
  supervisorRole: string;
  territoryId: string | null;
  territoryName: string | null;
  territoryPulseCode: string | null;
}

interface GetTeamUsersResponse {
  success: boolean;
  data: TeamUser[];
}

interface TeamUsersState {
  loading: boolean;
  success: boolean;
  error: string | null;
  users: TeamUser[];
}

const initialState: TeamUsersState = {
  loading: false,
  success: false,
  error: null,
  users: [],
};

export const getTeamUsers = createAsyncThunk<
  GetTeamUsersResponse,
  { teamId: string; roleId?: string },
  { rejectValue: string }
>("team/getTeamUsers", async ({ teamId, roleId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const url = roleId
      ? `${baseUrl}api/v1/team/users/${teamId}?roleId=${roleId}`
      : `${baseUrl}api/v1/team/users/${teamId}`;

    const response = await axios.get<GetTeamUsersResponse>(url, {
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
      "Failed to fetch team users. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

const getTeamUsersSlice = createSlice({
  name: "teamUsers",
  initialState,
  reducers: {
    resetTeamUsersState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamUsers.fulfilled, (state, action: PayloadAction<GetTeamUsersResponse>) => {
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
      })
      .addCase(getTeamUsers.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load team users";
        state.users = [];
      });
  },
});

export const { resetTeamUsersState } = getTeamUsersSlice.actions;
export default getTeamUsersSlice.reducer;
