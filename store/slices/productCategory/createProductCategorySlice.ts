import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface CreateProductCategoryPayload {
  pulseCode: string;
  productCategory: string;
  status: "active" | "inactive";
}

interface CreateProductCategoryResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    productCategory: string;
    pulseCode: string;
    status: "active" | "inactive";
    createdAt: string;
  };
}

interface ProductCategoryState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdProductCategory: any | null;
}

// Initial State
const initialState: ProductCategoryState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdProductCategory: null,
};

// Async Thunk: Create Product Category (POST request)
export const createProductCategory = createAsyncThunk<
  CreateProductCategoryResponse,
  CreateProductCategoryPayload,
  { rejectValue: string }
>("productCategory/createProductCategory", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.post<CreateProductCategoryResponse>(
      `${baseUrl}api/v1/productCategory`,
      payload,
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
      "Failed to create product category. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createProductCategorySlice = createSlice({
  name: "createProductCategory",
  initialState,
  reducers: {
    resetProductCategoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdProductCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(
        createProductCategory.fulfilled,
        (state, action: PayloadAction<CreateProductCategoryResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message || "Product category created successfully!";
          state.createdProductCategory = action.payload.data || null;
        }
      )
      .addCase(createProductCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetProductCategoryState } = createProductCategorySlice.actions;

// Export reducer
export default createProductCategorySlice.reducer;
