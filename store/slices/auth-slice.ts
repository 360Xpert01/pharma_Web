import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/user";
import type { AuthFlowState, AuthState, AuthFlowStep } from "@/app/[locale]/auth/types";

const initialState: AuthState = {
  token: null,
  user: null,
  flow: {
    step: "idle",
    canAccessOtp: false,
    canAccessReset: false,
  },
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.flow = { ...initialState.flow };
    },
    clearSession(state) {
      state.token = null;
      state.user = null;
      state.flow = { ...initialState.flow };
    },
    setFlowStep(
      state,
      action: PayloadAction<{ step: AuthFlowStep; email?: string; resetToken?: string }>
    ) {
      state.flow.step = action.payload.step;
      if (action.payload.email) state.flow.email = action.payload.email;
      if (action.payload.resetToken) state.flow.resetToken = action.payload.resetToken;

      // Set access permissions based on flow step
      state.flow.canAccessOtp = action.payload.step === "awaiting-otp";
      state.flow.canAccessReset = action.payload.step === "reset-password";
    },
    clearFlow(state) {
      state.flow = { ...initialState.flow };
    },
  },
});

export const authActions = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (s: { auth: AuthState }) => Boolean(s.auth.token);
export const selectUser = (s: { auth: AuthState }) => s.auth.user;
export const selectToken = (s: { auth: AuthState }) => s.auth.token;
