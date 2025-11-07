"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardContent
        sample={"plans Management"}
        descrip={"Unlock the potential of your candidates"}
        table={"All Plans"}
        btnTrue={true}
      />
    </div>
  );
}
