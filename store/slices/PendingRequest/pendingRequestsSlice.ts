// src/features/auth/pendingRequestsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

// ────────────────────────────────────────────────
//                Type Definitions
// ────────────────────────────────────────────────

export interface PendingRequest {
  id: string;
  userId?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phoneNumber?: string;
  roleRequested?: string; // e.g. "sales_rep", "manager", "admin"
  status: "pending" | "approved" | "rejected" | "cancelled";
  requestedAt: string;
  reason?: string;
  companyName?: string;
  designation?: string;
  comments?: string;
  reviewedBy?: string;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt?: string;
  // Add more fields based on actual response
}

interface PendingRequestsState {
  loading: boolean;
  success: boolean;
  error: string | null;
  requests: PendingRequest[];
  total?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
}

const initialState: PendingRequestsState = {
  loading: false,
  success: false,
  error: null,
  requests: [],
  total: undefined,
  pagination: null,
};

// ────────────────────────────────────────────────
//                  Async Thunk
// ────────────────────────────────────────────────

export const fetchPendingRequests = createAsyncThunk<
  { items: PendingRequest[]; total?: number; pagination?: PendingRequestsState["pagination"] },
  { page?: number; limit?: number } | void,
  { rejectValue: string }
>("pendingRequests/fetchPendingRequests", async (params = {}, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("userSession");
    if (!token) {
      return rejectWithValue("Authentication token not found. Please login again.");
    }

    const page = params && "page" in params ? params.page || 1 : 1;
    const limit = params && "limit" in params ? params.limit || 20 : 20;

    const response = await axios.get(`${baseUrl}api/v1/auth/pending-requests`, {
      params: { page, limit },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = response.data;

    let items: PendingRequest[] = [];
    let total: number | undefined;
    let pagination: any = null;

    if (resData?.success) {
      items = resData.data || resData.data?.items || [];
      total = resData.data?.total || resData.total;
      pagination = resData.pagination || resData.data?.pagination || null;
    } else if (Array.isArray(resData)) {
      items = resData;
    } else if (resData?.items) {
      items = resData.items;
      total = resData.total;
      pagination = resData.pagination;
    }

    return { items, total, pagination };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to fetch pending requests.";

    return rejectWithValue(errorMessage);
  }
});

// ────────────────────────────────────────────────
//                     Slice
// ────────────────────────────────────────────────

const pendingRequestsSlice = createSlice({
  name: "pendingRequests",
  initialState,
  reducers: {
    clearPendingRequests: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.requests = [];
      state.total = undefined;
      state.pagination = null;
    },
    removeRequest: (state, action: PayloadAction<string>) => {
      state.requests = state.requests.filter((req) => req.id !== action.payload);
      if (state.total !== undefined) {
        state.total -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        fetchPendingRequests.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: PendingRequest[];
            total?: number;
            pagination?: PendingRequestsState["pagination"];
          }>
        ) => {
          state.loading = false;
          state.success = true;
          state.requests = action.payload.items;
          state.total = action.payload.total;
          state.pagination = action.payload.pagination || null;
        }
      )
      .addCase(fetchPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to load pending requests";
        state.requests = [];
      });
  },
});

export const { clearPendingRequests, removeRequest } = pendingRequestsSlice.actions;
export default pendingRequestsSlice.reducer;

// ────────────────────────────────────────────────
//                    Selectors
// ────────────────────────────────────────────────

export const selectPendingRequests = (state: any) => state.pendingRequests.requests;
export const selectPendingRequestsLoading = (state: any) => state.pendingRequests.loading;
export const selectPendingRequestsError = (state: any) => state.pendingRequests.error;
export const selectPendingRequestsPagination = (state: any) => state.pendingRequests.pagination;
export const selectPendingRequestsTotal = (state: any) => state.pendingRequests.total;
