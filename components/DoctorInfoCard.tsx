"use client";

import React from "react";

export default function RegionInfoCard({ partyData }: any) {
  // Safe access to locations array
  const location = partyData?.locations?.[0];

  return (
    <div className="w-full bg-white shadow-soft rounded-8 p-10 border border-gray-1">
      {/* Card Title - Centered as per image_ca38ba */}
      <h3 className="text-[22px] font-bold text-[#334155] mb-10 text-center tracking-tight">
        Region Information
      </h3>

      {/* Info Rows */}
      <div className="space-y-6">
        <InfoRow label="Country" value={location?.country || "N/A"} />
        <InfoRow label="City" value={location?.city || "N/A"} />
        <InfoRow label="Area" value={location?.state || "N/A"} />
        <InfoRow label="Brick" value={location?.geographic_unit_name || "N/A"} />

        {/* Status Row with Badge */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-gray-400 text-lg font-medium">Status</span>
          <span className="bg-[#48BB78] text-white text-xs font-bold px-8 py-1.5 rounded-full shadow-sm uppercase">
            {partyData?.status || "N/A"}
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
      {/* Text styles matched to image_ca38ba */}
      <span className="text-gray-400 text-lg font-medium">{label}</span>
      <span className="text-black text-lg font-bold">{value}</span>
    </div>
  );
}
