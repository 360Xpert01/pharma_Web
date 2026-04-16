import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const updateSingleExpenseItemStatus = createAsyncThunk<
  { id: string; status: string },
  { id: string; status: string },
  { rejectValue: string }
>("detailedExpense/updateSingleExpenseItemStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("Authentication token not found.");
    }

    const response = await axios.put<{ success: boolean; data: any }>(
      `${API_BASE_URL}api/v1/call/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.success) {
      throw new Error("Failed to update status");
    }

    return { id, status };
  } catch (error: any) {
    let errorMessage = "Failed to update status";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    }
    return rejectWithValue(errorMessage);
  }
});
