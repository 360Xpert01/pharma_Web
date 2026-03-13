"use client";

import { useSearchParams } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import RegionInformation from "@/components/RegionInformation";
import MonthlyTargets from "@/components/TargetEmployees";
import WeekelyExpenses from "@/components/WeeklyExpenses";
import MonthlyCalls from "@/components/MonthlyCalls";
import EmployeeGraphRed from "@/components/EmployeeGraphRed";
import MonthlyAttendance from "@/components/MonthlyAttendance";

// ── Dummy distributor lookup ──────────────────────────────────────────────────
const DUMMY_DISTRIBUTORS: Record<string, any> = {
  "dist-001": {
    pulseCode: "DST-0001",
    legacyCode: "LEG-001",
    distributorName: "Alpha Pharma Distributors",
    distributorStatus: "active",
    zone: "North Zone",
    region: "Lahore Region",
    distributorType: "Wholesale",
    totalOrders: 148,
  },
  "dist-002": {
    pulseCode: "DST-0002",
    legacyCode: "LEG-002",
    distributorName: "Beta Medical Supplies",
    distributorStatus: "active",
    zone: "South Zone",
    region: "Karachi Region",
    distributorType: "Retail",
    totalOrders: 93,
  },
  "dist-003": {
    pulseCode: "DST-0003",
    legacyCode: "LEG-003",
    distributorName: "Gamma Health Traders",
    distributorStatus: "inactive",
    zone: "East Zone",
    region: "Islamabad Region",
    distributorType: "Wholesale",
    totalOrders: 12,
  },
  "dist-004": {
    pulseCode: "DST-0004",
    legacyCode: "LEG-004",
    distributorName: "Delta Pharma Network",
    distributorStatus: "active",
    zone: "West Zone",
    region: "Peshawar Region",
    distributorType: "Sub-Distributor",
    totalOrders: 67,
  },
  "dist-005": {
    pulseCode: "DST-0005",
    legacyCode: "LEG-005",
    distributorName: "Epsilon Drug Mart",
    distributorStatus: "active",
    zone: "Central Zone",
    region: "Multan Region",
    distributorType: "Retail",
    totalOrders: 204,
  },
  "dist-006": {
    pulseCode: "DST-0006",
    legacyCode: "LEG-006",
    distributorName: "Zeta MedCare Distributors",
    distributorStatus: "inactive",
    zone: "North Zone",
    region: "Faisalabad Region",
    distributorType: "Wholesale",
    totalOrders: 5,
  },
};

const FALLBACK = DUMMY_DISTRIBUTORS["dist-001"];

// ── Main Component ────────────────────────────────────────────────────────────
export default function DistributorProfileTabs() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const dist = DUMMY_DISTRIBUTORS[id] || FALLBACK;

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
              // email slot → distributor type
              email: dist.distributorType,
              // phone slot → legacy code
              phone: dist.legacyCode,
            }}
          />
          <RegionInformation
            status={statusLabel}
            legacy={dist.legacyCode}
            // team slot → Zone
            team={dist.zone}
            // channel slot → Region
            channel={dist.region}
            // category slot → Distributor Type
            category={dist.distributorType}
            // totalCalls slot → Total Orders
            totalCalls={dist.totalOrders}
          />
        </div>

        {/* Center (5fr) – Monthly Orders + Weekly Expenses */}
        <div className="space-y-6">
          {/* Monthly Orders — same chart as Employee Monthly Targets */}
          <MonthlyTargets
            currentMonth={dist.totalOrders}
            lastMonth={Math.round(dist.totalOrders * 0.8)}
            date="March, 2025"
          />

          {/* Weekly Expenses — reused component (dummy data) */}
          <WeekelyExpenses />
        </div>

        {/* Right (3fr) – Small Stat Charts */}
        <div className="space-y-6">
          <MonthlyCalls totalCalls={dist.totalOrders} percentageChange={12} trend="up" />
          <EmployeeGraphRed />
          <MonthlyAttendance />
        </div>
      </div>
    </div>
  );
}
