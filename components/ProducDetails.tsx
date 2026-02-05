"use client";

import { useState } from "react";
import UserProfile from "@/components/UserProfile";
import RegionInformation from "@/components/RegionInformation";
import WeeklyExpenses from "@/components/WeeklyExpenses";
import DoctorStatsCard from "./DoctorStatsCard";
import AssignedProductTeam from "./AssignProductTeam";
import Heatmap from "./dashboard/Heatmap";
import ProductSkuChart from "./productSKUs";
import SalesTrend from "./SalesTrend";

export default function ProductDetails({ candidate }: any) {
  // Default candidate data matched to picture image_107e81
  const defaultCandidate = {
    name: "Daplyza",
    description: "(Dapagliflozin)",
    legacy: "000124",
    status: "Active",
    category: "SGLT2",
    skuCount: "6",
    formula: "Dapagliflozin",
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen space-y-6">
      {/* Top Section: Sidebar + Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* LEFT SIDEBAR: ~22% Width (as per image_107e81) */}
        <div className="w-full lg:w-[22%] space-y-6">
          <UserProfile candidate={defaultCandidate} /> {/* Product Image & Name */}
          <RegionInformation
            status="Active"
            legacy="000124"
            category="SGLT2"
            skuCount="6"
            formula="Dapagliflozin"
          />{" "}
          {/* Product Info Section */}
        </div>

        {/* RIGHT MAIN CONTENT: ~78% Width */}
        <div className="w-full lg:w-[78%] space-y-6">
          {/* Top Row: Mini Stats Cards (Active Customers, Sales, etc.) */}
          <div className="w-full">
            <DoctorStatsCard /> {/* image_caa4f5 style stats */}
          </div>

          {/* Middle Row: Sales Trend (Main Large Chart) */}
          <div className="w-full">
            <SalesTrend />
          </div>
        </div>
      </div>

      {/* Bottom Section 1: Assigned Team and Heatmap */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Left: Team Table (40% width) */}
        <div className="w-full lg:w-[45%]">
          <AssignedProductTeam /> {/* image_de88c3 design */}
        </div>
        {/* Right: Territory Heatmap (60% width) */}
        <div className="w-full lg:w-[55%]">
          <Heatmap /> {/* image_107e81 heatmap grid */}
        </div>
      </div>

      {/* Bottom Section 2: Product SKUs Bar Chart (Full Width) */}
      <div className="w-full">
        <ProductSkuChart /> {/* image_106f63 rounded bar chart */}
      </div>
    </div>
  );
}
