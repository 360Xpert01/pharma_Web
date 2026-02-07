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
  limit: 20,
};

// Pagination Parameters Type
interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  status?: string;
}

// Async Thunk: Get All Products (GET /api/v1/product)
export const getAllProducts = createAsyncThunk<
  GetProductsResponse,
  PaginationParams | void,
  { rejectValue: string }
>("products/getAllProducts", async (params, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    // Build query parameters
    const page = params && typeof params === "object" ? params.page || 1 : 1;
    const limit = params && typeof params === "object" ? params.limit || 20 : 20;
    const search = params && typeof params === "object" ? params.search || "" : "";
    const categoryId = params && typeof params === "object" ? params.categoryId || "" : "";
    const status = params && typeof params === "object" ? params.status || "" : "";

    // Build params object dynamically - only include non-empty values
    const queryParams: Record<string, any> = { page, limit, search };
    if (categoryId) queryParams.categoryId = categoryId;
    if (status) queryParams.status = status;

    const response = await axios.get<GetProductsResponse>(`${baseUrl}api/v1/product`, {
      params: queryParams,
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
});

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
      state.limit = 20;
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
