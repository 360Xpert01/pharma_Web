// src/redux/slices/weeklyCallExpensesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ================== Types ==================
export interface ExpenseItem {
  id?: string;
  description: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  // Add other fields if API returns more (date, category, etc.)
}

export interface WeeklyExpenseResponse {
  totalExpense: number;
  approvedAmount: number;
  rejectedAmount: number;
  expenses: ExpenseItem[];
}

interface WeeklyCallExpensesState {
  data: WeeklyExpenseResponse | null;
  loading: boolean;
  error: string | null;
  lastParams: {
    salesmanId: string;
    from: string;
    to: string;
  } | null;
}

const initialState: WeeklyCallExpensesState = {
  data: null,
  loading: false,
  error: null,
  lastParams: null,
};

// ================== Async Thunk ==================
export const fetchWeeklyCallExpenses = createAsyncThunk<
  WeeklyExpenseResponse,
  { salesmanId: string; from: string; to: string },
  { rejectValue: string }
>(
  "weeklyCallExpenses/fetchWeeklyCallExpenses",
  async ({ salesmanId, from, to }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userSession");

      if (!token) {
        return rejectWithValue("Authentication token not found. Please login again.");
      }

      const url = `${API_BASE_URL}api/v1/call/call-expense/weekly/${salesmanId}?from=${from}&to=${to}`;

      console.log("📡 Fetching weekly call expenses:", url);

      const response = await axios.get<{
        success: boolean;
        message?: string;
        data: WeeklyExpenseResponse;
      }>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : error.message || "Failed to load weekly call expenses";

      console.error("❌ Weekly call expenses error:", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// ================== Slice ==================
const weeklyCallExpensesSlice = createSlice({
  name: "weeklyCallExpenses",
  initialState,
  reducers: {
    clearWeeklyExpenses: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.lastParams = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyCallExpenses.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.lastParams = {
          salesmanId: action.meta.arg.salesmanId,
          from: action.meta.arg.from,
          to: action.meta.arg.to,
        };
      })
      .addCase(
        fetchWeeklyCallExpenses.fulfilled,
        (state, action: PayloadAction<WeeklyExpenseResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchWeeklyCallExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch weekly call expenses";
      });
  },
});

export const { clearWeeklyExpenses } = weeklyCallExpensesSlice.actions;
export default weeklyCallExpensesSlice.reducer;
