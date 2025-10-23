"use client";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { storage } from "@/lib/actions/actions";
import { useIsMobile as useIsMobileHook } from "@/hooks/use-mobile";
import type {
  LayoutConfiguration,
  LayoutRuntimeState,
  LayoutPreset,
  LayoutComputedValues,
} from "@/types/layout";
import { LAYOUT_PRESETS } from "@/types/layout";
import { calculateLayoutValues, createLayoutMemoKey } from "@/lib/layout-utils";

// Default configuration
const defaultLayoutConfig: LayoutConfiguration = {
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

// Default layout state
const defaultLayoutState: LayoutRuntimeState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  isLoading: false,
};

// Extended computed values interface to include additional properties
interface ExtendedLayoutComputedValues extends LayoutComputedValues {
  isSidebarCollapsed: boolean;
  effectiveSidebarWidth: number;
}

type LayoutContextValue = {
  // Configuration
  config: LayoutConfiguration;
  updateConfig: (updates: Partial<LayoutConfiguration>) => void;
  resetConfig: () => void;

  // Runtime state
  state: LayoutRuntimeState;
  updateState: (updates: Partial<LayoutRuntimeState>) => void;

  // Computed values
  computed: ExtendedLayoutComputedValues;

  // Actions
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setHeader: (enabled: boolean) => void;

  // Presets
  applyPreset: (preset: LayoutPreset) => void;
};

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

export function LayoutProvider({ children }: PropsWithChildren) {
  const [config, setConfig] = useState<LayoutConfiguration>(() => {
    // Load from localStorage if available
    const saved = storage.getJson("layout-config", defaultLayoutConfig);
    return { ...defaultLayoutConfig, ...saved };
  });

  const [state, setState] = useState<LayoutRuntimeState>(defaultLayoutState);
  const isMobile = useIsMobileHook();

  // Save config to localStorage when it changes
  useEffect(() => {
    storage.setJson("layout-config", config);
  }, [config]);

  const updateConfig = useCallback((updates: Partial<LayoutConfiguration>) => {
    setConfig((prev) => {
      const newConfig = { ...prev };

      // Deep merge for nested objects
      Object.keys(updates).forEach((key) => {
        const updateKey = key as keyof LayoutConfiguration;
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

  const updateState = useCallback((updates: Partial<LayoutRuntimeState>) => {
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

  // Memoization for expensive layout calculations
  const memoKeyRef = useRef<string>("");
  const computedRef = useRef<ExtendedLayoutComputedValues | null>(null);

  // Computed values with optimized memoization
  const computed = useMemo(() => {
    const newMemoKey = createLayoutMemoKey(config, state, isMobile);

    // Return cached result if inputs haven't changed
    if (memoKeyRef.current === newMemoKey && computedRef.current) {
      return computedRef.current;
    }

    // Calculate new values
    const newComputed = calculateLayoutValues(config, state, isMobile);

    // Cache the result
    memoKeyRef.current = newMemoKey;
    computedRef.current = newComputed;

    return newComputed;
  }, [config, state, isMobile]);

  // Layout presets using centralized configuration
  const applyPreset = useCallback(
    (preset: LayoutPreset) => {
      const presetConfig = LAYOUT_PRESETS[preset];
      if (presetConfig) {
        updateConfig(presetConfig);
      }
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
