import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Types
interface ProductCategory {
  id: string;
  name: string;
  pulseCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GetProductCategoriesResponse {
  success: boolean;
  message: string;
  data: ProductCategory[];
}

interface ProductCategoriesState {
  productCategories: ProductCategory[];
  loading: boolean;
  success: boolean;
  error: string | null;
}

// Initial State
const initialState: ProductCategoriesState = {
  productCategories: [],
  loading: false,
  success: false,
  error: null,
};

// Async Thunk: Get All Product Categories (GET request)
export const getAllProductCategories = createAsyncThunk<
  GetProductCategoriesResponse,
  void,
  { rejectValue: string }
>("productCategory/getAllProductCategories", async (_, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    if (!sessionStr) {
      return rejectWithValue("No session found. Please login again.");
    }

    const response = await axios.get<GetProductCategoriesResponse>(
      `${baseUrl}api/v1/product-category/all`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStr}`,
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
const getAllProductCategoriesSlice = createSlice({
  name: "allProductCategories",
  initialState,
  reducers: {
    resetProductCategoriesState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.productCategories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProductCategories.fulfilled,
        (state, action: PayloadAction<GetProductCategoriesResponse>) => {
          state.loading = false;
          state.success = true;
          state.productCategories = action.payload.data;
        }
      )
      .addCase(getAllProductCategories.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to fetch product categories";
      });
  },
});

// Export actions
export const { resetProductCategoriesState } = getAllProductCategoriesSlice.actions;

// Export reducer
export default getAllProductCategoriesSlice.reducer;
