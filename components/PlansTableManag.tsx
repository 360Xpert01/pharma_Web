"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import { fetchCrmSchedule } from "@/store/slices/plan-Manage/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";

interface CampaignItem {
  id: string;
  campaignId: string;
  createdAt: string;
  month: string;
  salesmanId: string;
  salesmanName: string;
  status: "Accepted" | "Rejected" | "Under Review" | string;
  teamId: string;
  year: number;
}

export default function CampaignApprovalTable() {
  const dispatch = useDispatch<any>();
  const { data, pagination, loading, error } = useSelector((state: any) => state.schedule);

  useEffect(() => {
    dispatch(fetchCrmSchedule({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchCrmSchedule({ page: pagination.page, limit: pagination.limit }));
  };

  const handlePaginationChange = (page: number, limit: number) => {
    dispatch(fetchCrmSchedule({ page, limit }));
  };

  const columns: ColumnDef<CampaignItem>[] = [
    {
      header: "Salesman Name",
      accessorKey: "salesmanName",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.salesmanName || "N/A"}>
          {row.original.salesmanName || "N/A"}
        </div>
      ),
    },
    {
      header: "Month",
      accessorKey: "month",
      cell: ({ row }) => (
        <div className="t-td truncate" title={row.original.month || "N/A"}>
          {row.original.month || "N/A"}
        </div>
      ),
    },
    {
      header: "Year",
      accessorKey: "year",
      cell: ({ row }) => (
        <div className="t-mute truncate" title={String(row.original.year || "N/A")}>
          {row.original.year || "N/A"}
        </div>
      ),
    },
    {
      header: "Team Name",
      accessorKey: "teamName",
      cell: ({ row }) => (
        <div className="t-label truncate text-xs" title={row.original.teamName || "N/A"}>
          {row.original.teamName || "N/A"}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex ">
          <StatusBadge status={row.original.status || "N/A"} />
        </div>
      ),
    },
    {
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
        totalItems={pagination.total}
        onPaginationChange={handlePaginationChange}
        pageSize={pagination.limit}
        PaginationComponent={TablePagination}
        emptyMessage="No campaigns found"
      />
    </div>
  );
}
