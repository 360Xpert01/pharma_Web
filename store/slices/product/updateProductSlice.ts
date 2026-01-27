import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface ProductSku {
  sku: string;
  quantity: number;
}

interface UpdateProductPayload {
  id: string; // Product ID for the URL
  pulseCode: string;
  productCode: string;
  name: string;
  productCategoryId: string;
  productFormula: string;
  imageUrl?: string | null;
  description: string;
  status: "active" | "inactive";
  productSkus: ProductSku[];
}

interface UpdatedProduct {
  id: string;
  pulseCode: string;
  productCode: string;
  name: string;
  productCategoryId: string;
  productFormula: string;
  imageUrl: string | null;
  description: string;
  status: string;
  productSkus: ProductSku[];
  createdAt?: string;
  updatedAt?: string;
}

interface UpdateProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  updatedProduct: UpdatedProduct | null;
  status: number | null;
}

// Initial State
const initialState: UpdateProductState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  updatedProduct: null,
  status: null,
};

// Async Thunk: Update Product (PUT request)
export const updateProduct = createAsyncThunk<
  UpdatedProduct,
  UpdateProductPayload,
  { rejectValue: { message: string; status?: number } }
>("product/updateProduct", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue({ message: "No session found. Please login again." });
    }

    // Extract id from payload and prepare request body
    const { id, ...productData } = payload;

    // Transform payload to handle null/empty values
    const transformedPayload: any = {
      pulseCode: productData.pulseCode,
      productCode: productData.productCode,
      name: productData.name,
      productCategoryId: productData.productCategoryId,
      productFormula: productData.productFormula,
      description: productData.description,
      status: productData.status,
      productSkus: productData.productSkus,
    };

    // Only include imageUrl if it's within length limits (API limit is 1000 chars)
    if (productData.imageUrl && productData.imageUrl.length <= 1000) {
      transformedPayload.imageUrl = productData.imageUrl;
    }

    console.log("updateProduct thunk started with payload:", transformedPayload);

    const response = await axios.put<UpdatedProduct>(
      `${baseUrl || "https://api.ceturo.com/"}api/v1/product/${id}`,
      transformedPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("updateProduct thunk error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to update product. Please try again.";

    return rejectWithValue({
      message: errorMessage,
      status: error.response?.status,
    });
  }
});

// Slice
const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    resetUpdateProductState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.updatedProduct = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
        state.status = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<UpdatedProduct>) => {
        state.loading = false;
        state.success = true;
        state.message = "Product updated successfully!";
        state.updatedProduct = action.payload;
        state.status = 200;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Something went wrong";
        state.status = action.payload?.status || null;
      });
  },
});

// Export actions
export const { resetUpdateProductState } = updateProductSlice.actions;

// Export reducer
export default updateProductSlice.reducer;
