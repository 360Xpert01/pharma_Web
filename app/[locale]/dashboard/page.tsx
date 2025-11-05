"use client";
import { Header } from "../home/components/header";
import { DashboardContent } from "./components/dashboard-content";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardContent />
    </div>
  );
}
