"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getTeamById, resetGetTeamByIdState } from "@/store/slices/team/getTeamByIdSlice";
import UserProfile from "@/components/UserProfile";
import RegionInformation from "@/components/RegionInformation";
import DoctorStatsCard from "./DoctorStatsCard";
import SalesTrend from "./SalesTrend";
import CenturoTable from "@/components/shared/table/CeturoTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import StatusBadge from "@/components/shared/StatusBadge";
import AnimatedTabs from "@/components/shared/AnimatedTabs";

export default function TeamDetails() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const dispatch = useAppDispatch();

  const { team, loading, error } = useAppSelector((state) => state.getTeamById);
  const [activeTab, setActiveTab] = useState("Members");

  const tabs = [
    { id: "Members", label: "Team Members" },
    { id: "Products", label: "Team Products" },
  ];

  useEffect(() => {
    if (teamId) {
      dispatch(getTeamById(teamId));
    }

    return () => {
      dispatch(resetGetTeamByIdState());
    };
  }, [dispatch, teamId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-destructive">
        Error: {error}
      </div>
    );
  }

  if (!team || !team.result) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">No team details found.</div>
    );
  }

  const { result, teamProducts, teamUsers, memberInfo } = team;

  const defaultCandidate = {
    name: result.name || "N/A",
    email: "",
    phone: "",
    pulseCode: result.pulseCode || "N/A",
  };

  // Join call point names if they exist
  const callPointsDisplay = result.callPoints?.map((cp: any) => cp.name).join(", ") || "N/A";

  const productColumns: ColumnDef<any>[] = [
    {
      header: "Product Name",
      accessorKey: "name",
      cell: ({ row }) => row.original.name || "N/A",
    },
    {
      header: "Formula",
      accessorKey: "productFormula",
      cell: ({ row }) => row.original.productFormula || "N/A",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => <StatusBadge status={row.original.status || "active"} />,
    },
  ];

  const memberColumns: ColumnDef<any>[] = [
    {
      header: "Member Name",
      accessorKey: "user.name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {row.original.user?.profilePicture ? (
              <img
                src={row.original.user.profilePicture}
                alt={row.original.user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">NA</span>
            )}
          </div>
          <span className="font-medium text-gray-9">{row.original.user?.name || "N/A"}</span>
        </div>
      ),
    },
    {
      header: "Role",
      accessorKey: "user.role",
      cell: ({ row }) => row.original.user?.role || "N/A",
    },
    {
      header: "Territory Code",
      accessorKey: "territory.pulseCode",
      cell: ({ row }) => row.original.territory?.pulseCode || "N/A",
    },
  ];

  // Flatten products from the nested teamProducts structure
  const allProducts = teamProducts?.flatMap((tp) => tp.product || []) || [];

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen space-y-6">
      {/* Top Section: Sidebar + Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* LEFT SIDEBAR */}
        <div className="w-full lg:w-[25%] space-y-6">
          <UserProfile candidate={defaultCandidate} />
          <RegionInformation
            status={result.isActive ? "Active" : "Inactive"}
            legacy={result.legacyCode || "N/A"}
            channel={result.channelName || "N/A"}
            callPoint={callPointsDisplay}
          />
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="w-full lg:w-[75%] space-y-6">
          <div className="w-full">
            <DoctorStatsCard />
          </div>
          <div className="w-full">
            <SalesTrend />
          </div>
        </div>
      </div>

      {/* Tabbed Content Section */}
      <div className="bg-white p-6 rounded-8 shadow-soft border border-gray-1">
        <div className="mb-6">
          <AnimatedTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="secondary"
            size="md"
          />
        </div>

        {activeTab === "Members" && (
          <div className="w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-9">Team Members</h3>
            <CenturoTable
              data={teamUsers || []}
              columns={memberColumns}
              loading={false}
              emptyMessage="No members assigned to this team"
            />
          </div>
        )}

        {activeTab === "Products" && (
          <div className="w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-9">Team Products</h3>
            <CenturoTable
              data={allProducts}
              columns={productColumns}
              loading={false}
              emptyMessage="No products assigned to this team"
            />
          </div>
        )}
      </div>
    </div>
  );
}
