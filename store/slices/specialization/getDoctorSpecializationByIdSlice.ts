import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getDoctorSpecializationById = createAsyncThunk(
  "doctorSpecialization/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userSession");
      if (!token) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get(`${baseUrl}api/v1/specialization/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data || response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const getDoctorSpecializationByIdSlice = createSlice({
  name: "doctorSpecializationById",
  initialState: {
    loading: false,
    error: null as string | null,
    doctorSpecialization: null as any,
  },
  reducers: {
    resetDoctorSpecializationByIdState(state) {
      state.loading = false;
      state.error = null;
      state.doctorSpecialization = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorSpecializationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorSpecializationById.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorSpecialization = action.payload;
      })
      .addCase(getDoctorSpecializationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDoctorSpecializationByIdState } = getDoctorSpecializationByIdSlice.actions;
export default getDoctorSpecializationByIdSlice.reducer;
