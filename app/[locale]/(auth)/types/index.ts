import type { User } from "@/types/user";

// Auth Flow States
export type AuthFlowStep = "idle" | "login" | "awaiting-otp";

export type AuthFlowState = {
  step: AuthFlowStep;
  email?: string;
  canAccessOtp: boolean;
};

// Auth State
export type AuthState = {
  token: string | null;
  user: User | null;
  flow: AuthFlowState;
};

// Form Types
export type LoginFormValues = {
  email: string;
};

export type OtpFormValues = {
  code: string;
};

// API Response Types
export type AuthResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type LoginResponse = AuthResponse<{
  token: string;
  user: User;
  requiresOtp?: boolean;
}>;

export type OtpResponse = AuthResponse<{
  token: string;
  user: User;
}>;

// Auth API Types
export type OtpVerification = {
  email: string;
  code: string;
};
