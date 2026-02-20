"use client";

import React from "react";

export default function RegionInfoCard({ partyData }: any) {
  const doctorDetails = partyData || {};

  return (
    <div className="w-full bg-white shadow-soft rounded-8 p-4 border border-gray-1">
      {/* Card Title - Compact LG */}
      <h3 className="text-lg font-bold text-[#0f172a] mb-6 text-left tracking-tight">
        Regional Information
      </h3>

      {/* Info Rows - More compact spacing */}
      <div className="space-y-4">
        {/* Status Row */}
        <div className="flex items-center justify-between">
          <span className="text-[#94a3b8] text-sm font-medium">Status</span>
          <span className="bg-[#dcfce7] text-[#166534] text-xs font-bold px-3 py-1 rounded-lg">
            {doctorDetails?.status || "active"}
          </span>
        </div>

        <InfoRow
          label="Line Manager"
          value={doctorDetails?.organization?.party_parent_name || "Mahnoor Khan"}
        />
        <InfoRow label="Legacy" value={doctorDetails?.attributes?.legacyCode || "000000"} />
        <InfoRow label="Team" value={doctorDetails?.team_name || "Team Python3333"} />
        <InfoRow label="Channel" value={doctorDetails?.channel_name || "Doctors & HCPs"} />
        <InfoRow label="Total Calls" value="0" />
      </div>
    </div>
  );
}

// Helper component for compact row alignment
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-[#94a3b8] text-sm font-medium whitespace-nowrap">{label}</span>
      <span className="text-[#0f172a] text-sm font-bold text-right truncate" title={value}>
        {value}
      </span>
    </div>
  );
}
