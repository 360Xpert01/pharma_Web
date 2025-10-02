"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppError, ErrorFactory } from "@/lib/error-factory";
import { AlertIcon, RefreshIcon, HomeIcon, BugIcon } from "@/lib/icons";
import { logger } from "@/lib/logger";
import { SHARED_TEXTS } from "@/constants";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: AppError;
  errorInfo?: ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: AppError, retry: () => void) => ReactNode;
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  isolation?: boolean; // Whether to isolate the error to this boundary
}

// Error Boundary Component
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const appError = ErrorFactory.fromError(error);
    return {
      hasError: true,
      error: appError,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const appError = ErrorFactory.fromError(error);

    this.setState({
      error: appError,
      errorInfo,
    });

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(appError, errorInfo);
    }

    // Log error for debugging
    logger.error("Error caught by React error boundary", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });

    // Report to error monitoring service (if configured)
    this.reportError(appError, errorInfo);
  }

  private reportError = (error: AppError, errorInfo: ErrorInfo) => {
    // Here you could integrate with error reporting services like Sentry
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  private renderErrorDetails() {
    const { error, errorInfo } = this.state;

    if (!this.props.showDetails || process.env.NODE_ENV === "production") {
      return null;
    }

    return (
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
          Technical Details (Development)
        </summary>
        <div className="mt-2 space-y-2">
          <Alert>
            <BugIcon className="h-4 w-4" />
            <AlertDescription>
              <strong>Error:</strong> {error?.message}
            </AlertDescription>
          </Alert>

          {error?.stack && (
            <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-32">{error.stack}</pre>
          )}

          {errorInfo?.componentStack && (
            <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-32">
              <strong>Component Stack:</strong>
              {errorInfo.componentStack}
            </pre>
          )}
        </div>
      </details>
    );
  }

  render() {
    if (this.state.hasError && this.state.error) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertIcon className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-xl">{SHARED_TEXTS.errorBoundary.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  {this.state.error.message || SHARED_TEXTS.errorBoundary.subtitle}
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={this.handleRetry} className="flex-1" variant="default">
                  <RefreshIcon className="h-4 w-4 mr-2" />
                  {SHARED_TEXTS.errorBoundary.retryButton}
                </Button>

                <Button onClick={this.handleGoHome} variant="outline" className="flex-1">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  {SHARED_TEXTS.errorBoundary.homeButton}
                </Button>
              </div>

              {this.renderErrorDetails()}

              <p className="text-xs text-muted-foreground text-center">
                Error ID: {this.state.error.timestamp.getTime().toString(36)}
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">
) {
  const WithErrorBoundaryComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
}

// Hook for manually triggering error boundary
export function useErrorBoundary() {
  const throwError = (error: Error | string) => {
    const errorToThrow = typeof error === "string" ? new Error(error) : error;
    throw errorToThrow;
  };

  return { throwError };
}
