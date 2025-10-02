export const DASHBOARD_TEXTS = {
  // Page Title and Meta
  title: "Dashboard",
  description: "Comprehensive dashboard with real-time metrics and analytics",

  // Page sections
  sections: {
    metrics: "Analytics",
    metricsDescription: "Key performance metrics and statistics",
    charts: "Data Visualization",
    chartsDescription: "Interactive charts and data visualizations",
    dataLists: "Recent Activity",
    dataListsDescription: "Latest updates and activity logs",
  },

  // Buttons and actions
  actions: {
    refresh: "Refresh",
    loadingDemo: "Loading Demo",
    settings: "Settings",
    export: "Export",
    filter: "Filter",
    viewAll: "View All",
    configure: "Configure",
  },

  // Loading states
  loading: {
    refreshing: "Refreshing...",
    loadingCharts: "Loading charts...",
    loadingData: "Loading data...",
    processing: "Processing...",
  },

  // Success messages
  success: {
    refreshed: "Dashboard refreshed successfully",
    dataUpdated: "Data updated successfully",
    settingsSaved: "Settings saved successfully",
  },

  // Error messages
  errors: {
    refreshFailed: "Failed to refresh dashboard data",
    loadFailed: "Failed to load dashboard",
    connectionError: "Connection error occurred",
    dataError: "Error loading data",
  },

  // Metrics Cards
  metrics: {
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    revenue: "Revenue",
    conversionRate: "Conversion Rate",
    orders: "Orders",
    growth: "Growth",
    bounceRate: "Bounce Rate",
    pageViews: "Page Views",
    sessions: "Sessions",
    avgSessionDuration: "Avg Session Duration",
    newUsers: "New Users",
    returningUsers: "Returning Users",
  },

  // Chart Titles and Descriptions
  charts: {
    revenueTrend: {
      title: "Revenue Overview",
      description: "Monthly revenue and user growth",
      badge: "Updated",
    },
    userActivity: {
      title: "User Activity",
      description: "Daily active users and engagement",
    },
    salesComparison: {
      title: "Sales Performance",
      description: "Quarterly sales comparison",
    },
    trafficSources: {
      title: "Traffic Sources",
      description: "Website traffic by source",
    },
    performanceMetrics: {
      title: "Performance Metrics",
      description: "Key performance indicators",
    },
    conversionFunnel: {
      title: "Conversion Funnel",
      description: "User conversion journey",
    },
  },

  // Data Table
  table: {
    headers: {
      name: "Name",
      email: "Email",
      status: "Status",
      role: "Role",
      createdAt: "Created At",
      lastLogin: "Last Login",
      actions: "Actions",
      product: "Product",
      price: "Price",
      quantity: "Quantity",
      total: "Total",
      date: "Date",
      user: "User",
      activity: "Activity",
      time: "Time",
    },
    noData: "No data available",
    loading: "Loading...",
    error: "Failed to load data",
    empty: "No records found",
    rowsSelected: "rows selected",
  },

  // Status Labels
  status: {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
    processing: "Processing",
    verified: "Verified",
    suspended: "Suspended",
  },

  // Time periods for filtering
  timePeriods: {
    today: "Today",
    yesterday: "Yesterday",
    last7Days: "Last 7 Days",
    last30Days: "Last 30 Days",
    thisMonth: "This Month",
    lastMonth: "Last Month",
    thisYear: "This Year",
    lastYear: "Last Year",
    custom: "Custom Range",
  },

  // Chart colors
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#06b6d4",
    purple: "#8b5cf6",
    pink: "#ec4899",
  },

  // Notification messages
  notifications: {
    dataLoaded: "Data loaded successfully",
    dataError: "Error loading data",
    realTimeConnected: "Real-time updates connected",
    realTimeDisconnected: "Real-time updates disconnected",
    exportSuccess: "Data exported successfully",
    saveSuccess: "Changes saved successfully",
    updateAvailable: "New data available",
    connectionLost: "Connection lost, retrying...",
  },

  // Placeholders
  placeholders: {
    search: "Search...",
    selectDate: "Select date range",
    noData: "No data available",
    loading: "Loading...",
    selectOption: "Select an option",
    enterValue: "Enter value",
    chooseFile: "Choose file",
  },

  // Tooltips
  tooltips: {
    refresh: "Refresh dashboard data",
    export: "Export data to CSV",
    filter: "Filter results",
    settings: "Dashboard settings",
    fullscreen: "Toggle fullscreen",
    help: "Get help",
  },
} as const;

export type DashboardTexts = typeof DASHBOARD_TEXTS;

// For backward compatibility, also export as DASHBOARD_CONSTANTS
export const DASHBOARD_CONSTANTS = DASHBOARD_TEXTS;
