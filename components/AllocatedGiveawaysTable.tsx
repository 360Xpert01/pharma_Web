"use client";

import React, { useEffect, useState } from "react";
import ImageWithFallback from "@/components/shared/ImageWithFallback";
import { useRouter } from "next/navigation";
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

export default function AllocatedGiveawaysTable({
  searchTerm = "",
  employeeId = "",
}: {
  searchTerm?: string;
  employeeId?: string;
}) {
  const dispatch = useAppDispatch();
  const { allocations, loading, error, pagination } = useAppSelector(
    (state) => state.allocationList
  );

  const router = useRouter();
  const pageSize = 10;
  const [sorting, setSorting] = useState<any[]>([]);

  // Fetch allocation data on mount and when states change
  useEffect(() => {
    const sortField = sorting.length > 0 ? sorting[0].id : "pulseCode";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "desc";

    dispatch(
      getAllocationList({
        search: searchTerm,
        page: 1,
        limit: pageSize,
        employeeId,
        sort: sortField,
        order: sortOrder as any,
      })
    );

    // Refresh data when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const currentSortField = sorting.length > 0 ? sorting[0].id : "pulseCode";
        const currentSortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "desc";
        dispatch(
          getAllocationList({
            search: searchTerm,
            page: 1,
            limit: pageSize,
            employeeId,
            sort: currentSortField,
            order: currentSortOrder as any,
          })
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      dispatch(resetAllocationListState());
    };
  }, [dispatch, searchTerm, employeeId, sorting]);

  const handleRetry = () => {
    dispatch(getAllocationList({ search: searchTerm, page: 1, limit: pageSize, employeeId }));
  };

  const handlePageChange = (page: number, size: number) => {
    const sortField = sorting.length > 0 ? sorting[0].id : "pulseCode";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "desc";

    dispatch(
      getAllocationList({
        search: searchTerm,
        page,
        limit: size,
        employeeId,
        sort: sortField,
        order: sortOrder as any,
      })
    );
  };

  const handleViewDetails = (userId: string) => {
    router.push(`/dashboard/UpdateAllocateGivewaySample?userId=${userId}`);
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
        <div className="flex items-center gap-3 cursor-pointer group">
          <ImageWithFallback
            src={row.original.profilePicture}
            alt={row.original.employeeName}
            width={36}
            height={36}
            className="rounded-8 flex-shrink-0 object-cover"
            fallbackSrc="/girlPic.png"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[var(--gray-9)] truncate font-medium text-sm">
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
        enableSorting={true}
        serverSidePagination={true}
        serverSideSorting={true}
        totalItems={pagination?.total || 0}
        pageSize={pageSize}
        onPaginationChange={handlePageChange}
        onSortChange={(newSorting) => setSorting(newSorting)}
        PaginationComponent={TablePagination}
        emptyMessage="No allocations found"
      />
    </div>
  );
}
