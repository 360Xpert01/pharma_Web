const layout = {
  // Header component
  header: {
    logoText: "Dashboard", // Main app title shown beside the logo
    logoAlt: "Dashboard Logo", // Accessible alt text for logo
    goToHomeLabel: "Go to Home", // Used in aria-labels for accessibility
    toggleSidebarLabel: "Toggle sidebar", // Tooltip or aria label for sidebar toggle
    toggleMobileNavLabel: "Toggle mobile navigation", // Tooltip or aria label for mobile nav toggle
    toggleThemeLabel: "Toggle theme", // Optional: used by ThemeToggle if you want localization
    toggleLanguageLabel: "Change language", // Optional: for LanguageSwitcher accessibility
    navigationLinks: [
      { href: "/dashboard", title: "Dashboard", external: false },
      { href: "/projects", title: "Projects", external: false },
      { href: "/settings", title: "Settings", external: false },
      { href: "/help", title: "Help Center", external: false },
      { href: "https://docs.example.com", title: "Documentation", external: true },
    ],
    auth: {
      loginLabel: "Sign in",
      registerLabel: "Create account",
      profileLabel: "My Profile",
      logoutLabel: "Sign out",
      loadingLabel: "Loading user...",
    },
    sidebarVisibleLabel: "Sidebar expanded",
    sidebarHiddenLabel: "Sidebar collapsed",
    mobileNavOpenLabel: "Mobile navigation opened",
    mobileNavClosedLabel: "Mobile navigation closed",
    lastUpdatedLabel: "Last updated",
    userGreeting: "Welcome back",
    noNotifications: "You're all caught up!",
  },

  sidebar: {
    navigationLabel: "Main Navigation",
    collapseLabel: "Collapse sidebar",
    expandLabel: "Expand sidebar",
    items: [
      { href: "/", title: "Home" },
      { href: "/dashboard", title: "Dashboard" },
      { href: "/analytics", title: "Analytics" },
      { href: "/settings", title: "Settings" },
      { href: "/profile", title: "Profile" },
    ],
    layoutSettings: "Layout Settings",
    sidebarVariant: "Variant",
    sidebarWidth: "Width",
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
    documentation: "Documentation",
    support: "Support",
    changelog: "Changelog",
  },

  // Theme toggle component
  theme: {
    toggleLabel: "Toggle theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    oceanMode: "Ocean mode",
    systemMode: "System mode",
  },

  // User profile component
  profile: {
    profileLabel: "User profile",
    accountSettings: "Account Settings",
    preferences: "Preferences",
    profile: "Profile",
    settings: "Settings",
    help: "Help & Support",
    logout: "Logout",
    loggingOut: "Logging out...",
    logoutConfirm: "Are you sure you want to logout?",
    cancel: "Cancel",
    confirm: "Confirm",
    clickForOptions: "Click for options",
  },

  // Authentication section
  auth: {
    authSection: "Authentication",
    notLoggedIn: "Not logged in",
    loginRequired: "Please login to continue",
    guestUser: "Guest User",
  },

  // Mobile menu component
  mobileMenu: {
    closeLabel: "Close menu",
    navigation: "Navigation",
    settings: "Settings",
  },
} as const;

export default layout;
export type LayoutMessages = typeof layout;
