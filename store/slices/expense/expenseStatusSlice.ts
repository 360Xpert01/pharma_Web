import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCrmExpenses } from "./expenseSlice";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const updateExpenseStatus = createAsyncThunk<
  void,
  { callId: string; status: "approved" | "rejected" | "pending" },
  { rejectValue: string }
>("expense/updateExpenseStatus", async ({ callId, status }, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("Authentication token not found.");
    }

    const endpointSuffix = status === "approved" ? "approve-all" : "reject-all";
    const response = await axios.put<{ success: boolean; message: string }>(
      `${API_BASE_URL}api/v1/call/expense/${callId}/${endpointSuffix}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update expense status");
    }
  } catch (error: any) {
    let errorMessage = "Failed to update expense status";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return rejectWithValue(errorMessage);
  }
});
