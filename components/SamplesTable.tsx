"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";

interface Sample {
  id: string;
  date: string;
  name: string;
  type: string;
  available: number;
  allocated: number;
  status: "In Stock" | "Out of Stock" | "Low Stock";
}

const sampleData: Sample[] = [
  {
    id: "SAMP01",
    date: "2025-11-15",
    name: "Loratadine",
    type: "Tablet 10Mg",
    available: 0,
    allocated: 12,
    status: "Out of Stock",
  },
  {
    id: "SAMP02",
    date: "2025-09-20",
    name: "Amoxicillin",
    type: "Capsule 500Mg",
    available: 250,
    allocated: 25,
    status: "In Stock",
  },
  {
    id: "SAMP03",
    date: "2025-11-15",
    name: "Loratadine",
    type: "Tablet 10Mg",
    available: 0,
    allocated: 12,
    status: "Out of Stock",
  },
  {
    id: "SAMP04",
    date: "2025-11-15",
    name: "Loratadine",
    type: "Tablet 10Mg",
    available: 0,
    allocated: 12,
    status: "Out of Stock",
  },
  {
    id: "SAMP05",
    date: "2025-11-15",
    name: "Loratadine",
    type: "Tablet 10Mg",
    available: 0,
    allocated: 12,
    status: "Out of Stock",
  },
  {
    id: "SAMP06",
    date: "2025-10-10",
    name: "Metformin",
    type: "Tablet 500Mg",
    available: 150,
    allocated: 30,
    status: "In Stock",
  },
  {
    id: "SAMP07",
    date: "2025-08-05",
    name: "Ibuprofen",
    type: "Tablet 400Mg",
    available: 45,
    allocated: 18,
    status: "Low Stock",
  },
  {
    id: "SAMP08",
    date: "2025-12-01",
    name: "Omeprazole",
    type: "Capsule 20Mg",
    available: 300,
    allocated: 40,
    status: "In Stock",
  },
  {
    id: "SAMP09",
    date: "2025-07-22",
    name: "Cetirizine",
    type: "Tablet 10Mg",
    available: 0,
    allocated: 15,
    status: "Out of Stock",
  },
  {
    id: "SAMP10",
    date: "2025-06-18",
    name: "Paracetamol",
    type: "Tablet 500Mg",
    available: 500,
    allocated: 50,
    status: "In Stock",
  },
  {
    id: "SAMP11",
    date: "2025-05-30",
    name: "Azithromycin",
    type: "Tablet 250Mg",
    available: 80,
    allocated: 20,
    status: "In Stock",
  },
  {
    id: "SAMP12",
    date: "2025-04-25",
    name: "Ciprofloxacin",
    type: "Tablet 500Mg",
    available: 35,
    allocated: 12,
    status: "Low Stock",
  },
];

export default function SamplesTable() {
  const columns = useMemo<ColumnDef<Sample>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <p className="font-medium text-(--gray-9)">{row.original.id}</p>,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <p className="text-(--gray-5)">{row.original.date}</p>,
      },
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => <p className="font-medium text-(--gray-9)">{row.original.name}</p>,
      },
      {
        accessorKey: "type",
        header: "SKU's",
        cell: ({ row }) => <p className="text-(--gray-5)">{row.original.type}</p>,
      },
      {
        accessorKey: "available",
        header: "Available",
        cell: ({ row }) => (
          <p className="font-semibold text-(--gray-9)">{row.original.available}</p>
        ),
      },
      {
        accessorKey: "allocated",
        header: "Allocated",
        cell: ({ row }) => (
          <p className="font-semibold text-[var(--destructive)]">{row.original.allocated}</p>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          let badgeStatus: "active" | "inactive" | "pending" | "rejected" = "inactive";
          let statusLabel = status;

          if (status === "In Stock") {
            badgeStatus = "active";
            statusLabel = "In Stock";
          } else if (status === "Out of Stock") {
            badgeStatus = "rejected";
            statusLabel = "Out of Stock";
          } else if (status === "Low Stock") {
            badgeStatus = "pending";
            statusLabel = "Low Stock";
          }

          return <StatusBadge status={badgeStatus} label={statusLabel} />;
        },
      },
      {
        id: "actions",
        header: "",
        cell: () => (
          <div className="flex justify-end">
            <MoreVertical className="w-4 h-4 text-(--gray-4) cursor-pointer" />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-full">
      <CenturoTable
        data={sampleData}
        columns={columns}
        loading={false}
        error={null}
        enableExpanding={false}
        enablePagination={true}
        pageSize={10}
        emptyMessage="No samples found"
        PaginationComponent={TablePagination}
      />
    </div>
  );
}
