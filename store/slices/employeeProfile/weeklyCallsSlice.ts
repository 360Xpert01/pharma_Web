import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

interface WeeklyCallsState {
  data: DailyCallSchedule[]; // grouped by date
  loading: boolean;
  error: string | null;
  lastFetchedParams: {
    salesmanId: string;
    from: string;
    to: string;
  } | null;
}

const initialState: WeeklyCallsState = {
  data: [],
  loading: false,
  error: null,
  lastFetchedParams: null,
};

// ================== Async Thunk ==================
export const fetchWeeklyCallSchedule = createAsyncThunk<
  DailyCallSchedule[], // return type
  { salesmanId: string; from: string; to: string }, // params
  { rejectValue: string }
>("weeklyCalls/fetchWeeklyCallSchedule", async ({ salesmanId, from, to }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    const url = `${API_BASE_URL}api/v1/call/${salesmanId}/weeklycall?from=${from}&to=${to}`;

    console.log("Fetching weekly calls:", url);

    const response = await axios.get<{
      success: boolean;
      message: string;
      data: WeeklyCallResponse;
    }>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "API returned unsuccessful response");
    }

    // Return only the grouped array
    return response.data.data.callDetails;
  } catch (error: any) {
    let errorMessage = "Failed to fetch weekly call schedule";

    if (axios.isAxiosError(error)) {
      errorMessage =
        error.response?.data?.message || error.message || "Network error or server is unreachable";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return rejectWithValue(errorMessage);
  }
});

// ================== Slice ==================
const weeklyCallsSlice = createSlice({
  name: "weeklyCalls",
  initialState,
  reducers: {
    clearWeeklyCalls: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
      state.lastFetchedParams = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyCallSchedule.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.lastFetchedParams = {
          salesmanId: action.meta.arg.salesmanId,
          from: action.meta.arg.from,
          to: action.meta.arg.to,
        };
      })
      .addCase(
        fetchWeeklyCallSchedule.fulfilled,
        (state, action: PayloadAction<DailyCallSchedule[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchWeeklyCallSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error occurred";
      });
  },
});

export const { clearWeeklyCalls } = weeklyCallsSlice.actions;
export default weeklyCallsSlice.reducer;
