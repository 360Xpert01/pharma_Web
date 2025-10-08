// Layout configuration types for the dynamic layout system

export type LayoutPreset = 'website' | 'dashboard' | 'portal' | 'blog' | 'minimal';

export type HeaderHeight = 'sm' | 'md' | 'lg';
export type SidebarPosition = 'left' | 'right';
export type SidebarVariant = 'fixed' | 'drawer' | 'overlay';
export type SidebarWidth = 'sm' | 'md' | 'lg' | 'xl';
export type FooterVariant = 'simple' | 'detailed' | 'minimal';
export type ContentMaxWidth = 'full' | 'container' | 'prose';
export type ContentPadding = 'none' | 'sm' | 'md' | 'lg';
export type NavigationStyle = 'horizontal' | 'vertical' | 'tabs' | 'breadcrumb';
export type MobileMenuType = 'drawer' | 'dropdown' | 'fullscreen';
export type MobileBreakpoint = 'sm' | 'md' | 'lg' | 'xl';

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
export interface NavigationConfig {
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
  navigation: NavigationConfig;
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

export default LayoutConfiguration;