"use client";

import { DashboardContent } from "../components/dashboard-content";

export default function TargetListViewPage() {
  return (
    <div className="bg-(--gray-0)">
      <DashboardContent
        sample={"Target listview"}
        descrip={"Unlock the potential of your candidates"}
        table={"All Employees"}
        hideData={false}
        hideHeader={true}
        hideMetrics={true}
        btnTrue={true}
        targetListView={true}
        settingsRoute={"/dashboard/addEmployees"}
        settingsRouteRequest={"/dashboard/viewRequestEmployees"}
        btntextReq={"view Requests"}
        btnReqquest={true}
      />
    </div>
  );
}
