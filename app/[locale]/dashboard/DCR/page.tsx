"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardContent
        sample={"Daily Call Reports"}
        descrip={"Unlock the potential of your candidates"}
        table={"Calls Report"}
        btnTrue={true}
      />
    </div>
  );
}
