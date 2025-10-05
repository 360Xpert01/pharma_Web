"use client";

import React, { Suspense, lazy, ComponentType, ReactNode } from "react";
import { useGlobalLoading } from "@/contexts/global-loading-context";
import LoaderOverlay from "@/components/shared/loader-overlay";

interface LazyLoadOptions {
  fallbackText?: string;
  fallbackVariant?: "default" | "minimal" | "dots";
  fallbackSize?: "sm" | "md" | "lg";
  delay?: number;
}

// Global loading fallback component that uses the global loading context
const GlobalLoadingFallback: React.FC<{
  text?: string;
  variant?: "default" | "minimal" | "dots";
  size?: "sm" | "md" | "lg";
}> = ({ text, variant, size }) => {
  return <LoaderOverlay isLoading={true} text={text} variant={variant} size={size} />;
};

// Enhanced lazy loading utility
export const createLazyComponent = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: LazyLoadOptions = {}
) => {
  const {
    fallbackText = "Loading...",
    fallbackVariant = "default",
    fallbackSize = "md",
    delay = 0,
  } = options;

  // Add artificial delay if specified (useful for UX)
  const delayedImport =
    delay > 0
      ? () =>
          new Promise<{ default: ComponentType<P> }>((resolve) => {
            setTimeout(() => {
              importFn().then(resolve);
            }, delay);
          })
      : importFn;

  const LazyComponent = lazy(delayedImport);

  const WrappedComponent: React.FC<P> = (props) => (
    <Suspense
      fallback={
        <GlobalLoadingFallback text={fallbackText} variant={fallbackVariant} size={fallbackSize} />
      }
    >
      <LazyComponent {...(props as any)} />
    </Suspense>
  );

  // Preserve display name for debugging
  WrappedComponent.displayName = `LazyWrapped(Component)`;

  return WrappedComponent;
};

// Auto lazy loading HOC for any component
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  options: LazyLoadOptions = {}
) => {
  const { fallbackText = "Loading...", fallbackVariant = "default", fallbackSize = "md" } = options;

  const WrappedComponent: React.FC<P> = (props) => (
    <Suspense
      fallback={
        <GlobalLoadingFallback text={fallbackText} variant={fallbackVariant} size={fallbackSize} />
      }
    >
      <Component {...(props as any)} />
    </Suspense>
  );

  WrappedComponent.displayName = `LazyWrapped(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};

// Route-based lazy loading utility
export const createLazyRoute = (
  importFn: () => Promise<{ default: ComponentType<any> }>,
  routeName?: string
) => {
  return createLazyComponent(importFn, {
    fallbackText: routeName ? `Loading ${routeName}...` : "Loading page...",
    fallbackVariant: "default",
    fallbackSize: "lg",
  });
};

// Preload utility for better UX
export const preloadComponent = (importFn: () => Promise<{ default: ComponentType<any> }>) => {
  // Start loading the component but don't wait for it
  importFn().catch((err) => {
    console.warn("Failed to preload component:", err);
  });
};

// Component registry for dynamic loading
class ComponentRegistry {
  private static instance: ComponentRegistry;
  private components = new Map<string, () => Promise<{ default: ComponentType<any> }>>();
  private preloadQueue = new Set<string>();

  static getInstance() {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  register(name: string, importFn: () => Promise<{ default: ComponentType<any> }>) {
    this.components.set(name, importFn);
  }

  get(name: string, options?: LazyLoadOptions) {
    const importFn = this.components.get(name);
    if (!importFn) {
      console.warn(`Component '${name}' not found in registry`);
      return null;
    }
    return createLazyComponent(importFn, options);
  }

  preload(name: string) {
    if (this.preloadQueue.has(name)) return;

    const importFn = this.components.get(name);
    if (importFn) {
      this.preloadQueue.add(name);
      preloadComponent(importFn);
    }
  }

  preloadAll() {
    this.components.forEach((importFn, name) => {
      this.preload(name);
    });
  }
}

export const componentRegistry = ComponentRegistry.getInstance();

// Utility for dynamic imports with better error handling
export const safeImport = <T,>(
  importFn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await importFn();
        resolve(result);
        return;
      } catch (error) {
        if (i === retries - 1) {
          reject(new Error("Max retries exceeded"));
          return;
        }
        await new Promise((r) => setTimeout(r, delay * (i + 1)));
      }
    }
  });
};
