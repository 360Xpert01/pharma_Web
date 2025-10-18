"use client";
import { useState, useCallback } from "react";

export function useDashboard() {
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsLocalLoading(true);
    setIsLoading(true);

    try {
      // Simulate refresh delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 10% chance of simulated error for demo purposes
      if (Math.random() < 0.1) {
        throw new Error("Failed to refresh dashboard data");
      }

      console.log("Dashboard refreshed successfully");
    } catch (error) {
      console.error("Failed to refresh dashboard:", error);
    } finally {
      setIsLoading(false);
      setIsLocalLoading(false);
    }
  }, []);

  return {
    isLoading,
    isLocalLoading,
    handleRefresh,
  };
}
