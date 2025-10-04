const error = {
  // 404 Not Found page
  notFound: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    heading: "404",
    primaryButton: "Go Home",
    secondaryButton: "Go Back",
    refreshButton: "Refresh",
    searchTitle: "Popular Pages",
    autoRedirectMessage: "Redirecting to home page in {count} seconds...",
    cancelRedirect: "Cancel",
    supportText: "If you believe this is an error, please",
    contactSupport: "contact support",
  },

  // Global Error page
  globalError: {
    title: "Something went wrong!",
    description: "An unexpected error occurred",
    subtitle: "An unexpected error occurred. Our team has been notified and will investigate.",
    tryAgainButton: "Try Again",
    goHomeButton: "Go Home",
    errorDetailsTitle: "Error Details (Development)",
    errorIdLabel: "Error ID:",
    notifiedMessage: "Our team has been notified and will investigate.",
  },

  // Common error actions
  actions: {
    retry: "Try Again",
    goHome: "Go Home",
    goBack: "Go Back",
    refresh: "Refresh",
    reload: "Reload",
    contactSupport: "Contact Support",
    reportIssue: "Report Issue",
  },

  // Error status messages
  status: {
    loading: "Loading...",
    retrying: "Retrying...",
    redirecting: "Redirecting...",
    notified: "Team notified",
    investigating: "Under investigation",
  },
} as const;

export default error;
export type ErrorMessages = typeof error;
