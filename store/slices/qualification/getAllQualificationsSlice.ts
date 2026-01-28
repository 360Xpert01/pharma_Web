import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface QualificationItem {
  id: string;
  name: string;
  pulseCode: string;
  status: "active" | "inactive";
}

interface GetQualificationsResponse {
  success: boolean;
  message?: string;
  data: QualificationItem[];
}

interface QualificationsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  qualifications: QualificationItem[];
}

// Initial State
const initialState: QualificationsState = {
  loading: false,
  success: false,
  error: null,
  qualifications: [],
};

// Async Thunk: Get All Qualifications (GET /api/v1/qualification/all)
export const getAllQualifications = createAsyncThunk<
  GetQualificationsResponse,
  void,
  { rejectValue: string }
>("qualifications/getAllQualifications", async (_, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetQualificationsResponse>(`${baseUrl}api/v1/qualification`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch qualifications. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const getAllQualificationsSlice = createSlice({
  name: "allQualifications",
  initialState,
  reducers: {
    resetQualificationsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.qualifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQualifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllQualifications.fulfilled,
        (state, action: PayloadAction<GetQualificationsResponse>) => {
          state.loading = false;
          state.success = true;
          state.qualifications = action.payload.data;
        }
      )
      .addCase(getAllQualifications.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load qualifications";
        state.qualifications = [];
      });
  },
});

// Export actions
export const { resetQualificationsState } = getAllQualificationsSlice.actions;

// Export reducer
export default getAllQualificationsSlice.reducer;
