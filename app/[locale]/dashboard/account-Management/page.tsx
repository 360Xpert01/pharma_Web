"use client";
import { DashboardContent } from "../components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardContent
        sample={"Account Management"}
        descrip={"Welcome to Ceutro, It's looking like a slow day"}
        table={"All Doctors"}
      />
    </div>
  );
}
