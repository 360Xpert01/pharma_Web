"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";

interface AllocationRecord {
  id: string;
  pulseCode: string;
  employeeName: string;
  email: string;
  totalGiveaways: number;
  totalSamples: number;
  profilePicture?: string;
}

// Mock data - Replace with actual Redux state
const mockAllocations: AllocationRecord[] = [
  {
    id: "1",
    pulseCode: "000125",
    employeeName: "Hassan Ali",
    email: "h.ali@creativedesigns.com",
    totalGiveaways: 6,
    totalSamples: 8,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "2",
    pulseCode: "000126",
    employeeName: "Amina Ahmed",
    email: "a.ahmed@creativedesigns.com",
    totalGiveaways: 20,
    totalSamples: 15,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "3",
    pulseCode: "000127",
    employeeName: "Ravi Kumar",
    email: "r.kumar@creativedesigns.com",
    totalGiveaways: 4,
    totalSamples: 9,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "4",
    pulseCode: "000129",
    employeeName: "Liam Smith",
    email: "l.smith@creativedesigns.com",
    totalGiveaways: 7,
    totalSamples: 5,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "5",
    pulseCode: "000126",
    employeeName: "Sara Khan",
    email: "s.khan@creativedesigns.com",
    totalGiveaways: 10,
    totalSamples: 12,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "6",
    pulseCode: "000131",
    employeeName: "Omar Farooq",
    email: "o.farooq@creativedesigns.com",
    totalGiveaways: 9,
    totalSamples: 14,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "7",
    pulseCode: "000125",
    employeeName: "Hassan Ali",
    email: "h.ali@creativedesigns.com",
    totalGiveaways: 6,
    totalSamples: 8,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "8",
    pulseCode: "000132",
    employeeName: "Emily Johnson",
    email: "e.johnson@creativedesigns.com",
    totalGiveaways: 5,
    totalSamples: 6,
    profilePicture: "/girlPic.svg",
  },
  {
    id: "9",
    pulseCode: "000130",
    employeeName: "Nina Patel",
    email: "n.patel@creativedesigns.com",
    totalGiveaways: 3,
    totalSamples: 11,
    profilePicture: "/girlPic.svg",
  },
];

export default function AllocatedGiveawaysTable() {
  const columns: ColumnDef<AllocationRecord>[] = [
    {
      header: "Pulse Code",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div
          className="text-sm font-bold text-[var(--gray-9)] truncate"
          title={`EMP_${row.original.pulseCode}`}
        >
          EMP_{row.original.pulseCode}
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
            className="rounded-8 flex-shrink-0"
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
        <div className="text-center">
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
        <div className="text-center">
          <span className="text-sm font-bold text-[var(--gray-9)]">
            {row.original.totalSamples.toString().padStart(2, "0")}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <div className="flex justify-end">
          <button className="flex items-center cursor-pointer gap-1 text-sm text-[var(--gray-5)] hover:text-[var(--primary)] transition-colors whitespace-nowrap">
            View Details
            <ChevronRight className="w-5 h-5 text-[var(--primary)]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={mockAllocations}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No allocations found"
      />
    </div>
  );
}
