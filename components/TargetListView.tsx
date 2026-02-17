"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import { getTargetList, resetTargetListState } from "@/store/slices/target/getTargetListSlice";
import EditIcon from "@/components/svgs/edit-icon";
import TargetExpandedRow from "@/components/TargetExpandedRow";

interface Product {
  id: string;
  productName: string;
  targetPackets: number;
  achievementPercentage: number;
}

interface TargetListItem {
  userId: string;
  username: string;
  profilePic: string | null;
  roleName: string;
  teamName: string;
  channelId: string;
  channelName: string;
  lineManagerId: string;
  lineManagerName: string;
  targetId: string;
  targetMonth: number;
  targetYear: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  territory?: string;
  tags?: string[];
  products: Product[];
}

// Helper function to get month name
const getMonthName = (month: number): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[month - 1] || "";
};

export default function TargetListView() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { targets, loading, error } = useAppSelector((state) => state.targetList);

  // Fetch target list on mount
  useEffect(() => {
    dispatch(getTargetList());

    return () => {
      dispatch(resetTargetListState());
    };
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getTargetList());
  };

  const filteredTargets = useMemo(() => {
    return targets.filter((target) => {
      const matchesSearch =
        target.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        target.teamName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, targets]);

  const handleViewDetails = (e: React.MouseEvent, targetId: string) => {
    e.stopPropagation();
    router.push(`/dashboard/SetTarget?targetId=${targetId}`);
  };

  const columns: ColumnDef<TargetListItem>[] = [
    {
      header: "Month",
      accessorKey: "targetMonth",
      cell: ({ row }) => (
        <div className="t-label-b">
          {getMonthName(row.original.targetMonth)} {row.original.targetYear}
        </div>
      ),
    },
    {
      header: "Employee",
      accessorKey: "username",
      cell: ({ row }) => (
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src={row.original.profilePic || "/girlPic.svg"}
            alt={row.original.username}
            width={40}
            height={40}
            className="rounded-8 flex-shrink-0 object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="t-label-b truncate" title={row.original.username}>
              {row.original.username}
            </h3>
            <p className="t-cap truncate" title={row.original.roleName}>
              {row.original.roleName}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Team",
      accessorKey: "teamName",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.teamName}>
          {row.original.teamName}
        </div>
      ),
    },
    {
      header: "Channel",
      accessorKey: "channelName",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.channelName}>
          {row.original.channelName}
        </div>
      ),
    },
    {
      header: "Territory",
      accessorKey: "territory",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.territory || "N/A"}>
          {row.original.territory || "N/A"}
        </div>
      ),
    },
    {
      header: "Supervisor",
      accessorKey: "lineManagerName",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.lineManagerName}>
          {row.original.lineManagerName}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              row.toggleExpanded();
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title={row.getIsExpanded() ? "Collapse" : "Expand"}
          >
            <EyeIcon />
          </button> */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(e, row.original.targetId);
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="Edit Target"
          >
            <EditIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={filteredTargets}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No targets found"
        enableExpanding={true}
        renderExpandedRow={(target) => <TargetExpandedRow target={target} />}
      />
    </div>
  );
}
