import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { updateExpenseStatus } from "./expenseStatusSlice";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface ExpenseClaim {
  callId: string;
  callDate: string;
  partyName: string | null;
  partyImage: string | null;
  partySpecialization: string | null;
  totalExpense: number;
  approvedAmount: number;
  rejectedAmount: number;
  salesRepName: string;
  salesRepImage: string | null;
  status: "pending" | "approved" | "rejected";
}

interface PaginationInfo {
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface ExpenseState {
  data: ExpenseClaim[];
  pagination: PaginationInfo;
  loading: boolean;
  statusUpdating: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  data: [],
  pagination: {
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  loading: false,
  statusUpdating: false,
  error: null,
};

interface FetchExpensesParams {
  page?: number;
  limit?: number;
  search?: string;
  from?: string;
  to?: string;
  doctorId?: string;
}

export const fetchCrmExpenses = createAsyncThunk<
  { data: ExpenseClaim[]; pagination: PaginationInfo },
  FetchExpensesParams | void,
  { rejectValue: string }
>("expense/fetchCrmExpenses", async (params, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const search = params?.search || "";

    const queryParams: any = { page, limit, search };
    if (params?.from) queryParams.from = params.from;
    if (params?.to) queryParams.to = params.to;
    if (params?.doctorId) queryParams.doctorId = params.doctorId;

    const response = await axios.get<{
      success: boolean;
      data: ExpenseClaim[];
      pagination: PaginationInfo;
    }>(`${API_BASE_URL}api/v1/call/expense/crm`, {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }

    return {
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error: any) {
    let errorMessage = "Failed to fetch CRM expenses";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    clearExpenses: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrmExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrmExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCrmExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error occurred";
      })
      .addCase(updateExpenseStatus.pending, (state) => {
        state.statusUpdating = true;
        state.error = null;
      })
      .addCase(updateExpenseStatus.fulfilled, (state) => {
        state.statusUpdating = false;
      })
      .addCase(updateExpenseStatus.rejected, (state, action) => {
        state.statusUpdating = false;
        state.error = action.payload || "Failed to update status";
      });
  },
});

export const { clearExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
