"use client";

import { useEffect } from "react";
import { preloadCriticalRoutes } from "@/lib/component-registry";

export const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Preload critical routes after the app has loaded
    const timer = setTimeout(() => {
      preloadCriticalRoutes();
    }, 1000); // Small delay to not interfere with initial render

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
};
