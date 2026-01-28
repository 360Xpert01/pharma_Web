import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateQualification = createAsyncThunk(
  "qualification/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/v1/qualifications/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const updateQualificationSlice = createSlice({
  name: "updateQualification",
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
    message: null as string | null,
  },
  reducers: {
    resetUpdateQualificationState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateQualification.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateQualification.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Qualification updated successfully";
      })
      .addCase(updateQualification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetUpdateQualificationState } = updateQualificationSlice.actions;
export default updateQualificationSlice.reducer;
