import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface ProductItem {
  id: string;
  pulseCode: string;
  productCode: string;
  name: string;
  productCategoryId: string;
  productCategory: string;
  productFormula: string;
  imageUrl: string;
  skuCount: number;
  productSkus: string[];
}

interface GetProductsResponse {
  success: boolean;
  data: ProductItem[];
  total: number;
  page: number;
  limit: number;
  message: string;
}

interface ProductsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  products: ProductItem[];
  total: number;
  page: number;
  limit: number;
}

// Initial State
const initialState: ProductsState = {
  loading: false,
  success: false,
  error: null,
  products: [],
  total: 0,
  page: 1,
  limit: 10,
};

// Async Thunk: Get All Products (GET /api/v1/product)
export const getAllProducts = createAsyncThunk<GetProductsResponse, void, { rejectValue: string }>(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<GetProductsResponse>(`${baseUrl}api/v1/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch products. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const getAllProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    resetProductsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.products = [];
      state.total = 0;
      state.page = 1;
      state.limit = 10;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<GetProductsResponse>) => {
        state.loading = false;
        state.success = true;
        state.products = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load products";
        state.products = [];
      });
  },
});

// Export actions
export const { resetProductsState } = getAllProductsSlice.actions;

// Export reducer
export default getAllProductsSlice.reducer;
