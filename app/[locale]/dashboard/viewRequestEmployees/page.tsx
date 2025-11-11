"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardContent
        sample={"Employees View Requests"}
        descrip={"Unlock the potential of your candidates"}
        table={""}
        hideData={false}
        hideHeader={true}
        hideMetrics={true}
        btnTrue={true}
        proBar={false}
        settingsRouteRequest={"/dashboard/viewRequestEmployees"}
        btnApprovel={true}
      />
    </div>
  );
}
