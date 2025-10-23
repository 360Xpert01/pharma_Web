"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "next-themes";
import {
  WifiOff,
  RefreshIcon,
  AlertIcon,
  CheckCircle,
  XCircle,
  GlobeIcon,
  Router,
  Server,
} from "@/lib/icons";
import { logger } from "@/logger/logger";

interface NetworkErrorProps {
  error?: {
    message: string;
    code?: string;
    url?: string;
    method?: string;
    timeout?: boolean;
  };
  onRetry: () => void;
  onGoOffline?: () => void;
  showDiagnostics?: boolean;
}

// Network Status Hook
function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>("");

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    // Get connection info if available
    const updateConnectionInfo = () => {
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;

      if (connection) {
        setConnectionType(connection.effectiveType || connection.type || "");
      }
    };

    updateOnlineStatus();
    updateConnectionInfo();

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return { isOnline, connectionType };
}

// Network Diagnostics Component
function NetworkDiagnostics() {
  const [diagnostics, setDiagnostics] = useState<{
    connectivity: "checking" | "success" | "failed";
    dns: "checking" | "success" | "failed";
    server: "checking" | "success" | "failed";
  }>({
    connectivity: "checking",
    dns: "checking",
    server: "checking",
  });

  useEffect(() => {
    const runDiagnostics = async () => {
      // Test basic connectivity
      try {
        await fetch("https://httpbin.org/get", {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-cache",
        });
        setDiagnostics((prev) => ({ ...prev, connectivity: "success" }));
      } catch {
        setDiagnostics((prev) => ({ ...prev, connectivity: "failed" }));
      }

      // Test DNS resolution
      try {
        await fetch("https://dns.google/resolve?name=google.com&type=A", {
          method: "GET",
          cache: "no-cache",
        });
        setDiagnostics((prev) => ({ ...prev, dns: "success" }));
      } catch {
        setDiagnostics((prev) => ({ ...prev, dns: "failed" }));
      }

      // Test server connectivity
      try {
        await fetch(window.location.origin + "/api/health", {
          method: "HEAD",
          cache: "no-cache",
        });
        setDiagnostics((prev) => ({ ...prev, server: "success" }));
      } catch {
        setDiagnostics((prev) => ({ ...prev, server: "failed" }));
      }
    };

    runDiagnostics();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <RefreshIcon className="h-4 w-4 animate-spin text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Network Diagnostics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-2 rounded border">
          <div className="flex items-center gap-2">
            <GlobeIcon className="h-4 w-4" />
            <span className="text-sm">Internet Connectivity</span>
          </div>
          {getStatusIcon(diagnostics.connectivity)}
        </div>

        <div className="flex items-center justify-between p-2 rounded border">
          <div className="flex items-center gap-2">
            <Router className="h-4 w-4" />
            <span className="text-sm">DNS Resolution</span>
          </div>
          {getStatusIcon(diagnostics.dns)}
        </div>

        <div className="flex items-center justify-between p-2 rounded border">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span className="text-sm">Server Connection</span>
          </div>
          {getStatusIcon(diagnostics.server)}
        </div>
      </CardContent>
    </Card>
  );
}

// Retry with backoff strategy
function useRetryWithBackoff() {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryProgress, setRetryProgress] = useState(0);

  const retry = async (retryFn: () => Promise<void>) => {
    setIsRetrying(true);
    setRetryProgress(0);

    // Calculate backoff delay: 1s, 2s, 4s, 8s, 16s (max)
    const delay = Math.min(1000 * Math.pow(2, retryCount), 16000);

    // Show progress during delay
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / delay) * 100, 100);
      setRetryProgress(progress);
    }, 50);

    try {
      await new Promise((resolve) => setTimeout(resolve, delay));
      clearInterval(progressInterval);
      setRetryProgress(100);

      await retryFn();

      // Reset on success
      setRetryCount(0);
    } catch (error) {
      setRetryCount((prev) => prev + 1);
      throw error;
    } finally {
      setIsRetrying(false);
      setRetryProgress(0);
      clearInterval(progressInterval);
    }
  };

  return { retry, retryCount, isRetrying, retryProgress };
}

export default function NetworkErrorPage({
  error = {
    message: "Unable to connect to the server",
    code: "NETWORK_ERROR",
  },
  onRetry,
  onGoOffline,
  showDiagnostics = true,
}: NetworkErrorProps) {
  const { theme } = useTheme();
  const { isOnline, connectionType } = useNetworkStatus();
  const { retry, retryCount, isRetrying, retryProgress } = useRetryWithBackoff();

  const handleRetry = async () => {
    try {
      await retry(async () => {
        await onRetry();
      });
    } catch (error) {
      logger.error(
        {
          error: error instanceof Error ? error.message : String(error),
          retryCount: retryCount + 1,
        },
        "Network retry attempt failed"
      );
    }
  };

  const getErrorTitle = () => {
    if (!isOnline) return "No Internet Connection";
    if (error.timeout) return "Connection Timeout";
    if (error.code === "NETWORK_ERROR") return "Network Error";
    return "Connection Failed";
  };

  const getErrorDescription = () => {
    if (!isOnline) {
      return "Your device appears to be offline. Please check your internet connection.";
    }
    if (error.timeout) {
      return "The request took too long to complete. This might be due to a slow connection or server issues.";
    }
    return error.message || "Unable to establish a connection to the server.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-2xl space-y-6">
        {/* Error Icon and Title */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <WifiOff className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{getErrorTitle()}</h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">{getErrorDescription()}</p>
        </div>

        {/* Connection Status */}
        <Alert>
          <AlertIcon className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                Status: {isOnline ? "Online" : "Offline"}
                {connectionType && ` (${connectionType.toUpperCase()})`}
              </span>
              {retryCount > 0 && <span className="text-sm">Attempts: {retryCount}</span>}
            </div>
          </AlertDescription>
        </Alert>

        {/* Retry Progress */}
        {isRetrying && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Retrying...</span>
              <span>{Math.round(retryProgress)}%</span>
            </div>
            <Progress value={retryProgress} className="h-2" />
          </div>
        )}

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleRetry} disabled={isRetrying} className="flex-1">
                <RefreshIcon className={`h-4 w-4 mr-2 ${isRetrying ? "animate-spin" : ""}`} />
                {isRetrying ? "Retrying..." : "Retry Connection"}
              </Button>

              {onGoOffline && (
                <Button onClick={onGoOffline} variant="outline" className="flex-1">
                  Work Offline
                </Button>
              )}
            </div>

            {/* Error Details */}
            {error.url && (
              <div className="mt-4 pt-4 border-t">
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium">Technical Details</summary>
                  <div className="mt-2 space-y-1 text-muted-foreground">
                    <div>URL: {error.url}</div>
                    {error.method && <div>Method: {error.method}</div>}
                    {error.code && <div>Code: {error.code}</div>}
                  </div>
                </details>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Network Diagnostics */}
        {showDiagnostics && <NetworkDiagnostics />}

        {/* Help Text */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Still having trouble? Try these steps:</p>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>• Check your internet connection</div>
            <div>• Refresh the page</div>
            <div>• Clear your browser cache</div>
            <div>• Try a different network</div>
          </div>
        </div>
      </div>
    </div>
  );
}
