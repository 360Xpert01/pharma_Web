"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserById } from "@/store/slices/employee/getUserByIdSlice";

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

type TabType = "Appointments" | "Attendance" | "Expenses" | "Samples" | "Giveaways" | "Devices";

export default function EmployeeProfileTabs({ candidate }: { candidate?: any }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.getUserById);

  const [activeTab, setActiveTab] = useState<TabType>("Appointments");

  const tabs = [
    { id: "Appointments" as TabType, label: "Appointments" },
    { id: "Attendance" as TabType, label: "Attendance" },
    { id: "Expenses" as TabType, label: "Expenses" },
    { id: "Samples" as TabType, label: "Samples" },
    { id: "Giveaways" as TabType, label: "Giveaways" },
    { id: "Devices" as TabType, label: "Devices" },
  ];

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId]);

  if (!user) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-8 border-2 border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">No employee data found</p>
      </div>
    );
  }

  const fullName = [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" ");

  return (
    <div className="space-y-6">
      {/* Three Column Grid Layout - 25% | 50% | 25% */}
      <div className="grid grid-cols-[2fr_5fr_3fr] gap-6 items-start">
        {/* Left Column (25%) - User Profile & Region Info */}
        <div className="space-y-6">
          <UserProfile
            candidate={{
              name: fullName,
              email: user.email,
              phone: user.mobileNumber || "N/A",
              pulseCode: user.pulseCode,
              profilePicture: user.profilePicture || "/girlPic.png",
              fullAddress: user.fullAddress || "N/A",
              dob: user.dob || "N/A",
            }}
          />
          <RegionInformation
            lineManager={
              user.supervisor ? `${user.supervisor.firstName} ${user.supervisor.lastName}` : "N/A"
            }
            legacy={user.empLegacyCode || "N/A"}
            channel={user.teams?.[0]?.channel?.name || "N/A"}
            team={user.teams?.[0]?.name || "N/A"}
            totalCalls={user.totalCalls || 0}
            status={user.status || "N/A"}
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
