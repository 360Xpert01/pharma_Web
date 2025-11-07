"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardContent
        sample={"Order Capture"}
        descrip={"Unlock the potential of your candidates"}
        table={"Total Order"}
        btnTrue={true}
      />
    </div>
  );
}
