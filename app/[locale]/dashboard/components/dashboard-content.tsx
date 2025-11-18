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
import ExpenseRequestItem from "@/components/ExpenseRequestItem";
import SalesTeamTable from "./data/EmploySection";
import { User } from "lucide-react";
import SalesPersonCard from "@/components/UserDetailTtle";
import CampaignsTable from "@/components/CampainTable";
import TableHeader from "@/components/TableHeader";

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
  btntextReq,
  btnReqquest,
  btnApprovel,
  settingsRouteRequest,
  campTabel,
  campHeading,
  filterT,
}: DashboardProps) {
  const { isLoading, isLocalLoading, handleRefresh } = useDashboard();
  const router = useRouter();
  const combinedLoading = externalLoading || isLoading;
  const requests = [
    { title: "Client1", amount: 520 },
    { title: "Client2", amount: 520 },
    { title: "Client3", amount: 520 },
    { title: "Client4", amount: 520 },
    { title: "Client5", amount: 520 },
  ];
  const handleSettings = () => {
    if (settingsRoute) {
      router.push(settingsRoute);
    } else {
      console.log("Settings route not provided");
    }
  };

  const handleSettingView = () => {
    if (settingsRouteRequest) {
      router.push(settingsRouteRequest);
    } else {
      console.log("Settings route not provided");
    }
  };

  return (
    <div className="space-y-8 p-3 mt-26 bg-gray-50">
      {/* Dashboard Header with Actions */}
      <DashboardHeader
        onRefresh={handleRefresh}
        onSettings={handleSettings}
        isLoading={combinedLoading}
        title={sample}
        description={descrip}
        btnAdd={btnAdd}
        btnTrue={btnTrue}
        btntextReq={btntextReq}
        btnReqquest={btnReqquest}
        onSettingView={handleSettingView}
      />

      {campTabel && (
        <div className=" rounded-md p-3 shadow-xl inset-shadow-2xs ">
          <TableHeader campHeading={campHeading} filterT={filterT} />
          <CampaignsTable />
        </div>
      )}

      <div className="bg-white space-y-10 rounded-md p-3">
        {/* Metrics Cards Section */}
        {!hideMetrics && <MetricsSection data={data?.metrics} isLoading={combinedLoading} />}

        {/* Data Tables Section */}
        {table && !hideData && !proBar && (
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
        )}

        {proBar && <SalesTeamTable />}

        {btnApprovel && (
          <div className=" mx-auto  space-y-2">
            {requests.map((req, i) => (
              <ExpenseRequestItem
                key={i}
                title={req.title}
                onApprove={() => alert(`Approved: ${req.title}`)}
                onReject={() => alert(`Rejected: ${req.title}`)}
              />
            ))}
          </div>
        )}

        {/* Quick Stats Footer */}
        {/* <PerformanceStats isLoading={combinedLoading} /> */}
      </div>
    </div>
  );
}
