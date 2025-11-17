"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="bg-white">
      <DashboardContent
        sample={"Campaign Management"}
        descrip={"Welcome to Ceutro, It's looking like a slow day"}
        table={"All Campaign"}
        btnAdd={"Add New Role"}
        hideHeader={true}
        hideMetrics={true}
        proBar={false}
        hideData={true}
        campTabel={true}
      />
    </div>
  );
}
