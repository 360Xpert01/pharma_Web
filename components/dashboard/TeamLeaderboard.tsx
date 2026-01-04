"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateTeamMembers, type TeamMember } from "./teamLeaderboardData";

interface TeamLeaderboardProps {
  members?: TeamMember[];
  className?: string;
}

const tabs = [
  { id: "orders", label: "ORDERS", color: "bg-[#0f72f4] text-white" },
  { id: "callCompletion", label: "CALL COMPLETION", color: "bg-[#1dc9b7] text-white" },
  { id: "coverage", label: "COVERAGE", color: "bg-[#4caf50] text-white" },
  { id: "complianceScore", label: "COMPLIANCE SCORE", color: "bg-[#ff5722] text-white" },
];

export default function TeamLeaderboard({ members, className }: TeamLeaderboardProps) {
  const teamMembers = members || generateTeamMembers();
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-[#ffa500]" />;
      case 2:
        return <Award className="w-5 h-5 text-[#c0c0c0]" />;
      case 3:
        return <Medal className="w-5 h-5 text-[#cd7f32]" />;
      default:
        return (
          <div className="w-5 h-5 flex items-center justify-center">
            <span className="text-[#0f72f4] font-semibold text-sm">{rank}</span>
          </div>
        );
    }
  };

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Card className={cn("shadow-soft", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="t-h4 text-(--gray-9)">Team Leaderboard</CardTitle>
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => (
                <Badge
                  key={tab.id}
                  className={cn(
                    "text-[10px] font-semibold px-2.5 py-1 border-0 rounded-8",
                    tab.color
                  )}
                >
                  {tab.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Scrollable Container - Hidden scrollbar, shows ~4 members */}
          <div
            className="max-h-[260px] overflow-y-auto space-y-3 hide-scrollbar"
            style={
              {
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              } as React.CSSProperties
            }
          >
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 p-3 rounded-8 hover:bg-[var(--gray-0)] transition-colors"
              >
                {/* Rank Icon */}
                <div className="flex-shrink-0">{getRankIcon(member.rank)}</div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#0f72f4] to-[#7076f6] flex items-center justify-center text-white font-semibold text-sm">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                {/* Name and Role */}
                <div className="flex-1 min-w-0">
                  <h4 className="t-label-b text-[var(--gray-9)] truncate">{member.name}</h4>
                  <p className="t-cap text-[var(--gray-5)] truncate">{member.role}</p>
                </div>

                {/* All 4 Metrics in a Row */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  {/* Orders - Blue */}
                  <span className="t-label-b text-[#0f72f4] min-w-[50px] text-center">
                    {member.orders}
                  </span>

                  {/* Call Completion - Cyan */}
                  <span className="t-label-b text-[#00bcd4] min-w-[50px] text-center">
                    {member.callCompletion}%
                  </span>

                  {/* Coverage - Green */}
                  <span className="t-label-b text-[#4caf50] min-w-[50px] text-center">
                    {member.coverage}%
                  </span>

                  {/* Compliance Score - Red/Orange */}
                  <span className="t-label-b text-[#ff5722] min-w-[50px] text-center">
                    {member.complianceScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
