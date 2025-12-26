import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface ProductCategory {
  id: string;
  productCategory: string;
}

interface GetProductCategoriesResponse {
  success: boolean;
  data: ProductCategory[];
  message: string;
}

interface ProductCategoriesState {
  categories: ProductCategory[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: ProductCategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// Async Thunk: Get all product categories
export const getProductCategories = createAsyncThunk<
  GetProductCategoriesResponse,
  void,
  { rejectValue: string }
>("productCategory/getAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetProductCategoriesResponse>(
      `${baseUrl}api/v1/productCategory`,
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
      "Failed to fetch product categories. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {
    resetProductCategoriesState: (state) => {
      state.loading = false;
      state.error = null;
      state.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProductCategories.fulfilled,
        (state, action: PayloadAction<GetProductCategoriesResponse>) => {
          state.loading = false;
          state.categories = action.payload.data || [];
        }
      )
      .addCase(getProductCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetProductCategoriesState } = productCategoriesSlice.actions;

// Export reducer
export default productCategoriesSlice.reducer;
