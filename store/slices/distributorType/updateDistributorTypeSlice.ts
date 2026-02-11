import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateDistributorType = createAsyncThunk(
  "distributorType/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userSession");
      if (!token) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.put(
        `${baseUrl}api/v1/distributorType/${id}`,
        {
          name: data.name,
          isActive: data.status === "active",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const updateDistributorTypeSlice = createSlice({
  name: "updateDistributorType",
  initialState: {
    loading: false,
    error: null as string | null,
    success: false,
    message: null as string | null,
  },
  reducers: {
    resetUpdateDistributorTypeState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDistributorType.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateDistributorType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Distributor type updated successfully";
      })
      .addCase(updateDistributorType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetUpdateDistributorTypeState } = updateDistributorTypeSlice.actions;
export default updateDistributorTypeSlice.reducer;
