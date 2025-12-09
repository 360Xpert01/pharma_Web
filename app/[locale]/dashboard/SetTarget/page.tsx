"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className=" bg-white">
      <DashboardContent
        sample={"Daily Call Reports"}
        descrip={"Welcome to Ceutro, It's looking like a slow day"}
        table={"Calls Report"}
        btnTrue={true}
        filterT={true}
        hideMetrics={true}
        setTargetlist={true}
        channalTrue={true}
      />
    </div>
  );
}
