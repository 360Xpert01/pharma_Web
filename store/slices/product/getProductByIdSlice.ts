import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface ProductSku {
  sku: string;
  quantity: number;
}

export interface ProductDetail {
  id: string;
  pulseCode: string;
  productCode: string;
  name: string;
  productCategoryId: string;
  productCategory?: string;
  productFormula: string;
  imageUrl: string | null;
  description: string;
  status: string;
  productSkus: ProductSku[];
  createdAt?: string;
  updatedAt?: string;
}

interface GetProductByIdState {
  loading: boolean;
  success: boolean;
  error: string | null;
  product: ProductDetail | null;
}

// Initial State
const initialState: GetProductByIdState = {
  loading: false,
  success: false,
  error: null,
  product: null,
};

// Async Thunk: Get Product By ID
export const getProductById = createAsyncThunk<ProductDetail, string, { rejectValue: string }>(
  "product/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("userSession");
      if (!token) {
        return rejectWithValue("No session found. Please login again.");
      }

      const response = await axios.get<{ success: boolean; data: ProductDetail; message: string }>(
        `${baseUrl || "https://api.ceturo.com/"}api/v1/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extract the product data from the response
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch product. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const getProductByIdSlice = createSlice({
  name: "productById",
  initialState,
  reducers: {
    resetProductByIdState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<ProductDetail>) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load product";
        state.product = null;
      });
  },
});

// Export actions
export const { resetProductByIdState } = getProductByIdSlice.actions;

// Export reducer
export default getProductByIdSlice.reducer;
