// Central index file for all constants
import { AUTH_TEXTS } from "./auth";
import { DASHBOARD_TEXTS, DASHBOARD_CONSTANTS } from "./dashboard";
import { LAYOUT_TEXTS } from "./layout";
import { SHARED_TEXTS } from "./shared";
import { FORM_TEXTS } from "./form";
import { HOME_TEXTS, ERROR_TEXTS } from "./pages";

// Re-export all constants
export { AUTH_TEXTS } from "./auth";
export { DASHBOARD_TEXTS, DASHBOARD_CONSTANTS } from "./dashboard";
export { LAYOUT_TEXTS } from "./layout";
export { SHARED_TEXTS } from "./shared";
export { FORM_TEXTS } from "./form";
export { HOME_TEXTS, ERROR_TEXTS } from "./pages";

// Re-export existing constants for backward compatibility
export * from "./keys";
export * from "./loading";

// Consolidated constants for easy importing
export const CONSTANTS = {
  AUTH: AUTH_TEXTS,
  DASHBOARD: DASHBOARD_TEXTS,
  LAYOUT: LAYOUT_TEXTS,
  SHARED: SHARED_TEXTS,
  FORM: FORM_TEXTS,
  HOME: HOME_TEXTS,
  ERROR: ERROR_TEXTS,
} as const;

// Type exports
export type { DashboardTexts } from "./dashboard";

// Common constants that might be shared across multiple components
export const COMMON_CONSTANTS = {
  APP_NAME: "Dashboard",
  APP_VERSION: "1.0.0",
  COMPANY_NAME: "Your Company",
  SUPPORT_EMAIL: "support@yourcompany.com",

  // Common time formats
  DATE_FORMATS: {
    SHORT: "MMM dd, yyyy",
    LONG: "MMMM dd, yyyy",
    FULL: "EEEE, MMMM dd, yyyy",
    ISO: "yyyy-MM-dd",
    TIME: "HH:mm",
    DATETIME: "MMM dd, yyyy HH:mm",
  },

  // Common breakpoints (if needed for consistent responsive behavior)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
  },

  // Animation durations (if needed for consistent animations)
  ANIMATIONS: {
    FAST: 150,
    DEFAULT: 300,
    SLOW: 500,
  },
} as const;
