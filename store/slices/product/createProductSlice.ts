import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface ProductSku {
  sku: string;
  quantity: number;
}

interface CreateProductPayload {
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

interface CreatedProduct {
  pulseCode: string;
  productCode: string;
  name: string;
  productCategoryId: string;
  productFormula: string;
  imageUrl: string | null;
  description: string;
  status: string;
  productSkus: ProductSku[];
  id?: string;
  createdAt?: string;
}

// The API returns an array of created products
type CreateProductResponse = CreatedProduct[];

interface ProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdProduct: CreatedProduct | null;
  status: number | null;
}

// Initial State
const initialState: ProductState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdProduct: null,
  status: null,
};

// Async Thunk: Create Product (POST request)
export const createProduct = createAsyncThunk<
  CreateProductResponse,
  CreateProductPayload,
  { rejectValue: { message: string; status?: number } }
>("product/createProduct", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue({ message: "No session found. Please login again." });
    }

    // Transform payload to handle null/empty values strictly matching the requested schema
    const transformedPayload: any = {
      pulseCode: payload.pulseCode,
      productCode: payload.productCode,
      name: payload.name,
      productCategoryId: payload.productCategoryId,
      productFormula: payload.productFormula,
      description: payload.description,
      status: payload.status,
      productSkus: payload.productSkus,
    };

    // Only include imageUrl if it's within length limits (API limit is 1000 chars)
    if (payload.imageUrl && payload.imageUrl.length <= 1000) {
      transformedPayload.imageUrl = payload.imageUrl;
    }

    console.log("createProduct thunk started with payload:", [transformedPayload]);

    const response = await axios.post<CreateProductResponse>(
      `${baseUrl || "https://api.ceturo.com/"}api/v1/product`,
      [transformedPayload], // API expects an array of product objects
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("createProduct API response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("createProduct thunk error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create product. Please try again.";

    return rejectWithValue({
      message: errorMessage,
      status: error.response?.status,
    });
  }
});

// Slice
const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdProduct = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
        state.status = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<CreateProductResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = "Product created successfully!";
        state.createdProduct = action.payload[0] || null;
        state.status = 200;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Something went wrong";
        state.status = action.payload?.status || null;
      });
  },
});

// Export actions
export const { resetProductState } = createProductSlice.actions;

// Export reducer
export default createProductSlice.reducer;
