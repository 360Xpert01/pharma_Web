"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getAllocationList,
  resetAllocationListState,
} from "@/store/slices/allocation/getAllocationListSlice";
import EditIcon from "@/components/svgs/edit-icon";

interface AllocationRecord {
  userId: string;
  pulseCode: string;
  employeeName: string;
  email: string;
  totalGiveaways: number;
  totalSamples: number;
  profilePicture?: string;
}

export default function AllocatedGiveawaysTable() {
  const dispatch = useAppDispatch();
  const { allocations, loading, error } = useAppSelector((state) => state.allocationList);

  // Fetch allocation data on mount and when page becomes visible
  useEffect(() => {
    dispatch(getAllocationList());

    // Refresh data when page becomes visible (e.g., after navigation back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        dispatch(getAllocationList());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      dispatch(resetAllocationListState());
    };
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getAllocationList());
  };

  const handleViewDetails = (userId: string) => {
    // TODO: Implement view details functionality
    console.log("View details for user:", userId);
  };

  const columns: ColumnDef<AllocationRecord>[] = [
    {
      header: "ID",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div
          className="text-sm font-bold text-[var(--gray-9)] truncate"
          title={row.original.pulseCode}
        >
          {row.original.pulseCode}
        </div>
      ),
    },
    {
      header: "Employee Name",
      accessorKey: "employeeName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src={row.original.profilePicture || "/girlPic.svg"}
            alt={row.original.employeeName}
            width={40}
            height={40}
            className="rounded-8 flex-shrink-0 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p
              className="font-semibold text-[var(--gray-9)] truncate text-sm"
              title={row.original.employeeName}
            >
              {row.original.employeeName}
            </p>
            <span
              className="text-xs text-[var(--gray-5)] truncate block"
              title={row.original.email}
            >
              {row.original.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Total Giveaways",
      accessorKey: "totalGiveaways",
      cell: ({ row }) => (
        <div className="flex justify-right px-10">
          <span className="text-sm font-bold text-[var(--gray-9)]">
            {row.original.totalGiveaways.toString().padStart(2, "0")}
          </span>
        </div>
      ),
    },
    {
      header: "Total Samples",
      accessorKey: "totalSamples",
      cell: ({ row }) => (
        <div className="flex justify-right px-10">
          <span className="text-sm font-bold text-[var(--gray-9)]">
            {row.original.totalSamples.toString().padStart(2, "0")}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(row.original.userId);
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="View Details"
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
        data={allocations}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No allocations found"
      />
    </div>
  );
}
