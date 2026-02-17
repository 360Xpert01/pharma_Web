import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TargetDetailResponse, TargetDetailData } from "../../../types/target";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface TargetByIdState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: TargetDetailData | null;
}

const initialState: TargetByIdState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

// Async Thunk: Get Target By ID (GET /api/v1/targets/{id})
export const getTargetById = createAsyncThunk<
  TargetDetailResponse,
  string,
  { rejectValue: string }
>("target/getTargetById", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<TargetDetailResponse>(`${baseUrl}api/v1/targets/${id}`, {
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
      "Failed to fetch target details. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

const getTargetByIdSlice = createSlice({
  name: "targetById",
  initialState,
  reducers: {
    resetTargetByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTargetById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getTargetById.fulfilled, (state, action: PayloadAction<TargetDetailResponse>) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload.data;
      })
      .addCase(getTargetById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetTargetByIdState } = getTargetByIdSlice.actions;
export default getTargetByIdSlice.reducer;
