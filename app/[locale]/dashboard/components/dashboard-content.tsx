"use client";

import { useDashboard } from "@/hooks/use-dashboard";
import { DashboardProps } from "../types";
import { ChartsSection } from "./charts/ChartsSection";
import { DashboardHeader } from "./dashboard-header";
import { DataSection } from "./data/data-section";
import { MetricsSection } from "./metrics/metrics-section";
import { PerformanceStats } from "./performance/performance-stats";
import SalesDashboard from "./charts/SalesDashboard";
import SalesDashboard1 from "./SalesDashboard1";
import { useRouter } from "next/navigation";

export function DashboardContent({
  isLoading: externalLoading = false,
  data,
  sample,
  descrip,
  table,
  hideHeader,
  hideMetrics,
  hideData,
  btnTrue,
  btnAdd,
  proBar,
  settingsRoute,
}: DashboardProps) {
  const { isLoading, isLocalLoading, handleRefresh } = useDashboard();
  const router = useRouter();
  const combinedLoading = externalLoading || isLoading;

  const handleSettings = () => {
    if (settingsRoute) {
      router.push(settingsRoute);
    } else {
      console.log("Settings route not provided");
    }
  };

  return (
    <div className="space-y-10 p-6 bg-white">
      {/* Dashboard Header with Actions */}
      <DashboardHeader
        onRefresh={handleRefresh}
        onSettings={handleSettings}
        isLoading={combinedLoading}
        title={sample}
        description={descrip}
        btnAdd={btnAdd}
        btnTrue={btnTrue}
      />

      {/* Metrics Cards Section */}
      {!hideMetrics && <MetricsSection data={data?.metrics} isLoading={combinedLoading} />}

      {proBar && <SalesDashboard1 />}

      {/* Charts Section */}
      {/* <ChartsSection isLoading={combinedLoading} /> */}

      {/* Data Tables Section */}
      <DataSection
        data={{
          users: data?.users,
          products: data?.products,
          orders: data?.orders,
        }}
        isLoading={combinedLoading}
        table={table}
        description={descrip}
      />

      {/* Quick Stats Footer */}
      {/* <PerformanceStats isLoading={combinedLoading} /> */}
    </div>
  );
}
