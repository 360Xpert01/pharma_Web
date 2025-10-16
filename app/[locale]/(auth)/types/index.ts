import type { User } from "@/types/user";

// Auth Flow States
export type AuthFlowStep = "idle" | "login" | "awaiting-otp" | "forgot-password" | "reset-password";

export type AuthFlowState = {
  step: AuthFlowStep;
  email?: string;
  resetToken?: string;
  canAccessOtp: boolean;
  canAccessReset: boolean;
};

export type AuthFlowData = {
  step: AuthFlowStep;
  email?: string;
  resetToken?: string;
  timestamp: number;
};

// Auth State
export type AuthState = {
  token: string | null;
  user: User | null;
  flow: AuthFlowState;
};

// Auth Session
export type AuthSession = {
  token: string;
  user: User;
};

// Form Types (inferred from validation schemas)
export type LoginFormValues = {
  email: string;
  password: string;
};

export type SignupFormValues = {
  email: string;
  password: string;
};

export type OtpFormValues = {
  code: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
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

export type SignupResponse = AuthResponse<{
  message: string;
}>;

export type OtpResponse = AuthResponse<{
  token: string;
  user: User;
}>;

export type ForgotPasswordResponse = AuthResponse<{
  message: string;
}>;

export type ResetPasswordResponse = AuthResponse<{
  message: string;
}>;

// Route Guard Props
export type AuthRouteGuardProps = {
  requiresFlow?: "otp" | "reset" | "forgot";
  redirectTo?: string;
  children: React.ReactNode;
};

// Auth API Types
export type AuthCredentials = {
  email: string;
  password: string;
};

export type OtpVerification = {
  email: string;
  code: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};
