"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";

interface DcrRecord {
  id: number;
  reportDate: string;
  saleRepName: string;
  saleRepPicture?: string;
  saleRepRole?: string;
  territory: string;
  doctorName: string;
  doctorSpecialization: string;
  startTime: string;
  duration: string;
  samplesGiven: string;
  orderTaken: string;
  notes: string;
}

const tableData: DcrRecord[] = [
  {
    id: 1,
    reportDate: "2024-04-25",
    saleRepName: "Mohammad Amir",
    saleRepRole: "Sales Representative",
    territory: "Gulshan-e-Iqbal",
    doctorName: "Dr. Rashid Ahmed",
    doctorSpecialization: "Cardiologist",
    startTime: "10:30 AM",
    duration: "15 mins",
    samplesGiven: "Amoxicillin (5), Panadol (10)",
    orderTaken: "100 units",
    notes: "Doctor was interested in the new cardiac drug.",
  },
  {
    id: 2,
    reportDate: "2024-04-26",
    saleRepName: "Sara Khan",
    saleRepRole: "Sales Representative",
    territory: "Clifton",
    doctorName: "Dr. Ayesha Farooq",
    doctorSpecialization: "Pediatrician",
    startTime: "11:00 AM",
    duration: "20 mins",
    samplesGiven: "Ibuprofen (2)",
    orderTaken: "None",
    notes: "Requested a focus group meeting for next month.",
  },
  {
    id: 3,
    reportDate: "2024-04-24",
    saleRepName: "Ali Raza",
    saleRepRole: "Sales Representative",
    territory: "Korangi",
    doctorName: "Dr. Bilal Shah",
    doctorSpecialization: "Dermatologist",
    startTime: "02:15 PM",
    duration: "10 mins",
    samplesGiven: "Cetirizine (8)",
    orderTaken: "50 units",
    notes: "Follow-up required on the recent clinical trial data.",
  },
];

const DEFAULT_AVATAR = "/girlPic.png";

export default function DcrTable({
  filters,
  searchTerm = "",
}: {
  filters?: { from?: string; to?: string; employeeId?: string; regionId?: string };
  searchTerm?: string;
}) {
  // Use mock data only
  const displayData = useMemo(() => {
    return tableData.filter((item: any) => {
      // Search filter
      const matchesSearch = searchTerm
        ? item.saleRepName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.territory?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Date range filter
      const itemDate = new Date(item.reportDate);
      const matchesFromDate = filters?.from ? itemDate >= new Date(filters.from) : true;
      const matchesToDate = filters?.to ? itemDate <= new Date(filters.to) : true;

      // Sales Rep filter (assuming ID match or name match for dummy)
      const matchesSalesRep = filters?.employeeId
        ? item.saleRepId === filters.employeeId || item.saleRepName.includes(filters.employeeId)
        : true;

      // Territory filter (assuming regionId matches territory name or id)
      const matchesTerritory = filters?.regionId
        ? item.regionId === filters.regionId || item.territory === filters.regionId
        : true;

      return (
        matchesSearch && matchesFromDate && matchesToDate && matchesSalesRep && matchesTerritory
      );
    });
  }, [searchTerm, filters]);

  const columns: ColumnDef<any>[] = [
    {
      header: "Report Date",
      accessorKey: "reportDate",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.reportDate || "N/A"}</p>
      ),
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
      header: "Territory/Brick",
      accessorKey: "territory",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.territory || "N/A"}</p>
      ),
    },
    {
      header: "Doctor/Store Name",
      accessorKey: "doctorName",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-td-b">{row.original.doctorName}</p>
      ),
    },
    {
      header: "Speciality/Category",
      accessorKey: "doctorSpecialization",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">
          {row.original.doctorSpecialization || row.original.specialty || "N/A"}
        </p>
      ),
    },
    {
      header: "Call Start Time",
      accessorKey: "startTime",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.startTime || "N/A"}</p>
      ),
    },
    {
      header: "Duration",
      accessorKey: "duration",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.duration || "N/A"}</p>
      ),
    },
    {
      header: "Samples Given",
      accessorKey: "samplesGiven",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label truncate max-w-[150px]" title={row.original.samplesGiven}>
          {row.original.samplesGiven || "None"}
        </p>
      ),
    },
    {
      header: "Order Taken",
      accessorKey: "orderTaken",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.orderTaken || "None"}</p>
      ),
    },
    {
      header: "Remarks",
      accessorKey: "notes",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label truncate max-w-[200px]" title={row.original.notes}>
          {row.original.notes || "No notes"}
        </p>
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
        emptyMessage="No DCR records found matching your filters"
      />
    </div>
  );
}
