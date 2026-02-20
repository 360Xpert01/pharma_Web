import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface RegisterEmployeePayload {
  email: string; // Required: format email
  firstName: string; // Required: 2-50 chars
  middleName?: string; // Optional: 2-50 chars
  lastName: string; // Required: 2-50 chars
  fullAddress?: string; // Optional: max 500 chars
  roleId?: string; // Optional: UUID format
  mobileNumber: string; // Required: 10-15 digits only (no special chars)
  pulseCode?: string; // Optional: max 100 chars
  empLegacyCode?: string; // Optional: max 100 chars
  profilePicture?: string; // Optional: URI format
  dob?: string; // Optional: YYYY-MM-DD format
  supervisorId?: string; // Optional: UUID format
  teamId?: string; // Optional: UUID format
  territoryId?: string; // Optional: UUID format
  brickId?: string; // Optional: UUID format
  joiningDate?: string; // Optional: YYYY-MM-DD format
  enableMobileAccess?: boolean;
  mobileView?: string;
  verifiedDevices?: string[]; // Optional: array of strings
}

interface RegisterEmployeeResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    pulseCode: string;
    createdAt: string;
  };
}

interface EmployeeState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  registeredEmployee: any | null;
}

// Initial State
const initialState: EmployeeState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  registeredEmployee: null,
};

const token = localStorage.getItem("userSession");

// Async Thunk: Register Employee (POST /auth/register)
export const registerEmployee = createAsyncThunk<
  RegisterEmployeeResponse,
  RegisterEmployeePayload,
  { rejectValue: string }
>("employee/registerEmployee", async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post<RegisterEmployeeResponse>(
      `${baseUrl}api/v1/auth/register`,
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
      "Failed to register employee. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const registerEmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetEmployeeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.registeredEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      // Fulfilled
      .addCase(
        registerEmployee.fulfilled,
        (state, action: PayloadAction<RegisterEmployeeResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message || "Employee registered successfully!";
          state.registeredEmployee = action.payload.data || null;
        }
      )
      // Rejected
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetEmployeeState } = registerEmployeeSlice.actions;

// Export reducer
export default registerEmployeeSlice.reducer;
