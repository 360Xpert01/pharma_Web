"use client";

import React from "react";

export default function RegionInfoCard() {
  const regionData = {
    country: "Pakistan",
    city: "Karachi",
    area: "Gulshan-e-Iqbal",
    brick: "Block 13-D",
    status: "Active",
  };

  return (
    <div className="flex bg-gray-50">
      {/* Main Card Container */}
      <div className="w-[380px] bg-white rounded-[24px] shadow-sm border border-gray-100 p-7">
        {/* Card Title */}
        <h2 className="text-[22px] font-bold text-[#334155] mb-10 text-center tracking-tight">
          Region Information
        </h2>

        {/* Info Rows */}
        <div className="space-y-6">
          <InfoRow label="Country" value={regionData.country} />
          <InfoRow label="City" value={regionData.city} />
          <InfoRow label="Area" value={regionData.area} />
          <InfoRow label="Brick" value={regionData.brick} />

          {/* Status Row with Badge */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-lg font-medium">Status</span>
            <span className="bg-[#48BB78] text-white text-xs font-bold px-8 py-1.5 rounded-full shadow-sm">
              {regionData.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for label-value alignment
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-lg font-medium">{label}</span>
      <span className="text-black text-lg font-bold">{value}</span>
    </div>
  );
}
