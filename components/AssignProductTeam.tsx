"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  totalMemberCount: number;
}

interface AssignedProductTeamProps {
  teams?: TeamMember[];
}

export default function AssignedProductTeam({ teams = [] }: AssignedProductTeamProps) {
  return (
    <div className="w-full bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <h2 className="text-[22px] font-bold text-[#334155] mb-8 tracking-tight">
        Assigned Product Team
      </h2>

      {/* Table Labels */}
      <div className="grid grid-cols-5 px-4 mb-4">
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider col-span-2">
          Team Name
        </span>
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          Members Count
        </span>
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">SKU's</span>
        <span className="sr-only">Trend</span>
      </div>

      {/* Team Rows */}
      <div className="space-y-3">
        {teams.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No teams assigned</div>
        ) : (
          teams.map((team, index) => (
            <div
              key={team.id || index}
              className="grid grid-cols-5 items-center bg-white border border-gray-50 rounded-xl p-4 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]"
            >
              <span className="text-[#0F172A] font-bold text-sm col-span-2">{team.name}</span>
              <span className="text-[#0F172A] font-bold text-sm">{team.totalMemberCount}</span>
              <span className="text-[#0F172A] font-bold text-sm">-</span>
              <div className="flex justify-end">
                <ArrowUp className="text-[#22C55E] w-5 h-5" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
