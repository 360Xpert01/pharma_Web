import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { uploadImageFile, UploadResponse, UploadedFile, UploadError } from "@/utils/uploadImage";

interface UploadState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  uploadedFiles: UploadedFile[];
  totalUploaded: number;
  totalFailed: number;
  uploadErrors: UploadError[];
}

// Initial State
const initialState: UploadState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  uploadedFiles: [],
  totalUploaded: 0,
  totalFailed: 0,
  uploadErrors: [],
};

// Async Thunk: Upload Image (POST request)
export const uploadImageAction = createAsyncThunk<
  UploadResponse,
  File,
  { rejectValue: { message: string; status?: number } }
>("upload/uploadImage", async (file, { rejectWithValue }) => {
  try {
    const response = await uploadImageFile(file);
    return response;
  } catch (error: any) {
    console.error("uploadImageAction thunk error:", error);
    return rejectWithValue({
      message: error.message || "Failed to upload image. Please try again.",
    });
  }
});

// Slice
const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.uploadedFiles = [];
      state.totalUploaded = 0;
      state.totalFailed = 0;
      state.uploadErrors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImageAction.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(uploadImageAction.fulfilled, (state, action: PayloadAction<UploadResponse>) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.uploadedFiles = action.payload.data.files;
        state.totalUploaded = action.payload.data.totalUploaded;
        state.totalFailed = action.payload.data.totalFailed;
        state.uploadErrors = action.payload.data.errors;
      })
      .addCase(uploadImageAction.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

// Export actions
export const { resetUploadState } = uploadSlice.actions;

// Export reducer
export default uploadSlice.reducer;
