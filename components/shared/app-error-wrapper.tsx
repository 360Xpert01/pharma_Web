"use client";
import React from "react";
import { ErrorProvider } from "@/contexts/error-context";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { ThemeProvider } from "@/providers/theme-provider";
import { logger } from "@/logger/logger";

interface AppErrorWrapperProps {
  children: React.ReactNode;
}

/**
 * Main error handling wrapper that provides:
 * - Error context for global error state
 * - Error boundaries for component-level error catching
 * - Theme support for consistent error UI
 */
export function AppErrorWrapper({ children }: AppErrorWrapperProps) {
  return (
    <ErrorProvider maxErrors={10}>
      <ErrorBoundary
        showDetails={process.env.NODE_ENV === "development"}
        onError={(error, errorInfo) => {
          // Global error reporting
          logger.error("Global error caught by app wrapper", {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
          });

          // Send to monitoring service in production
          if (process.env.NODE_ENV === "production") {
            // Example: sendToErrorService(error, errorInfo);
          }
        }}
      >
        {children}
      </ErrorBoundary>
    </ErrorProvider>
  );
}

export default AppErrorWrapper;
