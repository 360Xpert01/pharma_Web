import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface Specialization {
  id: string;
  name: string;
  pulseCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GetSpecializationsResponse {
  success: boolean;
  message: string;
  data: Specialization[];
}

interface SpecializationsState {
  specializations: Specialization[];
  loading: boolean;
  success: boolean;
  error: string | null;
}

// Initial State
const initialState: SpecializationsState = {
  specializations: [],
  loading: false,
  success: false,
  error: null,
};

// Async Thunk: Get All Specializations (GET request)
export const getAllSpecializations = createAsyncThunk<
  GetSpecializationsResponse,
  void,
  { rejectValue: string }
>("specialization/getAllSpecializations", async (_, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetSpecializationsResponse>(
      `${baseUrl}api/v1/doctorSpecialization/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch specializations. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllSpecializationsSlice = createSlice({
  name: "allSpecializations",
  initialState,
  reducers: {
    resetSpecializationsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.specializations = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSpecializations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllSpecializations.fulfilled,
        (state, action: PayloadAction<GetSpecializationsResponse>) => {
          state.loading = false;
          state.success = true;
          state.specializations = action.payload.data;
        }
      )
      .addCase(getAllSpecializations.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch specializations";
      });
  },
});

// Export actions
export const { resetSpecializationsState } = getAllSpecializationsSlice.actions;

// Export reducer
export default getAllSpecializationsSlice.reducer;
