import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface UpdateProductCategoryPayload {
  id: string;
  productCategory: string;
  status: "active" | "inactive";
}

interface UpdateProductCategoryResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    productCategory: string;
    pulseCode: string;
    status: "active" | "inactive";
    updatedAt: string;
  };
}

interface UpdateProductCategoryState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

// Initial State
const initialState: UpdateProductCategoryState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

// Async Thunk: Update Product Category (PUT request)
export const updateProductCategory = createAsyncThunk<
  UpdateProductCategoryResponse,
  UpdateProductCategoryPayload,
  { rejectValue: string }
>("productCategory/updateProductCategory", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const { id, ...updateData } = payload;

    const response = await axios.put<UpdateProductCategoryResponse>(
      `${baseUrl}api/v1/productCategory/${id}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to update product category. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const updateProductCategorySlice = createSlice({
  name: "updateProductCategory",
  initialState,
  reducers: {
    resetUpdateProductCategoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(
        updateProductCategory.fulfilled,
        (state, action: PayloadAction<UpdateProductCategoryResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message || "Product category updated successfully!";
        }
      )
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetUpdateProductCategoryState } = updateProductCategorySlice.actions;

// Export reducer
export default updateProductCategorySlice.reducer;
