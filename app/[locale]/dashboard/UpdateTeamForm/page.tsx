"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="bg-[var(--background)]">
      <DashboardContent
        sample={"Update Team"}
        descrip={"Update team details"}
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
