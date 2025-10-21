"use client";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { storage } from "@/lib/actions/actions";
import { useIsMobile as useIsMobileHook } from "@/hooks/use-mobile";

// Layout configuration types
export interface LayoutConfig {
  // Header configuration
  header: {
    enabled: boolean;
    fixed: boolean;
    height: "sm" | "md" | "lg";
    showLogo: boolean;
    showNavigation: boolean;
    showUserMenu: boolean;
    collapsible: boolean;
  };

  // Sidebar configuration
  sidebar: {
    enabled: boolean;
    position: "left" | "right";
    variant: "fixed" | "drawer" | "overlay";
    width: "sm" | "md" | "lg" | "xl";
    collapsible: boolean;
    defaultCollapsed: boolean;
    showOnMobile: boolean;
    mobileBreakpoint: "sm" | "md" | "lg" | "xl";
  };

  // Footer configuration
  footer: {
    enabled: boolean;
    fixed: boolean;
    variant: "simple" | "detailed" | "minimal" | "social" | "centered" | "compact";
    showOnMobile: boolean;
  };

  // Content area configuration
  content: {
    maxWidth: "full" | "container" | "prose";
    padding: "none" | "sm" | "md" | "lg";
    centered: boolean;
  };

  // Navigation configuration
  navigation: {
    style: "horizontal" | "vertical" | "tabs" | "breadcrumb";
    showBreadcrumbs: boolean;
    mobileMenuType: "drawer" | "dropdown" | "fullscreen";
  };

  // Theme and responsive settings
  responsive: {
    mobileFirst: boolean;
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
}

// Default configuration
const defaultLayoutConfig: LayoutConfig = {
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
    enabled: true,
    fixed: false,
    variant: "simple",
    showOnMobile: true,
  },
  content: {
    maxWidth: "full",
    padding: "md",
    centered: false,
  },
  navigation: {
    style: "horizontal",
    showBreadcrumbs: true,
    mobileMenuType: "drawer",
  },
  responsive: {
    mobileFirst: true,
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
};

// Layout state for runtime toggles
interface LayoutState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  isLoading: boolean;
}

const defaultLayoutState: LayoutState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  isLoading: false,
};

type LayoutContextValue = {
  // Configuration
  config: LayoutConfig;
  updateConfig: (updates: Partial<LayoutConfig>) => void;
  resetConfig: () => void;

  // Runtime state
  state: LayoutState;
  updateState: (updates: Partial<LayoutState>) => void;

  // Computed values
  computed: {
    showHeader: boolean;
    showSidebar: boolean;
    showFooter: boolean;
    sidebarWidth: string;
    headerHeight: string;
    contentClasses: string;
    isMobile: boolean;
    isSidebarCollapsed: boolean;
    effectiveSidebarWidth: number;
  };

  // Actions
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setHeader: (enabled: boolean) => void;

  // Presets
  applyPreset: (preset: "website" | "dashboard" | "portal" | "blog" | "minimal") => void;
};

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

export function LayoutProvider({ children }: PropsWithChildren) {
  const [config, setConfig] = useState<LayoutConfig>(() => {
    // Load from localStorage if available
    const saved = storage.getJson("layout-config", defaultLayoutConfig);
    return { ...defaultLayoutConfig, ...saved };
  });

  const [state, setState] = useState<LayoutState>(defaultLayoutState);
  const isMobile = useIsMobileHook(config.responsive.breakpoints.md);

  // Save config to localStorage when it changes
  useEffect(() => {
    storage.setJson("layout-config", config);
  }, [config]);

  const updateConfig = useCallback((updates: Partial<LayoutConfig>) => {
    setConfig((prev) => {
      const newConfig = { ...prev };

      // Deep merge for nested objects
      Object.keys(updates).forEach((key) => {
        const updateKey = key as keyof LayoutConfig;
        if (typeof updates[updateKey] === "object" && updates[updateKey] !== null) {
          newConfig[updateKey] = { ...prev[updateKey], ...updates[updateKey] } as any;
        } else {
          newConfig[updateKey] = updates[updateKey] as any;
        }
      });

      return newConfig;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultLayoutConfig);
    storage.remove("layout-config");
  }, []);

  const updateState = useCallback((updates: Partial<LayoutState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, mobileMenuOpen: !prev.mobileMenuOpen }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setState((prev) => ({ ...prev, mobileMenuOpen: false }));
  }, []);

  const setHeader = useCallback((enabled: boolean) => {
    setConfig((prev) => ({ ...prev, header: { ...prev.header, enabled } }));
  }, []);

  // Computed values
  const computed = useMemo(() => {
    const showHeader = config.header.enabled;
    const showSidebar = config.sidebar.enabled && (!isMobile || config.sidebar.showOnMobile);
    const showFooter = config.footer.enabled && (!isMobile || config.footer.showOnMobile);

    // Dynamic width classes
    const sidebarWidthMap = {
      sm: "w-48",
      md: "w-64",
      lg: "w-72",
      xl: "w-80",
    };

    const headerHeightMap = {
      sm: "h-12",
      md: "h-16",
      lg: "h-20",
    };

    const sidebarWidth = sidebarWidthMap[config.sidebar.width];
    const headerHeight = headerHeightMap[config.header.height];

    // Content classes based on configuration
    const contentClasses = [
      // Max width
      config.content.maxWidth === "container"
        ? "max-w-7xl"
        : config.content.maxWidth === "prose"
          ? "max-w-4xl"
          : "w-full",

      // Padding
      config.content.padding === "none"
        ? ""
        : config.content.padding === "sm"
          ? "p-2"
          : config.content.padding === "md"
            ? "p-4 md:p-6"
            : "p-6 md:p-8",

      // Centering
      config.content.centered ? "mx-auto" : "",
    ]
      .filter(Boolean)
      .join(" ");

    // Additional computed values for layout
    const isSidebarCollapsed = state.sidebarOpen && config.sidebar.collapsible;
    const effectiveSidebarWidth = isSidebarCollapsed
      ? 64 // 4rem for collapsed sidebar
      : config.sidebar.width === "sm"
        ? 192
        : config.sidebar.width === "md"
          ? 256
          : config.sidebar.width === "lg"
            ? 288
            : 320;

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
  }, [config, isMobile, state.sidebarOpen]);

  // Layout presets
  const applyPreset = useCallback(
    (preset: "website" | "dashboard" | "portal" | "blog" | "minimal") => {
      const presets: Record<string, Partial<LayoutConfig>> = {
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

      updateConfig(presets[preset]);
    },
    [updateConfig]
  );

  const value = useMemo(
    () => ({
      config,
      updateConfig,
      resetConfig,
      state,
      updateState,
      computed,
      toggleSidebar,
      toggleMobileMenu,
      closeMobileMenu,
      setHeader,
      applyPreset,
    }),
    [
      config,
      updateConfig,
      resetConfig,
      state,
      updateState,
      computed,
      toggleSidebar,
      toggleMobileMenu,
      closeMobileMenu,
      setHeader,
      applyPreset,
    ]
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used within LayoutProvider");
  return ctx;
}

// Utility hooks for specific layout aspects
export function useLayoutConfig() {
  const { config, updateConfig } = useLayout();
  return { config, updateConfig };
}

export function useLayoutState() {
  const { state, updateState } = useLayout();
  return { state, updateState };
}

export function useLayoutComputed() {
  const { computed } = useLayout();
  return computed;
}
