"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface TeamMember {
  teamName: string;
  managerName: string;
  membersCount: number;
  skus: string;
  trend: "up" | "down";
}

export default function AssignedProductTeam() {
  const teams: TeamMember[] = [
    {
      teamName: "Endo-Care North",
      managerName: "Mohammad Fahad",
      membersCount: 22,
      skus: "15mg",
      trend: "up",
    },
    {
      teamName: "Metabolic Warriors",
      managerName: "Shahzeb Khan",
      membersCount: 16,
      skus: "16mg",
      trend: "up",
    },
    {
      teamName: "Elite Nephro Squad",
      managerName: "Mohammad Taha khan",
      membersCount: 25,
      skus: "20mg",
      trend: "up",
    },
    {
      teamName: "Dynamic Life",
      managerName: "Abdul Moiz",
      membersCount: 18,
      skus: "25mg",
      trend: "down",
    },
    {
      teamName: "Vanguard Pharma",
      managerName: "Kashif khan",
      membersCount: 20,
      skus: "30mg",
      trend: "down",
    },
  ];

  return (
    <div className="w-full bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <h2 className="text-[22px] font-bold text-[#334155] mb-8 tracking-tight">
        Assigned Product Team
      </h2>

      {/* Table Labels */}
      <div className="grid grid-cols-5 px-4 mb-4">
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          Team Name
        </span>
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          Manager Name
        </span>
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          Members Count
        </span>
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">SKU's</span>
        <span className="sr-only">Trend</span>
      </div>

      {/* Team Rows */}
      <div className="space-y-3">
        {teams.map((team, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center bg-white border border-gray-50 rounded-xl p-4 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]"
          >
            <span className="text-[#0F172A] font-bold text-sm">{team.teamName}</span>
            <span className="text-[#0F172A] font-bold text-sm">{team.managerName}</span>
            <span className="text-[#0F172A] font-bold text-sm">{team.membersCount}</span>
            <span className="text-[#0F172A] font-bold text-sm">{team.skus}</span>
            <div className="flex justify-end">
              {team.trend === "up" ? (
                <ArrowUp className="text-[#22C55E] w-5 h-5" />
              ) : (
                <ArrowDown className="text-[#EF4444] w-5 h-5" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
