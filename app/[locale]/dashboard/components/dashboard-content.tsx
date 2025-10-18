"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import { DashboardProps } from "../types";
import { ChartsSection } from "./charts/ChartsSection";
import { DashboardHeader } from "./dashboard-header";
import { DataSection } from "./data/data-section";
import { MetricsSection } from "./metrics/metrcis-section";
import { PerformanceStats } from "./performance/performance-stats";

export function DashboardContent({ isLoading: externalLoading = false, data }: DashboardProps) {
  const { isLoading, isLocalLoading, handleRefresh } = useDashboard();

  const combinedLoading = externalLoading || isLoading;

  const handleSettings = () => {
    // Handle settings action
    console.log("Settings clicked");
  };

  return (
    <div className="space-y-10 p-6">
      {/* Dashboard Header with Actions */}
      <DashboardHeader
        onRefresh={handleRefresh}
        onSettings={handleSettings}
        isLoading={combinedLoading}
      />

      {/* Metrics Cards Section */}
      <MetricsSection data={data?.metrics} isLoading={combinedLoading} />

      {/* Charts Section */}
      <ChartsSection isLoading={combinedLoading} />

      {/* Data Tables Section */}
      <DataSection
        data={{
          users: data?.users,
          products: data?.products,
          orders: data?.orders,
        }}
        isLoading={combinedLoading}
      />

      {/* Quick Stats Footer */}
      <PerformanceStats isLoading={combinedLoading} />
    </div>
  );
}
