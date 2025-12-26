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
  productFormula?: string | null;
  imageUrl?: string | null;
  description?: string | null;
  status: "active" | "inactive";
  productSkus: ProductSku[];
}

interface CreateProductResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    pulseCode: string;
    productCode: string;
    name: string;
    productCategoryId: string;
    productFormula: string | null;
    imageUrl: string | null;
    description: string | null;
    status: string;
    productSkus: ProductSku[];
    createdAt: string;
  };
}

interface ProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdProduct: any | null;
}

// Initial State
const initialState: ProductState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdProduct: null,
};

// Async Thunk: Create Product (POST request)
export const createProduct = createAsyncThunk<
  CreateProductResponse,
  CreateProductPayload,
  { rejectValue: string }
>("product/createProduct", async (payload, { rejectWithValue }) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    // Transform payload to handle null/empty values
    const transformedPayload: any = {
      pulseCode: payload.pulseCode,
      productCode: payload.productCode,
      name: payload.name,
      productCategoryId: payload.productCategoryId,
      productFormula: payload.productFormula || "",
      description: payload.description || "",
      status: payload.status,
      productSkus: payload.productSkus,
    };

    // Only include imageUrl if it's a valid URL
    if (payload.imageUrl && payload.imageUrl.startsWith("http")) {
      transformedPayload.imageUrl = payload.imageUrl;
    }

    const response = await axios.post<CreateProductResponse>(
      `${baseUrl}api/v1/product`,
      [transformedPayload], // API expects an array
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
      "Failed to create product. Please try again.";

    return rejectWithValue(errorMessage);
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<CreateProductResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Product created successfully!";
        state.createdProduct = action.payload.data || null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetProductState } = createProductSlice.actions;

// Export reducer
export default createProductSlice.reducer;
