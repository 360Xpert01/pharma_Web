"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="bg-[var(--background)]">
      <DashboardContent
        sample={"Team Management"}
        descrip={"Welcome to Ceutro, It's looking like a slow day"}
        table={"All Team"}
        btnAdd={"Add New Team"}
        hideHeader={true}
        hideMetrics={true}
        proBar={false}
        hideData={true}
        campTabel={true}
        campHeading={"All Team"}
        filterT={false}
        settingsRoute={"/dashboard/AddTeamForm"}
      />
    </div>
  );
}
