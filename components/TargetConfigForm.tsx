"use client";

import React from "react";
import { FormInput, FormSelect } from "@/components/form";

interface TargetConfigFormProps {
  selectedTeam: string;
  targetTeams: any[]; // Teams array
  targetMonthValue?: string;
  areaManager?: string;
  channelName?: string;
  territory?: string;
  onTeamChange: (value: string) => void;
  onMonthChange: (value: string) => void;
}

export default function TargetConfigForm({
  selectedTeam,
  targetTeams,
  targetMonthValue,
  areaManager = "N/A",
  channelName = "N/A",
  territory = "N/A",
  onTeamChange,
  onMonthChange,
}: TargetConfigFormProps) {
  const monthOptions = [
    { value: "january-2026", label: "January 2026" },
    { value: "february-2026", label: "February 2026" },
    { value: "march-2026", label: "March 2026" },
    { value: "april-2026", label: "April 2026" },
    { value: "may-2026", label: "May 2026" },
    { value: "june-2026", label: "June 2026" },
    { value: "july-2026", label: "July 2026" },
    { value: "august-2026", label: "August 2026" },
    { value: "september-2026", label: "September 2026" },
    { value: "october-2026", label: "October 2026" },
    { value: "november-2026", label: "November 2026" },
    { value: "december-2026", label: "December 2026" },
  ];

  return (
    <div className="space-y-8">
      {/* Primary Information Header */}
      <div>
        <h2 className="t-h2 text-(--gray-9) mb-2">Primary Information</h2>
      </div>

      {/* First Row: Team Selector, Month Selector, Helper Text */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4">
          <FormSelect
            label="Select Team"
            name="team"
            value={selectedTeam}
            onChange={onTeamChange}
            options={targetTeams?.map((team: any) => ({ value: team.id, label: team.name }))}
            placeholder="e.g, Endo-Care North"
            required
          />
        </div>

        <div className="md:col-span-4">
          <FormSelect
            label="Target Month"
            name="month"
            value={targetMonthValue || ""}
            onChange={onMonthChange}
            options={monthOptions}
            placeholder="Select Month"
            required
          />
        </div>

        <div className="md:col-span-4 self-center">
          <p className="t-sm text-(--gray-5) leading-snug">
            You can easily name the role you want and take on different responsibilities.
          </p>
        </div>
      </div>

      {/* Second Row: Read-only Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormInput
          label="Area Manager"
          name="areaManager"
          value={areaManager}
          onChange={() => {}}
          placeholder="e.g. Abdul Aziz Warisi"
          readOnly
        />

        <FormInput
          label="Channel Name"
          name="channelName"
          value={channelName}
          onChange={() => {}}
          placeholder="e.g. Chain Pharmacy"
          readOnly
        />

        <FormInput
          label="Territory"
          name="territory"
          value={territory}
          onChange={() => {}}
          placeholder="e.g. T1"
          readOnly
        />
      </div>
    </div>
  );
}
