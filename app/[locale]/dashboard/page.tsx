"use client";

import Heatmap from "@/components/dashboard/Heatmap";
import TeamLeaderboard from "@/components/dashboard/TeamLeaderboard";
import DoctorCoverageMap from "@/components/dashboard/DoctorCoverageMap";
import ProductPerformance from "@/components/dashboard/ProductPerformance";
import NotificationActivity from "@/components/dashboard/NotificationActivity";

export default function DashboardPage() {
  return (
    <div className="bg-(--gray-0) min-h-screen p-6">
      <div className="w-full space-y-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="t-h2 text-(--gray-9) mb-2">Dashboard</h1>
          <p className="t-sm text-(--gray-5)">
            Monitor your territory performance and team rankings
          </p>
        </div>

        {/* Heatmap and Doctor Coverage Map in one row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Heatmap Component */}
          <Heatmap />

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
