"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import { fetchCrmSchedule } from "@/store/slices/plan-Manage/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePermission } from "@/hooks/usePermission";

interface CampaignItem {
  id: string;
  campaignId: string;
  createdAt: string;
  month: string | number;
  salesmanId: string;
  salesmanName: string;
  status: "Accepted" | "Rejected" | "Under Review" | string;
  teamId: string;
  year: number;
  teamName?: string;
}

export default function CampaignApprovalTable({
  searchTerm = "",
  filters,
}: {
  searchTerm?: string;
  filters?: {
    status?: string;
    month?: number | string;
    year?: number | string;
    teamId?: string;
  };
}) {
  const dispatch = useDispatch<any>();
  const { isManager } = usePermission();

  const { data, loading, error, pagination } = useSelector((state: any) => state.schedule);

  const [sorting, setSorting] = useState<SortingState>([]);

  // Map UI column ids to backend sort field names (schedule.repository.js sortMap)
  const SORT_FIELD_MAP: Record<string, string> = {
    salesmanName: "salesmanName",
    month: "month",
    year: "year",
    teamName: "teamName",
    status: "status",
    createdAt: "createdAt",
  };

  const buildDispatchParams = (page: number, limit: number) => {
    const rawSortField = sorting.length > 0 ? sorting[0].id : "createdAt";
    const sortField = SORT_FIELD_MAP[rawSortField] ?? "createdAt";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "desc";

    return {
      page,
      limit,
      search: searchTerm,
      sort: sortField,
      order: sortOrder,
      ...(filters?.status && { status: filters.status }),
      ...(filters?.month && { month: filters.month }),
      ...(filters?.year && { year: filters.year }),
    };
  };

  useEffect(() => {
    dispatch(fetchCrmSchedule(buildDispatchParams(1, 10)));
  }, [dispatch, searchTerm, filters, sorting]);

  const handleRetry = () => {
    dispatch(fetchCrmSchedule(buildDispatchParams(pagination.page, pagination.limit)));
  };

  const handlePaginationChange = (page: number, limit: number) => {
    dispatch(fetchCrmSchedule(buildDispatchParams(page, limit)));
  };

  const getMonthDisplay = (m: string | number) => {
    if (typeof m === "number") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months[m - 1] || String(m);
    }
    return m || "N/A";
  };

  const columns: ColumnDef<CampaignItem>[] = [
    {
      id: "salesmanName",
      header: "Salesman Name",
      accessorKey: "salesmanName",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.salesmanName || "N/A"}>
          {row.original.salesmanName || "N/A"}
        </div>
      ),
    },
    {
      id: "month",
      header: "Month",
      accessorKey: "month",
      cell: ({ row }) => (
        <div className="t-td truncate" title={String(row.original.month) || "N/A"}>
          {getMonthDisplay(row.original.month)}
        </div>
      ),
    },
    {
      id: "year",
      header: "Year",
      accessorKey: "year",
      cell: ({ row }) => (
        <div className="t-mute truncate" title={String(row.original.year || "N/A")}>
          {row.original.year || "N/A"}
        </div>
      ),
    },
    {
      id: "teamName",
      header: "Team Name",
      accessorKey: "teamName",
      cell: ({ row }) => (
        <div className="t-label truncate text-xs" title={row.original.teamName || "N/A"}>
          {row.original.teamName || "N/A"}
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex ">
          <StatusBadge status={row.original.status || "N/A"} />
        </div>
      ),
    },
    {
      id: "createdAt",
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <div className="t-mute truncate text-xs" title={row.original.createdAt || "N/A"}>
          {row.original.createdAt ? new Date(row.original.createdAt).toLocaleDateString() : "N/A"}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <Link
          href={`/dashboard/plan-Request/${row.original.id}`}
          className="flex justify-end items-center"
        >
          <Eye className="w-5 h-5 text-(--primary) cursor-pointer" />
        </Link>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={data}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        serverSidePagination={true}
        enableSorting={true}
        serverSideSorting={true}
        onSortChange={(newSorting) => setSorting(newSorting)}
        sorting={sorting}
        totalItems={pagination.total}
        onPaginationChange={handlePaginationChange}
        pageSize={pagination.limit}
        PaginationComponent={TablePagination}
        emptyMessage="No campaigns found"
      />
    </div>
  );
}
