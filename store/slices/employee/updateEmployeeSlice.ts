import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface UpdateEmployeePayload {
  userId: string;
  email?: string; // Optional: format email
  firstName?: string; // Optional: 2-50 chars
  middleName?: string; // Optional: 2-50 chars
  lastName?: string; // Optional: 2-50 chars
  fullAddress?: string; // Optional: max 500 chars
  roleId?: string; // Optional: UUID format
  mobileNumber?: string; // Optional: 10-15 digits only (no special chars)
  pulseCode?: string; // Optional: max 100 chars
  empLegacyCode?: string; // Optional: max 100 chars
  profilePicture?: string; // Optional: URI format
  dob?: string; // Optional: YYYY-MM-DD format
  supervisorId?: string; // Optional: UUID format
  verifiedDevices?: string[]; // Optional: array of strings
}

interface UpdateEmployeeResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    pulseCode: string;
    updatedAt: string;
  };
}

interface UpdateEmployeeState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  updatedEmployee: any | null;
}

// Initial State
const initialState: UpdateEmployeeState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  updatedEmployee: null,
};

// Async Thunk: Update Employee (PUT /users/{userId})
export const updateEmployee = createAsyncThunk<
  UpdateEmployeeResponse,
  UpdateEmployeePayload,
  { rejectValue: string }
>("employee/updateEmployee", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const { userId, ...updateData } = payload;

    const response = await axios.put<UpdateEmployeeResponse>(
      `${baseUrl}api/v1/users/${userId}`,
      updateData,
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
      "Failed to update employee. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const updateEmployeeSlice = createSlice({
  name: "updateEmployee",
  initialState,
  reducers: {
    resetUpdateEmployeeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.updatedEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      // Fulfilled
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<UpdateEmployeeResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Employee updated successfully!";
        state.updatedEmployee = action.payload.data || null;
      })
      // Rejected
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetUpdateEmployeeState } = updateEmployeeSlice.actions;

// Export reducer
export default updateEmployeeSlice.reducer;
