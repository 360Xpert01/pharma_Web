import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSegmentById = createAsyncThunk(
  "segment/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userSession");
      if (!token) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get(`${baseUrl}api/v1/segment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // API returns { success, data: {...}, message }
      // We need to extract the nested data object
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const getSegmentByIdSlice = createSlice({
  name: "segmentById",
  initialState: {
    loading: false,
    error: null as string | null,
    segment: null as any,
  },
  reducers: {
    resetSegmentByIdState(state) {
      state.loading = false;
      state.error = null;
      state.segment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSegmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSegmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.segment = action.payload;
      })
      .addCase(getSegmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSegmentByIdState } = getSegmentByIdSlice.actions;
export default getSegmentByIdSlice.reducer;
