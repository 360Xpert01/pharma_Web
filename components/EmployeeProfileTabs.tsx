"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import UserProfile from "@/components/UserProfile";
import RegionInformation from "@/components/RegionInformation";
import MonthlyTargets from "@/components/TargetEmployees";
import EmployeeGraphRed from "@/components/EmployeeGraphRed";
import WeeklyAttendance from "@/components/WeeklyAttendance";
import MonthlyAttendance from "@/components/MonthlyAttendance";
import WeekelyExpenses from "@/components/WeeklyExpenses";
import ExpansesListApprove from "@/components/ExpansesListApprove";
import TodaysAppointments from "@/components/TodayAppoinment";
import SamplesDetail from "@/components/SamplesDetail";
import GiveawaysDetail from "@/components/GiveawaysDetail";
import DeviceList from "@/components/DeviceList";
import AnimatedTabs from "@/components/shared/AnimatedTabs";
import MonthlyCalls from "@/components/MonthlyCalls";
import Image from "next/image";

type TabType = "Appointments" | "Attendance" | "Expenses" | "Samples" | "Giveaways" | "Devices";

interface EmployeeProfileTabsProps {
  candidate?: {
    name: string;
    email: string;
    phone: string;
    reportingManager: string;
    campaign: string;
    requestedMonth: string;
    channel: string;
    status: string;
    totalCalls: string;
  };
}

export default function EmployeeProfileTabs({ candidate }: EmployeeProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("Appointments");

  const tabs = [
    { id: "Appointments" as TabType, label: "Appointments" },
    { id: "Attendance" as TabType, label: "Attendance" },
    { id: "Expenses" as TabType, label: "Expenses" },
    { id: "Samples" as TabType, label: "Samples" },
    { id: "Giveaways" as TabType, label: "Giveaways" },
    { id: "Devices" as TabType, label: "Devices" },
  ];

  // Default candidate data
  const defaultCandidate = {
    name: "Mohammad Amir",
    email: "samikashan0099@gmail.com",
    phone: "+92 312 283 8270",
    reportingManager: "Abdul Aziz Warsi",
    campaign: "Diabetics",
    requestedMonth: "January 2025",
    channel: "Doctors",
    status: "Under Review",
    totalCalls: "220",
  };

  const employeeData = candidate || defaultCandidate;

  return (
    <div className="space-y-6">
      {/* Three Column Grid Layout - 25% | 50% | 25% */}
      <div className="grid grid-cols-[2fr_5fr_3fr] gap-6 items-start">
        {/* Left Column (25%) - User Profile & Region Info */}
        <div className="space-y-6">
          <UserProfile candidate={employeeData} />
          <RegionInformation
            lineManager={employeeData.reportingManager}
            legacy="000124"
            channel={employeeData.channel}
            team={employeeData.campaign}
            totalCalls={employeeData.totalCalls}
            status={employeeData.status}
          />
        </div>

        {/* Middle Column (50%) - Large Data Visualizations */}
        <div className="space-y-6">
          {/* Monthly Targets Bar Chart */}
          <MonthlyTargets currentMonth={75.08} lastMonth={45.27} date="September, 27 2025" />

          {/* Weekly Expenses Area/Wave Chart */}
          <WeekelyExpenses />
        </div>

        {/* Right Column (25%) - Mini Charts Stack */}
        <div className="space-y-6">
          <MonthlyCalls totalCalls={150} percentageChange={12} trend="up" />
          <EmployeeGraphRed />
          <MonthlyAttendance />
        </div>
      </div>

      {/* Tab Content - Full Width Below */}
      <div className="bg-background shadow-soft p-6 rounded-8">
        {/* Tab Navigation */}
        <div className="mb-6">
          <AnimatedTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="secondary"
            size="md"
          />
        </div>

        {activeTab === "Appointments" && (
          <div className="w-full">
            <TodaysAppointments />
          </div>
        )}

        {activeTab === "Attendance" && (
          <div className="w-full">
            <WeeklyAttendance />
          </div>
        )}

        {activeTab === "Expenses" && (
          <div className="w-full">
            <ExpansesListApprove />
          </div>
        )}

        {activeTab === "Samples" && (
          <div className="w-full">
            <SamplesDetail />
          </div>
        )}

        {activeTab === "Giveaways" && (
          <div className="w-full">
            <GiveawaysDetail />
          </div>
        )}

        {activeTab === "Devices" && (
          <div className="w-full">
            <DeviceList />
          </div>
        )}
      </div>
    </div>
  );
}
