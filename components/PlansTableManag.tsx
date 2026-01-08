"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
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
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.schedule);

  useEffect(() => {
    dispatch(fetchCrmSchedule());
  }, [dispatch]);

  const handleRetry = () => {
    window.location.reload();
  };

  const columns: ColumnDef<CampaignItem>[] = [
    {
      header: "Salesman Name",
      accessorKey: "salesmanName",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.salesmanName}>
          {row.original.salesmanName}
        </div>
      ),
    },
    {
      header: "Month",
      accessorKey: "month",
      cell: ({ row }) => (
        <div className="t-td truncate" title={row.original.month}>
          {row.original.month}
        </div>
      ),
    },
    {
      header: "Year",
      accessorKey: "year",
      cell: ({ row }) => (
        <div className="t-mute truncate" title={String(row.original.year)}>
          {row.original.year}
        </div>
      ),
    },
    {
      header: "Team Name",
      accessorKey: "teamName",
      cell: ({ row }) => (
        <div className="t-label truncate text-xs" title={row.original.teamName}>
          {row.original.teamName}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex ">
          <StatusBadge status={row.original.status} />
        </div>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <div className="t-mute truncate text-xs" title={row.original.createdAt}>
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <Link
          href={`/dashboard/plan-Request/${row.original.id}`}
          className="flex justify-end items-center gap-1"
        >
          <span className="t-sm cursor-pointer whitespace-nowrap">View Details</span>
          <ChevronRight className="w-6 h-6 text-(--primary)" />
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
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No campaigns found"
      />
    </div>
  );
}
