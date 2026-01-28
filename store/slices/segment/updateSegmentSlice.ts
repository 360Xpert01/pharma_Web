import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSegment = createAsyncThunk(
  "segment/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/v1/segments/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const updateSegmentSlice = createSlice({
  name: "updateSegment",
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
    message: null as string | null,
  },
  reducers: {
    resetUpdateSegmentState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSegment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSegment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Segment updated successfully";
      })
      .addCase(updateSegment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetUpdateSegmentState } = updateSegmentSlice.actions;
export default updateSegmentSlice.reducer;
