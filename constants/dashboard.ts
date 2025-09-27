export const DASHBOARD_CONSTANTS = {
  // Page Title and Meta
  TITLE: "Dashboard",
  DESCRIPTION: "Comprehensive dashboard with real-time metrics and analytics",
  
  // Metrics Cards
  METRICS: {
    TOTAL_USERS: "Total Users",
    ACTIVE_SESSIONS: "Active Sessions", 
    REVENUE: "Revenue",
    CONVERSION_RATE: "Conversion Rate",
    ORDERS: "Orders",
    GROWTH: "Growth",
    BOUNCE_RATE: "Bounce Rate",
    PAGE_VIEWS: "Page Views"
  },

  // Chart Titles
  CHARTS: {
    REVENUE_TREND: "Revenue Trend",
    USER_ACTIVITY: "User Activity",
    SALES_COMPARISON: "Sales Comparison",
    TRAFFIC_SOURCES: "Traffic Sources",
    PERFORMANCE_METRICS: "Performance Metrics",
    MONTHLY_SALES: "Monthly Sales",
    USER_DEMOGRAPHICS: "User Demographics",
    CONVERSION_FUNNEL: "Conversion Funnel"
  },

  // Data Table Headers
  TABLE_HEADERS: {
    NAME: "Name",
    EMAIL: "Email",
    STATUS: "Status",
    ROLE: "Role",
    CREATED_AT: "Created At",
    LAST_LOGIN: "Last Login",
    ACTIONS: "Actions",
    PRODUCT: "Product",
    PRICE: "Price",
    QUANTITY: "Quantity",
    TOTAL: "Total",
    DATE: "Date"
  },

  // Status Labels
  STATUS: {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    PENDING: "Pending",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    PROCESSING: "Processing"
  },

  // Button Labels
  BUTTONS: {
    VIEW_ALL: "View All",
    EXPORT: "Export",
    FILTER: "Filter",
    REFRESH: "Refresh",
    ADD_NEW: "Add New",
    EDIT: "Edit",
    DELETE: "Delete",
    SAVE: "Save",
    CANCEL: "Cancel"
  },

  // Section Titles
  SECTIONS: {
    OVERVIEW: "Overview",
    ANALYTICS: "Analytics", 
    RECENT_ACTIVITY: "Recent Activity",
    TOP_PRODUCTS: "Top Products",
    USER_MANAGEMENT: "User Management",
    SALES_DATA: "Sales Data",
    PERFORMANCE: "Performance",
    REPORTS: "Reports"
  },

  // Time Periods
  TIME_PERIODS: {
    TODAY: "Today",
    YESTERDAY: "Yesterday",
    LAST_7_DAYS: "Last 7 Days",
    LAST_30_DAYS: "Last 30 Days",
    THIS_MONTH: "This Month",
    LAST_MONTH: "Last Month",
    THIS_YEAR: "This Year"
  },

  // Chart Colors
  COLORS: {
    PRIMARY: "#3b82f6",
    SECONDARY: "#64748b",
    SUCCESS: "#10b981",
    WARNING: "#f59e0b",
    DANGER: "#ef4444",
    INFO: "#06b6d4",
    PURPLE: "#8b5cf6",
    PINK: "#ec4899"
  },

  // Notification Messages
  MESSAGES: {
    DATA_LOADED: "Data loaded successfully",
    DATA_ERROR: "Error loading data",
    REAL_TIME_CONNECTED: "Real-time updates connected",
    REAL_TIME_DISCONNECTED: "Real-time updates disconnected",
    EXPORT_SUCCESS: "Data exported successfully",
    SAVE_SUCCESS: "Changes saved successfully"
  },

  // Placeholders
  PLACEHOLDERS: {
    SEARCH: "Search...",
    SELECT_DATE: "Select date range",
    NO_DATA: "No data available",
    LOADING: "Next Boiler",
    SELECT_OPTION: "Select an option"
  }
} as const;

export type DashboardConstants = typeof DASHBOARD_CONSTANTS;