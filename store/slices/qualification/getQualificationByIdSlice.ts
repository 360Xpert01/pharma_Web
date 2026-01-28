import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getQualificationById = createAsyncThunk(
  "qualification/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/qualifications/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const getQualificationByIdSlice = createSlice({
  name: "qualificationById",
  initialState: {
    loading: false,
    error: null as string | null,
    qualification: null as any,
  },
  reducers: {
    resetQualificationByIdState(state) {
      state.loading = false;
      state.error = null;
      state.qualification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQualificationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQualificationById.fulfilled, (state, action) => {
        state.loading = false;
        state.qualification = action.payload;
      })
      .addCase(getQualificationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetQualificationByIdState } = getQualificationByIdSlice.actions;
export default getQualificationByIdSlice.reducer;
