"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className=" bg-(--background)">
      <DashboardContent
        sample={"Daily Call Reports"}
        descrip={"Welcome to Ceutro, It's looking like a slow day"}
        hideMetrics={true}
        AddCallPointTrue={true}
        channalTrue={true}
      />
    </div>
  );
}
