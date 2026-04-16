import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { updateSingleExpenseItemStatus } from "./updateSingleExpenseStatus";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface DetailedExpenseItem {
  id: string;
  title: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
}

interface DetailedExpenseState {
  data: DetailedExpenseItem[];
  loading: boolean;
  error: string | null;
}

const initialState: DetailedExpenseState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchExpenseDetailsByCallId = createAsyncThunk<
  DetailedExpenseItem[],
  string,
  { rejectValue: string }
>("detailedExpense/fetchExpenseDetailsByCallId", async (callId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    const response = await axios.get<{
      success: boolean;
      data: DetailedExpenseItem[];
    }>(`${API_BASE_URL}api/v1/call/expense/${callId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    }

    return response.data.data;
  } catch (error: any) {
    let errorMessage = "Failed to fetch expense details";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});

const detailedExpenseSlice = createSlice({
  name: "detailedExpense",
  initialState,
  reducers: {
    clearDetailedExpenses: (state) => {
      state.data = [];
      state.error = null;
      state.loading = false;
    },
    updateLocalExpenseStatus: (
      state,
      action: PayloadAction<{ id: string; status: "approved" | "rejected" }>
    ) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? { ...item, status: action.payload.status } : item
      );
    },
    bulkUpdateLocalExpenseStatus: (state, action: PayloadAction<"approved" | "rejected">) => {
      state.data = state.data.map((item) => ({ ...item, status: action.payload }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseDetailsByCallId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })
      .addCase(
        fetchExpenseDetailsByCallId.fulfilled,
        (state, action: PayloadAction<DetailedExpenseItem[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchExpenseDetailsByCallId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch expense details";
      })
      .addCase(updateSingleExpenseItemStatus.fulfilled, (state, action) => {
        state.data = state.data.map((item) =>
          item.id === action.payload.id ? { ...item, status: action.payload.status as any } : item
        );
      });
  },
});

export const { clearDetailedExpenses, updateLocalExpenseStatus, bulkUpdateLocalExpenseStatus } =
  detailedExpenseSlice.actions;
export default detailedExpenseSlice.reducer;
