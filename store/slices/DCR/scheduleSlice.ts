import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface CallReportItem {
  callId: string;
  saleRepId: string;
  saleRepName: string;
  saleRepRole: string;
  saleRepPicture: string;
  lineManagerId: string;
  lineManagerName: string;
  lineManagerRole: string;
  lineManagerPicture: string;
  doctorSpecialization: string;
  doctorName: string;
  products: any[];
}

interface CallReportsState {
  data: CallReportItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CallReportsState = {
  data: [],
  loading: false,
  error: null,
};

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchCallReports = createAsyncThunk<CallReportItem[], void, { rejectValue: string }>(
  "callReports/fetchCallReports",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userSession");

      const apiUrl = `${API_BASE_URL}api/v1/call/reports`;

      const response = await axios.get<{
        success: boolean;
        message: string;
        data: CallReportItem[];
      }>(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("✅ API Response:", response.data);

      return response.data.data;
    } catch (error: any) {
      let errorMessage = "Failed to fetch call reports";

      if (axios.isAxiosError(error)) {
        console.error("❌ API Error:", {
          status: error.response?.status,
          message: error.response?.data?.message,
          error: error.message,
        });
        errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Network error or server is unreachable";
      } else if (error instanceof Error) {
        console.error("❌ Error:", error.message);
        errorMessage = error.message;
      }

      console.error("❌ Final Error Message:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// ================== Slice ==================
const callReportsSlice = createSlice({
  name: "callReports",
  initialState,
  reducers: {
    clearCallReports: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCallReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCallReports.fulfilled, (state, action: PayloadAction<CallReportItem[]>) => {
        state.loading = false;
        state.data = action.payload;

        console.log("✅ State updated with call reports:", state);
      })
      .addCase(fetchCallReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export const { clearCallReports } = callReportsSlice.actions;
export default callReportsSlice.reducer;
