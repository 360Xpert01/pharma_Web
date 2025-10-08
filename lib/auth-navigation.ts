import { isAuthenticated } from "@/lib/auth-flow";

export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  OTP: "/auth/otp",
  FORGOT: "/auth/forgot",
  RESET: "/auth/reset",
  DASHBOARD: "/dashboard",
} as const;

export const getAuthRedirectUrl = (currentPath: string, locale: string = "en"): string => {
  const isLoggedIn = isAuthenticated();

  // If user is already authenticated and trying to access auth pages, redirect to dashboard
  if (isLoggedIn && currentPath.includes("/auth/")) {
    return `/${locale}/dashboard`;
  }

  // If user is not authenticated and trying to access protected pages, redirect to login
  if (!isLoggedIn && currentPath.includes("/dashboard")) {
    return `/${locale}/auth/login`;
  }

  return currentPath;
};

export const buildAuthUrl = (route: keyof typeof AUTH_ROUTES, locale: string = "en"): string => {
  return `/${locale}${AUTH_ROUTES[route]}`;
};
