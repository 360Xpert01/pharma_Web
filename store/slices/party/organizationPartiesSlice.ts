import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// Types
export interface OrganizationParty {
  partyId: string;
  partyName: string;
  organizationId: string;
}

interface GetOrganizationPartiesResponse {
  success: boolean;
  message: string;
  data: OrganizationParty[];
}

interface OrganizationPartiesState {
  loading: boolean;
  success: boolean;
  error: string | null;
  organizationParties: OrganizationParty[];
}

// Initial State
const initialState: OrganizationPartiesState = {
  loading: false,
  success: false,
  error: null,
  organizationParties: [],
};

// Async Thunk: Get Organization Parties
export const getOrganizationParties = createAsyncThunk<
  GetOrganizationPartiesResponse,
  void,
  { rejectValue: string }
>("organizationParties/getOrganizationParties", async (_, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetOrganizationPartiesResponse>(
      `${baseUrl}api/v1/parties/organization-parties`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch organization parties.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const organizationPartiesSlice = createSlice({
  name: "organizationParties",
  initialState,
  reducers: {
    resetOrganizationPartiesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.organizationParties = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizationParties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOrganizationParties.fulfilled,
        (state, action: PayloadAction<GetOrganizationPartiesResponse>) => {
          state.loading = false;
          state.success = true;
          state.organizationParties = action.payload.data;
        }
      )
      .addCase(getOrganizationParties.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load organization parties";
        state.organizationParties = [];
      });
  },
});

export const { resetOrganizationPartiesState } = organizationPartiesSlice.actions;

// Selectors
export const selectOrganizationParties = (state: {
  organizationParties: OrganizationPartiesState;
}) => state.organizationParties.organizationParties;
export const selectOrganizationPartiesLoading = (state: {
  organizationParties: OrganizationPartiesState;
}) => state.organizationParties.loading;

export default organizationPartiesSlice.reducer;
