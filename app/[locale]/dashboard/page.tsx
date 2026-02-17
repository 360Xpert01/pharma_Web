"use client";

import Heatmap from "@/components/dashboard/Heatmap";
import TeamLeaderboard from "@/components/dashboard/TeamLeaderboard";
import DoctorCoverageMap from "@/components/dashboard/DoctorCoverageMap";
import ProductPerformance from "@/components/dashboard/ProductPerformance";
import NotificationActivity from "@/components/dashboard/NotificationActivity";
import TopCards from "@/components/dashboard/TopCard";
import { DashboardHeader } from "./components/dashboard-header";

export default function DashboardPage() {
  const handleDateChange = (startDate: Date, endDate: Date) => {
    console.log("Date range selected:", startDate, endDate);
    // You can add your date filtering logic here
  };

  return (
    <div className="bg-(--gray-0)">
      <div className="w-full mt-30 space-y-6">
        {/* Dashboard Header with Calendar Filter */}
        <DashboardHeader
          title="Dashboard"
          description="Unlock the potential of your candidates"
          showCalendar={true}
          onDateChange={handleDateChange}
          btnTrue={true}
        />

        {/* Top Stats Cards */}
        <TopCards />

        {/* Heatmap and Doctor Coverage Map in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Heatmap Component */}
          <Heatmap config={{ rows: 20, columns: 20 }} />

          {/* Doctor Coverage Map Component */}
          <DoctorCoverageMap />
        </div>

        {/* Product Performance (55%) and Team Leaderboard (45%) in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-20 gap-6 items-stretch">
          {/* Product Performance Component - 55% width (11 columns out of 20) */}
          <div className="lg:col-span-11 h-full">
            <ProductPerformance className="h-full" />
          </div>

          {/* Team Leaderboard Component - 45% width (9 columns out of 20) */}
          <div className="lg:col-span-9 h-full">
            <TeamLeaderboard className="h-full" />
          </div>
        </div>

        {/* Notification Activity Component - 50% width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NotificationActivity />
        </div>
      </div>
    </div>
  );
}
