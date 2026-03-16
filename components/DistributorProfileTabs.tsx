"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getDistributorById } from "@/store/slices/distributor/getDistributorByIdSlice";
import UserProfile from "@/components/UserProfile";
import RegionInformation from "@/components/RegionInformation";
import MonthlyTargets from "@/components/TargetEmployees";
import WeekelyExpenses from "@/components/WeeklyExpenses";
import MonthlyCalls from "@/components/MonthlyCalls";
import EmployeeGraphRed from "@/components/EmployeeGraphRed";
import MonthlyAttendance from "@/components/MonthlyAttendance";

export default function DistributorProfileTabs() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const { distributor: dist, loading, error } = useAppSelector((s) => s.distributorById);

  useEffect(() => {
    if (id) {
      dispatch(getDistributorById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-(--primary)" />
      </div>
    );
  }

  if (error || !dist) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="t-lg t-err">{error || "Distributor not found"}</p>
      </div>
    );
  }

  const statusLabel = dist.distributorStatus === "active" ? "Active" : "Inactive";

  return (
    <div className="space-y-6">
      {/* ── 3-Column Grid: 2fr | 5fr | 3fr — same as Employee Profile ── */}
      <div className="grid grid-cols-[2fr_5fr_3fr] gap-6 items-start">
        {/* Left (2fr) – Profile Card + Distributor Info */}
        <div className="space-y-6">
          <UserProfile
            candidate={{
              name: dist.distributorName,
              pulseCode: dist.pulseCode,
              email: dist.distributorTypeName || dist.distributorTypeId,
              phone: dist.legacyCode,
              profilePicture: dist.imageUrl,
            }}
          />
          <RegionInformation
            status={statusLabel}
            legacy={dist.legacyCode}
            team={
              dist.zoneName
                ? dist.zoneDescription
                  ? `${dist.zoneName} - ${dist.zoneDescription}`
                  : dist.zoneName
                : dist.zoneId
            }
            channel={
              dist.regionName
                ? dist.regionDescription
                  ? `${dist.regionName} - ${dist.regionDescription}`
                  : dist.regionName
                : dist.regionId
            }
            category={dist.distributorTypeName || dist.distributorTypeId}
            totalCalls={0} // dummy stat
          />
        </div>

        {/* Center (5fr) – Monthly Orders + Weekly Expenses */}
        <div className="space-y-6">
          <MonthlyTargets currentMonth={0} lastMonth={0} date="March, 2025" />
          <WeekelyExpenses />
        </div>

        {/* Right (3fr) – Small Stat Charts */}
        <div className="space-y-6">
          <MonthlyCalls totalCalls={0} percentageChange={0} trend="up" />
          <EmployeeGraphRed />
          <MonthlyAttendance />
        </div>
      </div>
    </div>
  );
}
