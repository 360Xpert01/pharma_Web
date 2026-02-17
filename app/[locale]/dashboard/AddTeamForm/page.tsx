"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="bg-[var(--background)]">
      <DashboardContent
        sample={"Add New Team "}
        descrip={"Welcome to Ceutro, It's looking like a slow day"}
        btnTrue={true}
        hideHeader={true}
        hideMetrics={true}
        proBar={false}
        hideData={true}
        teamFormTabel={true}
        campHeading={"All Team"}
        filterT={true}
      />
    </div>
  );
}
