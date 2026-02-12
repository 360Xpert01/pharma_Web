import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// Types
export type GeoUnitType = "zone" | "region" | "brick";

export interface CreateBrickPayload {
  name: string;
  type: GeoUnitType;
  parentId?: string;
  brickCode?: string;
  latitude?: number;
  longitude?: number;
  id?: string;
  zoneId?: string;
  regionId?: string;
}

interface CreatedBrick {
  id: string;
  name: string;
  type: GeoUnitType;
  parentId?: string;
  brickCode?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
}

interface CreateBrickResponse {
  success: boolean;
  message: string;
  data: CreatedBrick;
}

interface CreateBrickState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  createdBrick: CreatedBrick | null;
}

// Initial State
const initialState: CreateBrickState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  createdBrick: null,
};

// Async Thunk: Create Brick (POST /api/v1/brick)
export const createBrick = createAsyncThunk<
  CreateBrickResponse,
  CreateBrickPayload,
  { rejectValue: string }
>("brick/createBrick", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    // Map GeoUnitType to its plural form for API payload wrapping
    const typeToPlural: Record<GeoUnitType, string> = {
      zone: "zones",
      region: "regions",
      brick: "bricks",
    };

    const { type, ...data } = payload;
    const pluralKey = typeToPlural[type];

    // Add fallback parent fields based on type for better backend compatibility
    const augmentedData = { ...data };
    if (payload.parentId) {
      if (type === "region") (augmentedData as any).zoneId = payload.parentId;
      if (type === "brick") (augmentedData as any).regionId = payload.parentId;
    }

    // Wrap the payload in the pluralized key as an array
    const transformedPayload = {
      [pluralKey]: [augmentedData],
    };

    const response = await axios.post<CreateBrickResponse>(
      `${baseUrl}api/v1/brick/create`,
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
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to create brick. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

// Slice
const createBrickSlice = createSlice({
  name: "createBrick",
  initialState,
  reducers: {
    resetCreateBrickState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.createdBrick = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrick.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(createBrick.fulfilled, (state, action: PayloadAction<CreateBrickResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Brick created successfully!";
        state.createdBrick = action.payload.data;
      })
      .addCase(createBrick.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export actions
export const { resetCreateBrickState } = createBrickSlice.actions;

// Export reducer
export default createBrickSlice.reducer;
