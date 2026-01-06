"use client";

import React from "react";
import { FormInput, FormSelect } from "@/components/form";

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
  // Team options
  const teamOptions = [
    { value: "team1", label: "High Blood Pressure Team" },
    { value: "team2", label: "Diabetes Management Team" },
    { value: "team3", label: "Cardiology Team" },
  ];

  // Month options
  const monthOptions = [
    { value: "january", label: "January 2025" },
    { value: "february", label: "February 2025" },
    { value: "march", label: "March 2025" },
    { value: "april", label: "April 2025" },
    { value: "may", label: "May 2025" },
    { value: "june", label: "June 2025" },
  ];

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div className="mb-6">
        <h3 className="t-h2 text-(--gray-9)">Set Target</h3>
        <p className="t-sm text-(--gray-5)">Select team</p>
      </div>

      {/* First Row: Team Selector, Month Selector, Helper Text */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Select Team */}
        <FormSelect
          label="Select Team"
          name="team"
          value={selectedTeam}
          onChange={onTeamChange}
          options={teamOptions}
          placeholder="Search teams"
          required
        />

        {/* Target Month */}
        <FormSelect
          label="Target Month"
          name="month"
          value={targetMonth}
          onChange={onMonthChange}
          options={monthOptions}
          placeholder="Select Month"
          required
        />

        {/* Helper Text */}
        <div className="flex items-center mt-6">
          <p className="t-md text-(--gray-5) leading-relaxed">
            You can easily name the role you want and take on different responsibilities.
          </p>
        </div>
      </div>

      {/* Second Row: Read-only Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Team Role Code */}
        <FormInput
          label="Team Role Code"
          name="teamRoleCode"
          value={teamRoleCode}
          onChange={() => {}}
          placeholder="PL_SPT_017284"
          readOnly
          required
        />

        {/* Team Name */}
        <FormInput
          label="Team Name"
          name="teamName"
          value={teamName}
          onChange={() => {}}
          placeholder="High Blood Pressure"
          readOnly
        />

        {/* Channel Name */}
        <FormInput
          label="Channel Name"
          name="channelName"
          value={channelName}
          onChange={() => {}}
          placeholder="Chain Pharmacy"
          readOnly
        />

        {/* Call Point */}
        <FormInput
          label="Call Point"
          name="callPoint"
          value={callPoint}
          onChange={() => {}}
          placeholder="36 Export Solutions"
          readOnly
        />
      </div>
    </div>
  );
}
