const loading = {
  // Brand text that appears in all loaders
  BRAND_TEXT: "Next Boiler",

  // Default loading messages by context
  MESSAGES: {
    DEFAULT: "Next Boiler",
    DASHBOARD: "Loading Dashboard...",
    CHARTS: "Loading Charts...",
    DATA: "Loading Data...",
    PROFILE: "Loading Profile...",
    SETTINGS: "Loading Settings...",
    AUTH: "Authenticating...",
    UPLOAD: "Uploading Files...",
    SAVE: "Saving Changes...",
    DELETE: "Deleting Item...",
    EXPORT: "Exporting Data...",
    SYNC: "Synchronizing...",
    PROCESSING: "Processing Request...",
    CONNECTING: "Establishing Connection...",
    REFRESHING: "Refreshing Data...",
    SEARCHING: "Searching...",
    ANALYZING: "Analyzing Data...",
    GENERATING: "Generating Report...",
    VALIDATING: "Validating Input...",
    INITIALIZING: "Initializing Application...",
  },

  // Common loading text
  TEXT: {
    LOADING_CHARTS: "Loading charts...",
    LOADING_METRICS: "Loading Next Boiler metrics...",
    FROM_LAST_MONTH: "% from last month",
  },

  // Loading durations for different operations (in milliseconds)
  DURATIONS: {
    QUICK: 500, // Button states, simple operations
    NORMAL: 1500, // Form submissions, API calls
    SLOW: 3000, // File uploads, heavy processing
    VERY_SLOW: 5000, // Large data imports, complex operations
  },

  // Loader variants by use case
  VARIANTS: {
    OVERLAY: "default", // Full screen overlays
    INLINE: "minimal", // In-component loading
    BUTTON: "dots", // Button loading states
    CARD: "default", // Card loading states
    TABLE: "minimal", // Table/list loading
    CHART: "default", // Chart loading
    FORM: "minimal", // Form loading
    MODAL: "default", // Modal loading
  },

  // Sizes by context
  SIZES: {
    SMALL: "sm", // Button loading, inline elements
    MEDIUM: "md", // Cards, modals
    LARGE: "lg", // Full page, overlays
  },

  // Themed loading colors (CSS custom properties)
  THEME_COLORS: {
    PRIMARY: "hsl(var(--primary))",
    SECONDARY: "hsl(var(--secondary))",
    ACCENT: "hsl(var(--accent))",
    MUTED: "hsl(var(--muted))",
  },
} as const;

export default loading;
export type LoadingMessages = typeof loading;
