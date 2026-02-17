import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CreateSpecializationPayload {
  pulseCode: string;
  name: string;
  status: "active" | "inactive";
}

interface CreateSpecializationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    pulseCode: string;
    status: "active" | "inactive";
    createdAt: string;
  };
}

interface SpecializationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdSpecialization: any | null;
}

// Initial State
const initialState: SpecializationState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdSpecialization: null,
};

// Async Thunk: Create Specialization (POST request)
export const createSpecialization = createAsyncThunk<
  CreateSpecializationResponse,
  CreateSpecializationPayload,
  { rejectValue: string }
>("specialization/createSpecialization", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreateSpecializationResponse>(
      `${baseUrl}api/v1/specialization/`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create specialization. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createSpecializationSlice = createSlice({
  name: "createSpecialization",
  initialState,
  reducers: {
    resetSpecializationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdSpecialization = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSpecialization.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createSpecialization.fulfilled,
        (state, action: PayloadAction<CreateSpecializationResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message || "Specialization created successfully!";
          state.createdSpecialization = action.payload.data || null;
        }
      )
      .addCase(createSpecialization.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetSpecializationState } = createSpecializationSlice.actions;

// Export reducer
export default createSpecializationSlice.reducer;
