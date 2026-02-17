import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CreateQualificationPayload {
  name: string;
  pulseCode: string;
  status: "active" | "inactive";
}

interface CreateQualificationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    pulseCode: string;
    status: "active" | "inactive";
  };
}

interface QualificationState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdQualification: any | null;
}

// Initial State
const initialState: QualificationState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdQualification: null,
};

// Async Thunk: Create Qualification (POST request)
export const createQualification = createAsyncThunk<
  CreateQualificationResponse,
  CreateQualificationPayload,
  { rejectValue: string }
>("qualification/createQualification", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreateQualificationResponse>(
      `${baseUrl}api/v1/qualification`,
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
      "Failed to create qualification. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createQualificationSlice = createSlice({
  name: "createQualification",
  initialState,
  reducers: {
    resetQualificationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdQualification = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQualification.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createQualification.fulfilled,
        (state, action: PayloadAction<CreateQualificationResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message || "Qualification created successfully!";
          state.createdQualification = action.payload.data || null;
        }
      )
      .addCase(createQualification.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetQualificationState } = createQualificationSlice.actions;

// Export reducer
export default createQualificationSlice.reducer;
