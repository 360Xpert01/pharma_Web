import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BrickItem } from "./getBrickListSlice";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface BrickByIdResponse {
  success: boolean;
  message: string;
  data: BrickItem;
}

interface BrickByIdState {
  loading: boolean;
  success: boolean;
  error: string | null;
  brick: BrickItem | null;
}

const initialState: BrickByIdState = {
  loading: false,
  success: false,
  error: null,
  brick: null,
};

export const getBrickById = createAsyncThunk<BrickByIdResponse, string, { rejectValue: string }>(
  "brickById/getBrickById",
  async (id, { rejectWithValue }) => {
    try {
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<BrickByIdResponse>(`${baseUrl}api/v1/brick/${id}`, {
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
        "Failed to fetch brick details. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

const getBrickByIdSlice = createSlice({
  name: "brickById",
  initialState,
  reducers: {
    resetBrickByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.brick = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrickById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBrickById.fulfilled, (state, action: PayloadAction<BrickByIdResponse>) => {
        state.loading = false;
        state.success = true;
        state.brick = action.payload.data;
      })
      .addCase(getBrickById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load brick details";
        state.brick = null;
      });
  },
});

export const { resetBrickByIdState } = getBrickByIdSlice.actions;
export default getBrickByIdSlice.reducer;
