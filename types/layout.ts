// Layout configuration types for the dynamic layout system

export type LayoutPreset = "website" | "dashboard" | "portal" | "blog" | "minimal";

export type HeaderHeight = "sm" | "md" | "lg";
export type SidebarPosition = "left" | "right";
export type SidebarVariant = "fixed" | "drawer" | "overlay";
export type SidebarWidth = "sm" | "md" | "lg" | "xl";
export type FooterVariant = "simple" | "detailed" | "minimal" | "social" | "centered" | "compact";
export type ContentMaxWidth = "full" | "container" | "prose";
export type ContentPadding = "none" | "sm" | "md" | "lg";
export type NavigationStyle = "horizontal" | "vertical" | "tabs" | "breadcrumb";
export type MobileMenuType = "drawer" | "dropdown" | "fullscreen";
export type MobileBreakpoint = "sm" | "md" | "lg" | "xl";

// Header configuration interface
export interface HeaderConfig {
  enabled: boolean;
  fixed: boolean;
  height: HeaderHeight;
  showLogo: boolean;
  showNavigation: boolean;
  showUserMenu: boolean;
  collapsible: boolean;
}

// Sidebar configuration interface
export interface SidebarConfig {
  enabled: boolean;
  position: SidebarPosition;
  variant: SidebarVariant;
  width: SidebarWidth;
  collapsible: boolean;
  defaultCollapsed: boolean;
  showOnMobile: boolean;
  mobileBreakpoint: MobileBreakpoint;
}

// Footer configuration interface
export interface FooterConfig {
  enabled: boolean;
  fixed: boolean;
  variant: FooterVariant;
  showOnMobile: boolean;
}

// Content configuration interface
export interface ContentConfig {
  maxWidth: ContentMaxWidth;
  padding: ContentPadding;
  centered: boolean;
}

// Navigation configuration interface
export interface LayoutNavigationConfig {
  style: NavigationStyle;
  showBreadcrumbs: boolean;
  mobileMenuType: MobileMenuType;
}

// Responsive configuration interface
export interface ResponsiveConfig {
  mobileFirst: boolean;
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

// Main layout configuration interface
export interface LayoutConfiguration {
  header: HeaderConfig;
  sidebar: SidebarConfig;
  footer: FooterConfig;
  content: ContentConfig;
  navigation: LayoutNavigationConfig;
  responsive: ResponsiveConfig;
}

// Runtime layout state interface
export interface LayoutRuntimeState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  isLoading: boolean;
}

// Computed layout values interface
export interface LayoutComputedValues {
  showHeader: boolean;
  showSidebar: boolean;
  showFooter: boolean;
  sidebarWidth: string;
  headerHeight: string;
  contentClasses: string;
  isMobile: boolean;
}

// Layout context interface
export interface LayoutContextInterface {
  // Configuration
  config: LayoutConfiguration;
  updateConfig: (updates: Partial<LayoutConfiguration>) => void;
  resetConfig: () => void;

  // Runtime state
  state: LayoutRuntimeState;
  updateState: (updates: Partial<LayoutRuntimeState>) => void;

  // Computed values
  computed: LayoutComputedValues;

  // Actions
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Presets
  applyPreset: (preset: LayoutPreset) => void;
}

// Navigation item interface
export interface NavigationItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavigationItem[];
}

// Layout component props
export interface LayoutComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Export utility types
export type LayoutConfigUpdate = Partial<LayoutConfiguration>;
export type LayoutStateUpdate = Partial<LayoutRuntimeState>;

// CSS class mapping types
export type SidebarWidthClasses = Record<SidebarWidth, string>;
export type HeaderHeightClasses = Record<HeaderHeight, string>;
export type ContentPaddingClasses = Record<ContentPadding, string>;

// Layout preset configurations
export type LayoutPresetConfig = Record<LayoutPreset, Partial<LayoutConfiguration>>;

