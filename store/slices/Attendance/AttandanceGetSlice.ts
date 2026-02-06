import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Attendance record ka type (tumhare API response ke mutabiq adjust kar lena)
interface AttendanceRecord {
  id: number | string;
  employeeId: string; // ya userId
  employeeName?: string;
  date: string; // e.g. "2026-02-05"
  status: "present" | "absent" | "late" | "leave";
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
}

interface AttendanceState {
  list: AttendanceRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  list: [],
  loading: false,
  error: null,
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Async thunk: userId ke saath attendance list fetch karo
// userId required hai (agar optional chahiye to | void add kar dena)
export const fetchAttendanceList = createAsyncThunk<
  AttendanceRecord[], // success pe return type
  { userId: string; from: string; to: string }, // input: userId, from, to
  { rejectValue: string }
>("attendance/fetchListByUserId", async ({ userId, from, to }, { rejectWithValue }) => {
  try {
    const sessionStr = localStorage.getItem("userSession");
    // GET request with query param ?userId=...
    const response = await axios.get(`${baseUrl}api/v1/attendance/list`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStr}`,
      },
      params: {
        userId,
        from,
        to,
      },
    });

    // API response adjust karo (common patterns)
    // agar response.data.attendance ya response.data.data array hai
    return response.data.data || response.data.attendance || response.data;
  } catch (err: any) {
    const message =
      err.response?.data?.message || err.message || "User ki attendance list load nahi ho saki";
    return rejectWithValue(message);
  }
});

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    resetAttendance: (state) => {
      state.list = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAttendanceList.fulfilled,
        (state, action: PayloadAction<AttendanceRecord[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchAttendanceList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;

// Selectors
export const selectAttendanceList = (state: { attendance: AttendanceState }) =>
  state.attendance.list;
export const selectAttendanceLoading = (state: { attendance: AttendanceState }) =>
  state.attendance.loading;
export const selectAttendanceError = (state: { attendance: AttendanceState }) =>
  state.attendance.error;
