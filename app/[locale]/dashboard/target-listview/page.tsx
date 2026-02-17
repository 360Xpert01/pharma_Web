"use client";

import { DashboardContent } from "../components/dashboard-content";

export default function TargetListViewPage() {
  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={"Revenue Targets"}
        descrip={"Unlock the potential of your candidates"}
        table={"All Employees"}
        btnAdd={"Set Targets"}
        hideData={false}
        hideHeader={true}
        hideMetrics={true}
        targetListView={true}
        settingsRoute={"/dashboard/SetTarget"}
        settingsRouteRequest={"/dashboard/viewRequestEmployees"}
        btnReqquest={false}
      />
    </div>
  );
}
