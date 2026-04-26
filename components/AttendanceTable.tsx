"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";

interface AttendanceRecord {
  id: number;
  date: string;
  saleRepName: string;
  saleRepPicture?: string;
  saleRepRole?: string;
  territory: string;
  checkInTime: string;
  checkOutTime: string;
  totalHours: string;
}

const tableData: AttendanceRecord[] = [
  {
    id: 1,
    date: new Date().toISOString().split("T")[0],
    saleRepName: "Mohammad Amir",
    saleRepRole: "Sales Representative",
    territory: "Gulshan-e-Iqbal",
    checkInTime: "09:00 AM",
    checkOutTime: "05:30 PM",
    totalHours: "8h 30m",
  },
  {
    id: 2,
    date: new Date().toISOString().split("T")[0],
    saleRepName: "Sara Khan",
    saleRepRole: "Sales Representative",
    territory: "Clifton",
    checkInTime: "09:15 AM",
    checkOutTime: "05:45 PM",
    totalHours: "8h 30m",
  },
  {
    id: 3,
    date: new Date().toISOString().split("T")[0],
    saleRepName: "Ali Raza",
    saleRepRole: "Sales Representative",
    territory: "Korangi",
    checkInTime: "08:45 AM",
    checkOutTime: "06:00 PM",
    totalHours: "9h 15m",
  },
];

const DEFAULT_AVATAR = "/girlPic.png";

export default function AttendanceTable({
  filters,
  searchTerm = "",
}: {
  filters?: { from?: string; regionId?: string };
  searchTerm?: string;
}) {
  const displayData = useMemo(() => {
    return tableData.filter((item) => {
      // Search filter
      const matchesSearch = searchTerm
        ? item.saleRepName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.territory?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Date filter
      const matchesDate = filters?.from ? item.date === filters.from : true;

      // Territory filter
      const matchesTerritory = filters?.regionId ? item.territory === filters.regionId : true;

      return matchesSearch && matchesDate && matchesTerritory;
    });
  }, [searchTerm, filters]);

  const columns: ColumnDef<any>[] = [
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: { row: { original: any } }) => <p className="t-label">{row.original.date}</p>,
    },
    {
      header: "Representative",
      accessorKey: "saleRepName",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="flex items-center gap-3">
          <img
            src={row.original.saleRepPicture || DEFAULT_AVATAR}
            alt={row.original.saleRepName}
            className="w-10 h-10 rounded-8 object-cover border border-(--gray-2) shadow-soft flex-shrink-0"
          />
          <div>
            <p className="t-td-b">{row.original.saleRepName}</p>
            <p className="t-cap">{row.original.saleRepRole || "Sales Rep"}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Region/Territory",
      accessorKey: "territory",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.territory}</p>
      ),
    },
    {
      header: "Check-in Time",
      accessorKey: "checkInTime",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.checkInTime}</p>
      ),
    },
    {
      header: "Check-out Time",
      accessorKey: "checkOutTime",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.checkOutTime || "Still in"}</p>
      ),
    },
    {
      header: "Total Working Hours",
      accessorKey: "totalHours",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label font-bold">{row.original.totalHours}</p>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={displayData}
        columns={columns}
        loading={false}
        error={null}
        onRetry={() => {}}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No attendance records found matching your filters"
      />
    </div>
  );
}
