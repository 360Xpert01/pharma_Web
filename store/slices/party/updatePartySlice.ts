import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CreatePartyPayload } from "./partySlicePost";
import { Party } from "./partygetId";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

interface UpdatePartyState {
  loading: boolean;
  success: boolean;
  error: string | null;
  updatedParty: Party | null;
}

const initialState: UpdatePartyState = {
  loading: false,
  success: false,
  error: null,
  updatedParty: null,
};

export const updateParty = createAsyncThunk<
  Party,
  { partyId: string; payload: CreatePartyPayload },
  { rejectValue: string }
>("party/updateParty", async ({ partyId, payload }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");

    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    const url = `${API_BASE_URL}api/v1/parties/${partyId}`;

    console.log(`Updating party: ${url}`);

    const response = await axios.put<{
      success: boolean;
      message?: string;
      data: Party;
    }>(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update party details");
    }

    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : error.message || "Failed to update party information";

    console.error("❌ Update party error:", errorMessage);
    return rejectWithValue(errorMessage);
  }
});

const updatePartySlice = createSlice({
  name: "updateParty",
  initialState,
  reducers: {
    resetUpdatePartyState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.updatedParty = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateParty.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateParty.fulfilled, (state, action: PayloadAction<Party>) => {
        state.loading = false;
        state.success = true;
        state.updatedParty = action.payload;
      })
      .addCase(updateParty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update party details";
      });
  },
});

export const { resetUpdatePartyState } = updatePartySlice.actions;
export default updatePartySlice.reducer;
