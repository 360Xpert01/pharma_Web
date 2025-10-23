import type {
  LayoutConfiguration,
  LayoutRuntimeState,
  LayoutComputedValues,
  SidebarWidth,
  HeaderHeight,
  ContentPadding,
} from "@/types/layout";
import {
  SIDEBAR_WIDTH_CLASSES,
  HEADER_HEIGHT_CLASSES,
  CONTENT_PADDING_CLASSES,
  SIDEBAR_WIDTH_VALUES,
} from "@/types/layout";

/**
 * Calculates computed layout values with performance optimizations
 */
export function calculateLayoutValues(
  config: LayoutConfiguration,
  state: LayoutRuntimeState,
  isMobile: boolean
): LayoutComputedValues & { isSidebarCollapsed: boolean; effectiveSidebarWidth: number } {
  const showHeader = config.header.enabled;
  const showSidebar = config.sidebar.enabled && (!isMobile || config.sidebar.showOnMobile);
  const showFooter = config.footer.enabled && (!isMobile || config.footer.showOnMobile);

  // Get CSS classes from constants
  const sidebarWidth = SIDEBAR_WIDTH_CLASSES[config.sidebar.width];
  const headerHeight = HEADER_HEIGHT_CLASSES[config.header.height];

  // Build content classes efficiently
  const contentClasses = buildContentClasses(config.content);

  // Calculate sidebar state
  const isSidebarCollapsed = state.sidebarOpen && config.sidebar.collapsible;
  const effectiveSidebarWidth = isSidebarCollapsed
    ? SIDEBAR_WIDTH_VALUES.collapsed
    : SIDEBAR_WIDTH_VALUES[config.sidebar.width];

  return {
    showHeader,
    showSidebar,
    showFooter,
    sidebarWidth,
    headerHeight,
    contentClasses,
    isMobile,
    isSidebarCollapsed,
    effectiveSidebarWidth,
  };
}

/**
 * Builds content CSS classes based on configuration
 */
function buildContentClasses(contentConfig: LayoutConfiguration["content"]): string {
  const classes: string[] = [];

  // Max width
  switch (contentConfig.maxWidth) {
    case "container":
      classes.push("max-w-7xl");
      break;
    case "prose":
      classes.push("max-w-4xl");
      break;
    default:
      classes.push("w-full");
  }

  // Padding
  const paddingClass = CONTENT_PADDING_CLASSES[contentConfig.padding];
  if (paddingClass) {
    classes.push(paddingClass);
  }

  // Centering
  if (contentConfig.centered) {
    classes.push("mx-auto");
  }

  return classes.join(" ");
}

/**
 * Calculates sidebar width for header positioning
 */
export function calculateSidebarWidth(
  config: LayoutConfiguration,
  isSidebarCollapsed: boolean,
  isMobile: boolean
): number {
  if (!config.sidebar.enabled || isMobile || config.sidebar.variant !== "fixed") {
    return 0;
  }

  return isSidebarCollapsed
    ? SIDEBAR_WIDTH_VALUES.collapsed
    : SIDEBAR_WIDTH_VALUES[config.sidebar.width];
}

/**
 * Generates header positioning styles
 */
export function getHeaderPositionStyles(sidebarWidth: number, isRTL: boolean): React.CSSProperties {
  if (sidebarWidth === 0) {
    return { left: 0, right: 0, width: "100%" };
  }

  return isRTL
    ? { right: `${sidebarWidth}px`, left: 0, width: `calc(100% - ${sidebarWidth}px)` }
    : { left: `${sidebarWidth}px`, right: 0, width: `calc(100% - ${sidebarWidth}px)` };
}

/**
 * Generates sidebar container CSS classes
 */
export function getSidebarContainerClasses(
  isVisible: boolean,
  isSidebarCollapsed: boolean,
  sidebarWidth: SidebarWidth
): string {
  if (!isVisible) return "hidden";

  const baseClasses =
    "relative transition-all duration-300 ease-in-out border-e border-border/40 bg-background sticky top-0 h-screen overflow-visible";

  const widthClasses = isSidebarCollapsed ? "w-16" : SIDEBAR_WIDTH_CLASSES[sidebarWidth];

  return `${baseClasses} ${widthClasses}`;
}

/**
 * Memoization helper for layout calculations
 */
export function createLayoutMemoKey(
  config: LayoutConfiguration,
  state: LayoutRuntimeState,
  isMobile: boolean
): string {
  return JSON.stringify({
    header: config.header,
    sidebar: config.sidebar,
    footer: config.footer,
    content: config.content,
    sidebarOpen: state.sidebarOpen,
    isMobile,
  });
}
