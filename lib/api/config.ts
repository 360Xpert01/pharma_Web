export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://floor-master-backend.vercel.app/api",
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      SIGNUP: "/auth/signup",
      VERIFY_OTP: "/auth/verify-otp",
      FORGOT_PASSWORD: "/auth/forgot-password",
      RESET_PASSWORD: "/auth/reset-password",
      REFRESH_TOKEN: "/auth/refresh-token",
    },
  },
} as const;

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};
