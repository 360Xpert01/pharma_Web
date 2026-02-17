import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
export interface ProductSkuItem {
  id: string; // This will be the display ID
  productId: string;
  productSkuId: string; // The actual SKU ID (UUID) for API calls
  productName: string;
  sku: string | { sku: string; id: string };
  quantity: number;
  productCode?: string;
  imageUrl?: string;
}

interface GetProductSkusResponse {
  success: boolean;
  data: ProductSkuItem[];
  message?: string;
}

interface ProductSkusState {
  loading: boolean;
  success: boolean;
  error: string | null;
  productSkus: ProductSkuItem[];
}

// Initial State
const initialState: ProductSkusState = {
  loading: false,
  success: false,
  error: null,
  productSkus: [],
};

// Async Thunk: Get All Product SKUs
export const getAllProductSkus = createAsyncThunk<ProductSkuItem[], void, { rejectValue: string }>(
  "productSkus/getAllProductSkus",
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const sessionStr = localStorage.getItem("userSession");
      if (!sessionStr) {
        return rejectWithValue("No session found. Please login again.");
      }

      // Fetch all products with SKUs
      const response = await axios.get(`${baseUrl}api/v1/product`, {
        params: { limit: 1000 }, // Get all products
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
        },
      });

      // Extract and flatten all SKUs from products
      const products = response.data.data || [];
      const allSkus: ProductSkuItem[] = [];

      products.forEach((product: any) => {
        if (product.productSkus && Array.isArray(product.productSkus)) {
          product.productSkus.forEach((sku: any, index: number) => {
            const skuId = typeof sku === "object" && sku.id ? sku.id : `${product.id}-${index}`;
            allSkus.push({
              id: `${product.id}-${index}`, // Create a unique display ID
              productId: product.id,
              productSkuId: skuId, // The actual SKU ID (UUID)
              productName: product.name,
              sku: sku,
              quantity: 0,
              productCode: product.productCode,
              imageUrl: product.imageUrl,
            });
          });
        }
      });

      return allSkus;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch product SKUs. Please try again.";

      return rejectWithValue(errorMessage);
    }
  }
);

// Slice
const getAllProductSkusSlice = createSlice({
  name: "allProductSkus",
  initialState,
  reducers: {
    resetProductSkusState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.productSkus = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductSkus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductSkus.fulfilled, (state, action: PayloadAction<ProductSkuItem[]>) => {
        state.loading = false;
        state.success = true;
        state.productSkus = action.payload;
      })
      .addCase(getAllProductSkus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load product SKUs";
        state.productSkus = [];
      });
  },
});

// Export actions
export const { resetProductSkusState } = getAllProductSkusSlice.actions;

// Export reducer
export default getAllProductSkusSlice.reducer;

// Selectors
export const selectAllProductSkus = (state: { allProductSkus: ProductSkusState }) =>
  state.allProductSkus.productSkus;
export const selectProductSkusLoading = (state: { allProductSkus: ProductSkusState }) =>
  state.allProductSkus.loading;
export const selectProductSkusError = (state: { allProductSkus: ProductSkusState }) =>
  state.allProductSkus.error;
