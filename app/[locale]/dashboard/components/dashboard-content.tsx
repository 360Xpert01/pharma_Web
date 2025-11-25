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
import DoctorsTable from "@/components/DoctorTable";
import ProductTableM from "@/components/ProductTableM";
import SampleManagTable from "@/components/SampleManagTable";
import GiveawayTable from "@/components/giveawayTable";
import OrderCapTable from "@/components/OrderCapTable";
import DcrTable from "@/components/DrcTable";

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
  dataCard,
  doctorTable,
  prodTabel,
  sampleTable,
  giveawayTable,
  OrderCap,
  DCRTable,
}: DashboardProps) {
  const { isLoading, isLocalLoading, handleRefresh } = useDashboard();
  const router = useRouter();
  const combinedLoading = externalLoading || isLoading;
  const topHcps = dataCard?.topHcps || [];
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
    <div className="space-y-10 p-3 px-7 mt-26 bg-gray-50">
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

      <div className="space-y-10 ">
        {/* Metrics Cards Section */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {!hideMetrics &&
            (topHcps?.length > 0 ? (
              topHcps.map((hcp, index) => (
                <MetricsSection
                  key={index}
                  title={hcp.title}
                  value={hcp.value}
                  valueLabel={hcp.valueLabel}
                  subtitle={hcp.subtitle}
                  detailLabel={hcp.detailLabel || ""}
                  detailValue={hcp.detailValue}
                  progress={hcp.progress}
                  colorVariant={hcp.colorVariant}
                />
              ))
            ) : (
              <div>No data available</div>
            ))}
        </div>

        {campTabel && (
          <div className=" rounded-md p-3 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <CampaignsTable />
          </div>
        )}

        {prodTabel && (
          <div className=" rounded-md p-3 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <ProductTableM />
          </div>
        )}

        {doctorTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <DoctorsTable />
          </div>
        )}

        {sampleTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <SampleManagTable />
          </div>
        )}

        {giveawayTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <GiveawayTable />
          </div>
        )}

        {OrderCap && (
          <div className=" rounded-md p-3 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <OrderCapTable />
          </div>
        )}

        {DCRTable && (
          <div className=" rounded-md p-3 shadow-[0px_5px_15px_rgba(0,0,0,0.35)] ">
            <TableHeader campHeading={campHeading} filterT={filterT} />
            <DcrTable />
          </div>
        )}

        {/* Data Tables Section */}
        {/* {table && !hideData && !proBar && (
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
        )} */}

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
