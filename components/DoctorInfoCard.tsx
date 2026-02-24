"use client";

import React from "react";
import { Party } from "@/store/slices/party/partygetId";

export default function RegionInfoCard({ partyData }: { partyData: Party }) {
  const doctorDetails = partyData || {};

  return (
    <div className="w-full bg-white shadow-soft rounded-8 p-4 border border-gray-1">
      {/* Card Title - Compact LG */}
      <h3 className="text-lg font-bold text-[#0f172a] mb-6 text-left tracking-tight">
        Doctor Information
      </h3>

      {/* Info Rows - More compact spacing */}
      <div className="space-y-4">
        {/* Status Row */}
        <div className="flex items-center justify-between">
          <span className="text-[#94a3b8] text-sm font-medium">Status</span>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-lg ${
              doctorDetails?.status === "active"
                ? "bg-[#dcfce7] text-[#166534]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {doctorDetails?.status || "active"}
          </span>
        </div>

        <InfoRow label="Specialization" value={doctorDetails?.specialization_name || "N/A"} />
        <InfoRow label="Segment" value={doctorDetails?.segment_name || "N/A"} />
        <InfoRow label="Channel" value={doctorDetails?.channel_name || "N/A"} />
        {/* <InfoRow
          label="Line Manager"
          value={doctorDetails?.organization?.party_parent_name || "N/A"}
        />
        <InfoRow
          label="Legacy Code"
          value={doctorDetails?.attributes?.legacyCode || "N/A"}
        /> */}
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
