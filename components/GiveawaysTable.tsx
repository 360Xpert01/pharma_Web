"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";

interface Giveaway {
  id: string;
  date: string;
  name: string;
  type: string;
  available: number;
  allocated: number;
  status: "In Stock" | "Out of Stock" | "Low Stock";
}

const giveawayData: Giveaway[] = [
  {
    id: "GAV01",
    date: "2025-11-15",
    name: "Branded Stethoscope",
    type: "Medical Device",
    available: 5,
    allocated: 3,
    status: "Low Stock",
  },
  {
    id: "GAV02",
    date: "2025-09-20",
    name: "Glucose Meter",
    type: "Testing Device",
    available: 50,
    allocated: 10,
    status: "In Stock",
  },
  {
    id: "GAV03",
    date: "2025-10-12",
    name: "Patient Education Booklet",
    type: "Educational Material",
    available: 0,
    allocated: 25,
    status: "Out of Stock",
  },
  {
    id: "GAV04",
    date: "2025-08-18",
    name: "Branded Pen Set",
    type: "Stationery",
    available: 150,
    allocated: 40,
    status: "In Stock",
  },
  {
    id: "GAV05",
    date: "2025-07-05",
    name: "First Aid Kit",
    type: "Medical Kit",
    available: 20,
    allocated: 8,
    status: "In Stock",
  },
  {
    id: "GAV06",
    date: "2025-12-01",
    name: "Blood Pressure Monitor",
    type: "Medical Device",
    available: 0,
    allocated: 5,
    status: "Out of Stock",
  },
  {
    id: "GAV07",
    date: "2025-06-22",
    name: "Thermometer",
    type: "Medical Device",
    available: 80,
    allocated: 15,
    status: "In Stock",
  },
  {
    id: "GAV08",
    date: "2025-05-30",
    name: "Hand Sanitizer",
    type: "Hygiene Product",
    available: 200,
    allocated: 50,
    status: "In Stock",
  },
  {
    id: "GAV09",
    date: "2025-04-18",
    name: "Surgical Masks Box",
    type: "PPE",
    available: 12,
    allocated: 5,
    status: "Low Stock",
  },
  {
    id: "GAV10",
    date: "2025-03-25",
    name: "Branded Notebook",
    type: "Stationery",
    available: 300,
    allocated: 60,
    status: "In Stock",
  },
  {
    id: "GAV11",
    date: "2025-02-14",
    name: "Exercise Guide Booklet",
    type: "Educational Material",
    available: 0,
    allocated: 20,
    status: "Out of Stock",
  },
  {
    id: "GAV12",
    date: "2025-01-20",
    name: "Diet Chart Poster",
    type: "Educational Material",
    available: 45,
    allocated: 12,
    status: "In Stock",
  },
];

export default function GiveawaysTable() {
  const columns = useMemo<ColumnDef<Giveaway>[]>(
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
        header: "SkU's",
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
        data={giveawayData}
        columns={columns}
        loading={false}
        error={null}
        enableExpanding={false}
        enablePagination={true}
        pageSize={10}
        emptyMessage="No giveaways found"
        PaginationComponent={TablePagination}
      />
    </div>
  );
}
