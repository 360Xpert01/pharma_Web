import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface SKU {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  profilePicture?: string;
  skus: SKU[];
}

interface TeamTargetProductsData {
  teamId: string;
  teamName: string;
  channelId: string;
  channelName: string;
  products: Product[];
}

interface TeamTargetProductsResponse {
  success: boolean;
  data: TeamTargetProductsData;
}

interface TeamTargetProductsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: TeamTargetProductsData | null;
}

const initialState: TeamTargetProductsState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

export const getTeamTargetProducts = createAsyncThunk<
  TeamTargetProductsResponse,
  string,
  { rejectValue: string }
>("team/getTeamTargetProducts", async (teamId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<TeamTargetProductsResponse>(
      `${baseUrl}api/v1/team/target/${teamId}`,
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
      "Failed to fetch team target products.";
    return rejectWithValue(errorMessage);
  }
});

const getTeamTargetProductsSlice = createSlice({
  name: "teamTargetProducts",
  initialState,
  reducers: {
    resetTeamTargetProductsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamTargetProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamTargetProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })
      .addCase(getTeamTargetProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { resetTeamTargetProductsState } = getTeamTargetProductsSlice.actions;
export default getTeamTargetProductsSlice.reducer;
