import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CreateDistributorTypePayload {
  name: string;
  pulseCode: string;
  status: "active" | "inactive";
}

interface CreateDistributorTypeResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    pulseCode: string;
    status: "active" | "inactive";
  };
}

interface DistributorTypeState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdDistributorType: any | null;
}

// Initial State
const initialState: DistributorTypeState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdDistributorType: null,
};

// Async Thunk: Create DistributorType (POST request)
export const createDistributorType = createAsyncThunk<
  CreateDistributorTypeResponse,
  CreateDistributorTypePayload,
  { rejectValue: string }
>("distributorType/createDistributorType", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreateDistributorTypeResponse>(
      `${baseUrl}api/v1/distributorType/create`,
      {
        name: payload.name,
        pulseCode: payload.pulseCode,
        isActive: payload.status === "active",
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
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create distributor type. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createDistributorTypeSlice = createSlice({
  name: "createDistributorType",
  initialState,
  reducers: {
    resetDistributorTypeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdDistributorType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDistributorType.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createDistributorType.fulfilled,
        (state, action: PayloadAction<CreateDistributorTypeResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message || "Distributor type created successfully!";
          state.createdDistributorType = action.payload.data || null;
        }
      )
      .addCase(createDistributorType.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetDistributorTypeState } = createDistributorTypeSlice.actions;

// Export reducer
export default createDistributorTypeSlice.reducer;
