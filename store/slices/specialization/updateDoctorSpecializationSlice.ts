import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateDoctorSpecialization = createAsyncThunk(
  "doctorSpecialization/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/v1/doctor-specializations/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const updateDoctorSpecializationSlice = createSlice({
  name: "updateDoctorSpecialization",
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
    message: null as string | null,
  },
  reducers: {
    resetUpdateDoctorSpecializationState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDoctorSpecialization.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDoctorSpecialization.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Doctor Specialization updated successfully";
      })
      .addCase(updateDoctorSpecialization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetUpdateDoctorSpecializationState } = updateDoctorSpecializationSlice.actions;
export default updateDoctorSpecializationSlice.reducer;
