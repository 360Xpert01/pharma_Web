"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import UserProfile from "@/components/UserProfile";
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

  return (
    <div className="space-y-6">
      {/* User Profile Section */}
      <UserProfile candidate={candidate} />

      {/* Monthly Targets and Employee Graph */}
      <div className=" flex justify-between gap-6 w-[100%]">
        <div className="w-[60%]">
          <MonthlyTargets currentMonth={75.08} lastMonth={45.27} date="September, 27 2025" />
        </div>
        <div className="w-[40%]">
          <EmployeeGraphRed />
        </div>
      </div>

      {/* Weekly Expenses Chart and Monthly Attendance (Outside tabs) */}
      <div className="w-[100%] flex justify-between ">
        <div className="w-[59%]">
          <WeekelyExpenses />
        </div>
        <div className="w-[39%] space-y-3 mt-3">
          <MonthlyAttendance />
        </div>
      </div>

      {/* By Brands and Country Map */}
      {/* <div className="flex w-[100%] justify-between                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ">
                <div className="w-[30%] h-[100%]">
                    <ByBrands height={395} />
                </div>
                <div className="w-[69%] ">
                    <CountryMap />
                </div>
            </div> */}

      {/* Tab Content */}
      <div className="transition-all bg-(--background) shadow-soft p-5 rounded-8 duration-300">
        {/* Tab Navigation */}
        <div className="my-5">
          <AnimatedTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="secondary"
            size="md"
          />
        </div>

        {activeTab === "Appointments" && (
          <div className="flex w-[100%] justify-between">
            <div className="w-[100%]">
              <TodaysAppointments />
            </div>
            {/* <div className="w-[30%]">
                            <MostSoldProducts weight={100} />
                        </div> */}
          </div>
        )}

        {activeTab === "Attendance" && (
          <div className="w-[100%]">
            <WeeklyAttendance />
          </div>
        )}

        {activeTab === "Expenses" && (
          <div className="w-[100%]">
            <ExpansesListApprove />
          </div>
        )}

        {activeTab === "Samples" && (
          <div className="w-[100%]">
            <SamplesDetail />
          </div>
        )}

        {activeTab === "Giveaways" && (
          <div className="w-[100%]">
            <GiveawaysDetail />
          </div>
        )}

        {activeTab === "Devices" && (
          <div className="w-[100%]">
            <DeviceList />
          </div>
        )}
      </div>
    </div>
  );
}
