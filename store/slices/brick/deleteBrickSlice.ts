import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// Interface for Delete Response
interface DeleteBrickResponse {
  success: boolean;
  message: string;
}

// State interface
interface DeleteBrickState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: DeleteBrickState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

/**
 * Async Thunk: Delete Brick (DELETE /api/v1/brick/:id)
 * Isme sirf ID pass ho rahi hai as a string
 */
export const deleteBrick = createAsyncThunk<
  DeleteBrickResponse,
  string, // Payload sirf id hai (string)
  { rejectValue: string }
>("brick/deleteBrick", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    // DELETE method use ho raha hai aur URL mein ID ja rahi hai
    const response = await axios.delete<DeleteBrickResponse>(`${baseUrl}api/v1/brick/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to delete brick. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

const deleteBrickSlice = createSlice({
  name: "deleteBrick",
  initialState,
  reducers: {
    resetDeleteBrickState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBrick.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteBrick.fulfilled, (state, action: PayloadAction<DeleteBrickResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Brick deleted successfully!";
      })
      .addCase(deleteBrick.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetDeleteBrickState } = deleteBrickSlice.actions;
export default deleteBrickSlice.reducer;
