"use client";

import React from "react";

interface TargetConfigFormProps {
  selectedTeam: string;
  targetMonth: string;
  teamRoleCode: string;
  teamName: string;
  channelName: string;
  callPoint: string;
  onTeamChange: (value: string) => void;
  onMonthChange: (value: string) => void;
}

export default function TargetConfigForm({
  selectedTeam,
  targetMonth,
  teamRoleCode,
  teamName,
  channelName,
  callPoint,
  onTeamChange,
  onMonthChange,
}: TargetConfigFormProps) {
  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="mb-6">
        <h3 className="t-lg">Set Target</h3>
        <p className="t-sm">Select team</p>
      </div>

      {/* First Row: Team Selector, Month Selector, Helper Text */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Select Team */}
        <div>
          <label className="t-label block mb-2">
            Select Team<span className="text-(--destructive)">*</span>
          </label>
          <select
            value={selectedTeam}
            onChange={(e) => onTeamChange(e.target.value)}
            className="w-full px-4 py-3 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none bg-(--light) text-(--gray-7) cursor-pointer"
          >
            <option value="">Search teams</option>
            <option value="team1">High Blood Pressure Team</option>
            <option value="team2">Diabetes Management Team</option>
            <option value="team3">Cardiology Team</option>
          </select>
        </div>

        {/* Target Month */}
        <div>
          <label className="t-label block mb-2">
            Target Month<span className="text-(--destructive)">*</span>
          </label>
          <select
            value={targetMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="w-full px-4 py-3 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none bg-(--light) text-(--gray-7) cursor-pointer"
          >
            <option value="">Select Month</option>
            <option value="january">January 2025</option>
            <option value="february">February 2025</option>
            <option value="march">March 2025</option>
            <option value="april">April 2025</option>
            <option value="may">May 2025</option>
            <option value="june">June 2025</option>
          </select>
        </div>

        {/* Helper Text */}
        <div className="flex items-center mt-6">
          <p className="t-md leading-relaxed">
            You can easily name the role you want and take on different responsibilities.
          </p>
        </div>
      </div>

      {/* Second Row: Read-only Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Team Role Code */}
        <div>
          <label className="t-label block mb-2">
            Team Role Code<span className="text-(--destructive)">*</span>
          </label>
          <input
            type="text"
            value={teamRoleCode}
            readOnly
            disabled
            className="w-full px-4 py-3 border border-(--gray-3) rounded-8 bg-(--gray-0) text-(--gray-6) cursor-not-allowed outline-none"
            placeholder="PL_SPT_017284"
          />
        </div>

        {/* Team Name */}
        <div>
          <label className="t-label block mb-2">Team Name</label>
          <input
            type="text"
            value={teamName}
            readOnly
            disabled
            className="w-full px-4 py-3 border border-(--gray-3) rounded-8 bg-(--gray-0) text-(--gray-6) cursor-not-allowed outline-none"
            placeholder="High Blood Pressure"
          />
        </div>

        {/* Channel Name */}
        <div>
          <label className="t-label block mb-2">Channel Name</label>
          <input
            type="text"
            value={channelName}
            readOnly
            disabled
            className="w-full px-4 py-3 border border-(--gray-3) rounded-8 bg-(--gray-0) text-(--gray-6) cursor-not-allowed outline-none"
            placeholder="Chain Pharmacy"
          />
        </div>

        {/* Call Point */}
        <div>
          <label className="t-label block mb-2">Call Point</label>
          <input
            type="text"
            value={callPoint}
            readOnly
            disabled
            className="w-full px-4 py-3 border border-(--gray-3) rounded-8 bg-(--gray-0) text-(--gray-6) cursor-not-allowed outline-none"
            placeholder="36 Export Solutions"
          />
        </div>
      </div>
    </div>
  );
}
