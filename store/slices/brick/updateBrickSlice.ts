import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { GeoUnitType } from "./createBrickSlice";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

interface UpdateBrickPayload {
  id: string;
  name: string;
  type: GeoUnitType;
  description?: string;
  brickCode?: string;
  latitude?: number;
  longitude?: number;
  parentId?: string;
}

interface UpdateBrickResponse {
  success: boolean;
  message: string;
}

interface UpdateBrickState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: UpdateBrickState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

// Async Thunk: Update Brick (PUT /api/v1/brick/update)
export const updateBrick = createAsyncThunk<
  UpdateBrickResponse,
  UpdateBrickPayload,
  { rejectValue: string }
>("brick/updateBrick", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("No session found. Please login again.");
    }

    const typeToPlural: Record<GeoUnitType, string> = {
      zone: "zones",
      region: "regions",
      brick: "bricks",
    };

    const { type, id, name, description } = payload;

    // Send flat object with only name and description as requested/required
    const requestBody = {
      name,
      description,
    };

    const response = await axios.put<UpdateBrickResponse>(
      `${baseUrl}api/v1/brick/${id}`,
      requestBody,
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
      "Failed to update brick. Please try again.";

    return rejectWithValue(errorMessage);
  }
});

const updateBrickSlice = createSlice({
  name: "updateBrick",
  initialState,
  reducers: {
    resetUpdateBrickState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBrick.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(updateBrick.fulfilled, (state, action: PayloadAction<UpdateBrickResponse>) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Brick updated successfully!";
      })
      .addCase(updateBrick.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetUpdateBrickState } = updateBrickSlice.actions;
export default updateBrickSlice.reducer;
