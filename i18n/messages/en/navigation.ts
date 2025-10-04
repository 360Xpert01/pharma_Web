const navigation = {
  // Main navigation items
  main: {
    home: "Home",
    dashboard: "Dashboard",
    settings: "Settings",
    profile: "Profile",
    help: "Help",
    about: "About",
    contact: "Contact",
    documentation: "Documentation",
    site: "Site",
    layout: "Layout",
    layoutSettings: "Layout Settings",
  },

  // Dashboard navigation
  dashboard: {
    overview: "Overview",
    analytics: "Analytics",
    reports: "Reports",
    users: "Users",
    settings: "Settings",
    activity: "Activity",
    notifications: "Notifications",
    content: "Content",
  },

  // Auth navigation
  auth: {
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    forgotPassword: "Forgot Password",
    resetPassword: "Reset Password",
    profile: "Profile",
    account: "Account",
  },

  // Footer navigation
  footer: {
    privacy: "Privacy",
    privacyPolicy: "Privacy Policy",
    terms: "Terms",
    termsOfService: "Terms of Service",
    contact: "Contact",
    about: "About",
    github: "GitHub",
    twitter: "Twitter",
    linkedin: "LinkedIn",
    support: "Support",
    documentation: "Documentation",
    changelog: "Changelog",
  },

  // Breadcrumb labels
  breadcrumbs: {
    home: "Home",
    dashboard: "Dashboard",
    current: "Current",
  },

  // Menu labels and actions
  labels: {
    menu: "Menu",
    close: "Close",
    expand: "Expand",
    collapse: "Collapse",
    toggle: "Toggle",
    open: "Open",
    moreOptions: "More options",
    navigation: "Navigation",
    navigationLabel: "Dashboard",
    toggleMobileNav: "Toggle mobile navigation",
    toggleSidebar: "Toggle sidebar",
    collapseSidebar: "Collapse sidebar",
    expandSidebar: "Expand sidebar",
  },

  // Layout navigation references
  layout: {
    variant: "Variant",
    width: "Width",
    logoText: "Next Starter",
  },

  // Route titles and descriptions that match the config
  routes: {
    "/dashboard": {
      title: "Dashboard",
      description: "Dashboard overview",
    },
    "/": {
      title: "Site",
      description: "Visit main site",
    },
    "/dashboard/layout-settings": {
      title: "Layout",
      description: "Configure layout",
    },
    "/dashboard/settings": {
      title: "Settings",
      description: "Application settings",
    },
    "/dashboard/analytics": {
      title: "Analytics",
      description: "View analytics and metrics",
    },
    "/dashboard/users": {
      title: "Users",
      description: "Manage users and permissions",
    },
    "/dashboard/content": {
      title: "Content",
      description: "Manage content and resources",
    },
    "/help": {
      title: "Help",
      description: "Get help and support",
    },
    "/privacy": {
      title: "Privacy",
      description: "Privacy policy",
    },
    "/terms": {
      title: "Terms",
      description: "Terms of service",
    },
    "/contact": {
      title: "Contact",
      description: "Contact us",
    },
    "/about": {
      title: "About",
      description: "About us",
    },
    "/docs": {
      title: "Documentation",
      description: "View documentation",
    },
    "/support": {
      title: "Support",
      description: "Get support",
    },
    "/changelog": {
      title: "Changelog",
      description: "View changelog",
    },
  },

  // Badge labels
  badges: {
    new: "New",
    demo: "Demo",
    live: "Live",
    updated: "Updated",
  },
} as const;

export default navigation;
export type NavigationMessages = typeof navigation;
