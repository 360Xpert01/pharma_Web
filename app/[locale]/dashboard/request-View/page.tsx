"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardContent
        sample={"Request View"}
        descrip={"Unlock the potential of your candidates"}
        table={"All Request"}
        hideHeader={true}
        hideMetrics={true}
        hideData={false}
        btnTrue={true}
      />
    </div>
  );
}