// Centralized layout presets configuration
export const LAYOUT_PRESETS: LayoutPresetConfig = {
  website: {
    header: {
      enabled: true,
      fixed: false,
      height: "md",
      showLogo: true,
      showNavigation: true,
      showUserMenu: true,
      collapsible: true,
    },
    sidebar: {
      enabled: false,
      position: "left",
      variant: "fixed",
      width: "md",
      collapsible: true,
      defaultCollapsed: false,
      showOnMobile: false,
      mobileBreakpoint: "md",
    },
    footer: {
      enabled: true,
      fixed: false,
      variant: "detailed",
      showOnMobile: true,
    },
    content: {
      maxWidth: "container",
      padding: "md",
      centered: true,
    },
  },
  dashboard: {
    header: {
      enabled: true,
      fixed: true,
      height: "md",
      showLogo: true,
      showNavigation: true,
      showUserMenu: true,
      collapsible: true,
    },
    sidebar: {
      enabled: true,
      position: "left",
      variant: "fixed",
      width: "md",
      collapsible: true,
      defaultCollapsed: false,
      showOnMobile: false,
      mobileBreakpoint: "md",
    },
    footer: {
      enabled: false,
      fixed: false,
      variant: "simple",
      showOnMobile: false,
    },
    content: {
      maxWidth: "full",
      padding: "md",
      centered: false,
    },
  },
  portal: {
    header: {
      enabled: true,
      fixed: true,
      height: "lg",
      showLogo: true,
      showNavigation: true,
      showUserMenu: true,
      collapsible: true,
    },
    sidebar: {
      enabled: true,
      position: "left",
      variant: "drawer",
      width: "lg",
      collapsible: true,
      defaultCollapsed: false,
      showOnMobile: true,
      mobileBreakpoint: "md",
    },
    footer: {
      enabled: true,
      fixed: false,
      variant: "minimal",
      showOnMobile: true,
    },
    content: {
      maxWidth: "full",
      padding: "lg",
      centered: false,
    },
  },
  blog: {
    header: {
      enabled: true,
      fixed: false,
      height: "md",
      showLogo: true,
      showNavigation: false,
      showUserMenu: false,
      collapsible: true,
    },
    sidebar: {
      enabled: false,
      position: "left",
      variant: "fixed",
      width: "md",
      collapsible: true,
      defaultCollapsed: false,
      showOnMobile: false,
      mobileBreakpoint: "md",
    },
    footer: {
      enabled: true,
      fixed: false,
      variant: "simple",
      showOnMobile: true,
    },
    content: {
      maxWidth: "prose",
      padding: "lg",
      centered: true,
    },
  },
  minimal: {
    header: {
      enabled: false,
      fixed: false,
      height: "md",
      showLogo: false,
      showNavigation: false,
      showUserMenu: false,
      collapsible: false,
    },
    sidebar: {
      enabled: false,
      position: "left",
      variant: "fixed",
      width: "md",
      collapsible: false,
      defaultCollapsed: false,
      showOnMobile: false,
      mobileBreakpoint: "md",
    },
    footer: {
      enabled: false,
      fixed: false,
      variant: "simple",
      showOnMobile: false,
    },
    content: {
      maxWidth: "full",
      padding: "md",
      centered: true,
    },
  },
};

// CSS class mapping constants
export const SIDEBAR_WIDTH_CLASSES: SidebarWidthClasses = {
  sm: "w-48",
  md: "w-64",
  lg: "w-72",
  xl: "w-80",
};

export const HEADER_HEIGHT_CLASSES: HeaderHeightClasses = {
  sm: "h-12",
  md: "h-16",
  lg: "h-20",
};

export const CONTENT_PADDING_CLASSES: ContentPaddingClasses = {
  none: "",
  sm: "p-2",
  md: "p-4 md:p-6",
  lg: "p-6 md:p-8",
};

// Numeric width values for calculations
export const SIDEBAR_WIDTH_VALUES = {
  sm: 192,
  md: 256,
  lg: 288,
  xl: 320,
  collapsed: 64,
} as const;

export default LayoutConfiguration;
