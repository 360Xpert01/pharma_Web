"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";

interface CampaignItem {
  id: string;
  name: string;
  month: string;
  date: string;
  condition: string;
  channel: string;
  status: "Approved" | "Rejected" | "Under Review";
}

const campaignData: CampaignItem[] = [
  {
    id: "1",
    name: "Sami Kashan",
    month: "September, 2025",
    date: "2024-01-15",
    condition: "Diabetes",
    channel: "Doctors",
    status: "Under Review",
  },
  {
    id: "2",
    name: "Sami Kashan",
    month: "September, 2025",
    date: "2024-01-15",
    condition: "Cancer",
    channel: "Pharmacy/Stores",
    status: "Rejected",
  },
  {
    id: "3",
    name: "Alex Torres",
    month: "October, 2025",
    date: "2024-02-20",
    condition: "Hypertension",
    channel: "Chain Pharmacy",
    status: "Approved",
  },
  {
    id: "4",
    name: "Liam Brown",
    month: "March, 2026",
    date: "2024-07-20",
    condition: "Depression",
    channel: "Doctors",
    status: "Approved",
  },
  {
    id: "5",
    name: "Jordan Lee",
    month: "November, 2025",
    date: "2024-03-10",
    condition: "Asthma",
    channel: "Pharmacy/Stores",
    status: "Under Review",
  },
  {
    id: "6",
    name: "Rina Patel",
    month: "December, 2025",
    date: "2024-04-05",
    condition: "Heart Disease",
    channel: "Doctors",
    status: "Approved",
  },
  {
    id: "7",
    name: "Max Chen",
    month: "January, 2026",
    date: "2024-05-15",
    condition: "Obesity",
    channel: "GTs",
    status: "Under Review",
  },
  {
    id: "8",
    name: "Ella Rodriguez",
    month: "February, 2026",
    date: "2024-06-25",
    condition: "Cholesterol",
    channel: "Pharmacy/Stores",
    status: "Rejected",
  },
];

export default function CampaignApprovalTable() {
  // Simulate loading and error states (replace with actual API call state)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleRetry = () => {
    window.location.reload();
  };

  const columns: ColumnDef<CampaignItem>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.name}>
          {row.original.name}
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
      header: "Date",
      accessorKey: "date",
      cell: ({ row }) => (
        <div className="t-mute truncate" title={row.original.date}>
          {row.original.date}
        </div>
      ),
    },
    {
      header: "Condition",
      accessorKey: "condition",
      cell: ({ row }) => (
        <div className="t-label truncate" title={row.original.condition}>
          {row.original.condition}
        </div>
      ),
    },
    {
      header: "Channel",
      accessorKey: "channel",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.channel}>
          {row.original.channel}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <StatusBadge status={row.original.status} />
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <Link href={`/dashboard/plan-Request`} className="flex justify-end items-center gap-1">
          <span className="t-sm cursor-pointer whitespace-nowrap">View Details</span>
          <ChevronRight className="w-6 h-6 text-(--primary)" />
        </Link>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={campaignData}
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
