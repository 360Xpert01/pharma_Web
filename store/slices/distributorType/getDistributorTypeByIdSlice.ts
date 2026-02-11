import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getDistributorTypeById = createAsyncThunk(
  "distributorType/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userSession");
      if (!token) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get(`${baseUrl}api/v1/distributorType/${id}`, {
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

const getDistributorTypeByIdSlice = createSlice({
  name: "distributorTypeById",
  initialState: {
    loading: false,
    error: null as string | null,
    distributorType: null as any,
  },
  reducers: {
    resetDistributorTypeByIdState(state) {
      state.loading = false;
      state.error = null;
      state.distributorType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDistributorTypeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDistributorTypeById.fulfilled, (state, action) => {
        state.loading = false;
        state.distributorType = action.payload;
      })
      .addCase(getDistributorTypeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDistributorTypeByIdState } = getDistributorTypeByIdSlice.actions;
export default getDistributorTypeByIdSlice.reducer;
