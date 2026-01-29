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
    <div className="w-full bg-white shadow-soft rounded-8 p-6 border border-gray-1">
      {/* Card Title */}
      <h3 className="text-base font-bold text-gray-9 mb-8">Region Information</h3>

      {/* Info Rows */}
      <div className="space-y-7">
        <InfoRow label="Country" value={regionData.country} />
        <InfoRow label="City" value={regionData.city} />
        <InfoRow label="Area" value={regionData.area} />
        <InfoRow label="Brick" value={regionData.brick} />

        {/* Status Row with Badge */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-5">Status</span>
          <span className="bg-[#48BB78] text-white text-xs font-bold px-3 py-2 rounded-8 shadow-sm">
            {regionData.status}
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper component for label-value alignment
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-5">{label}</span>
      <span className="text-sm text-gray-9 font-bold">{value}</span>
    </div>
  );
}
