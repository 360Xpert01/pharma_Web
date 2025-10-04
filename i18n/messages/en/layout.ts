const layout = {
  // Header component
  header: {
    logoText: "Dashboard",
    toggleSidebarLabel: "Toggle sidebar",
    toggleMobileNavLabel: "Toggle mobile navigation",
  },

  // Sidebar component
  sidebar: {
    collapseLabel: "Collapse sidebar",
    expandLabel: "Expand sidebar",
    navigationLabel: "Main navigation",
  },

  // Footer component
  footer: {
    copyright: "© 2024 Dashboard. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contact: "Contact",
    companyName: "Next Starter",
    companyDescription:
      "A modern Next.js starter template with TypeScript, Tailwind CSS, and more.",
    allRightsReserved: "All rights reserved",
    quickLinksTitle: "Quick Links",
    resourcesTitle: "Resources",
  },

  // Theme toggle component
  theme: {
    toggleLabel: "Toggle theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    systemMode: "System mode",
  },

  // User profile component
  profile: {
    profileLabel: "User profile",
    accountSettings: "Account Settings",
    preferences: "Preferences",
    logout: "Logout",
    logoutConfirm: "Are you sure you want to logout?",
    cancel: "Cancel",
    confirm: "Confirm",
  },

  // Mobile menu component
  mobileMenu: {
    closeLabel: "Close menu",
    navigation: "Navigation",
    settings: "Settings",
  },

  // Navigation items
  navigation: {
    dashboard: "Dashboard",
    analytics: "Analytics",
    reports: "Reports",
    settings: "Settings",
    users: "Users",
    profile: "Profile",
    help: "Help",
    documentation: "Documentation",
  },
} as const;

export default layout;
export type LayoutMessages = typeof layout;
