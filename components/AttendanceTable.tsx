"use client";

import React, { useMemo, useEffect, useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchAttendanceTableList,
  selectAttendanceTableList,
  selectAttendanceTablePagination,
  selectAttendanceTableLoading,
  selectAttendanceTableError,
  AttendanceItem,
  AttendanceRecordItem,
} from "@/store/slices/Attendance/AttendanceListSlice";

const DEFAULT_AVATAR = "/girlPic.png";

export default function AttendanceTable({
  filters,
  searchTerm = "",
}: {
  filters?: { from?: string; to?: string; regionId?: string };
  searchTerm?: string;
}) {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectAttendanceTableList);
  const pagination = useAppSelector(selectAttendanceTablePagination);
  const loading = useAppSelector(selectAttendanceTableLoading);
  const error = useAppSelector(selectAttendanceTableError);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Map UI column ids to backend sort field names (attendance.repository.js sortMap)
  const SORT_FIELD_MAP: Record<string, string> = {
    date: "attendanceDate",
    saleRepName: "userName",
    territory: "territory",
    checkInTime: "checkInAt",
    checkOutTime: "checkOutAt",
    totalHours: "totalSeconds",
  };

  useEffect(() => {
    const rawSortField = sorting.length > 0 ? sorting[0].id : "date";
    const sortField = SORT_FIELD_MAP[rawSortField] ?? "attendanceDate";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "desc";

    dispatch(
      fetchAttendanceTableList({
        from: filters?.from,
        to: filters?.to,
        regionId: filters?.regionId,
        searchTerm,
        page: currentPage,
        limit: pageSize,
        sort: sortField,
        order: sortOrder,
      })
    );
  }, [dispatch, filters, searchTerm, currentPage, pageSize, sorting]);

  // Flatten nested records into individual table rows
  const displayData = useMemo(() => {
    const flattened: any[] = [];
    if (!list || !Array.isArray(list)) return flattened;

    list.forEach((item: AttendanceItem, itemIndex: number) => {
      // Common representative info
      const repName = item.user?.name || item.name || "N/A";
      const repEmail = item.user?.email || item.email || "N/A";
      const date = item.attendanceDateFormatted || "N/A";

      if (item.records && item.records.length > 0) {
        item.records.forEach((record: AttendanceRecordItem, recordIndex: number) => {
          flattened.push({
            id: record.id || `${item.id || itemIndex}-${recordIndex}`,
            date: date,
            saleRepName: repName,
            saleRepEmail: repEmail,
            territory: record.territory?.pulseCode || item.territory?.pulseCode || "N/A",
            territoryName: record.territory?.description || item.territory?.description || "",
            checkInTime: record.checkInAtPKT || "N/A",
            checkOutTime: record.checkOutAtPKT || "Still in",
            totalHours: formatSeconds(record.totalSeconds ?? null),
          });
        });
      } else {
        // Handle case where item itself contains attendance data (flat structure)
        flattened.push({
          id: item.id || `item-${itemIndex}`,
          date: date,
          saleRepName: repName,
          saleRepEmail: repEmail,
          territory: item.territory?.pulseCode || "N/A",
          territoryName: item.territory?.description || "",
          checkInTime: item.checkInAtPKT || "N/A",
          checkOutTime: item.checkOutAtPKT || "Still in",
          totalHours: formatSeconds(item.totalSeconds ?? null),
        });
      }
    });
    return flattened;
  }, [list]);

  function formatSeconds(seconds: number | null): string {
    if (seconds === null || seconds === undefined) return "N/A";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  const columns: ColumnDef<any>[] = [
    {
      id: "date",
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: { row: { original: any } }) => <p className="t-label">{row.original.date}</p>,
    },
    {
      id: "saleRepName",
      header: "Representative",
      accessorKey: "saleRepName",
      cell: ({ row }: { row: { original: any } }) => (
        <div className="flex items-center gap-3">
          <img
            src={DEFAULT_AVATAR}
            alt={row.original.saleRepName}
            className="w-10 h-10 rounded-8 object-cover border border-(--gray-2) shadow-soft flex-shrink-0"
          />
          <div>
            <p className="t-td-b">{row.original.saleRepName}</p>
            <p className="t-cap">{row.original.saleRepEmail}</p>
          </div>
        </div>
      ),
    },
    {
      id: "territory",
      header: "Region/Territory",
      accessorKey: "territory",
      cell: ({ row }: { row: { original: any } }) => (
        <div>
          <p className="t-td-b">{row.original.territory}</p>
          {row.original.territoryName && (
            <p className="t-cap text-(--gray-5)">{row.original.territoryName}</p>
          )}
        </div>
      ),
    },
    {
      id: "checkInTime",
      header: "Check-in Time",
      accessorKey: "checkInTime",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.checkInTime}</p>
      ),
    },
    {
      id: "checkOutTime",
      header: "Check-out Time",
      accessorKey: "checkOutTime",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label">{row.original.checkOutTime}</p>
      ),
    },
    {
      id: "totalHours",
      header: "Total Working Hours",
      accessorKey: "totalHours",
      cell: ({ row }: { row: { original: any } }) => (
        <p className="t-label font-bold">{row.original.totalHours}</p>
      ),
    },
  ];

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="w-full">
      <CenturoTable
        data={displayData}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={() => {
          const rawSortField = sorting.length > 0 ? sorting[0].id : "date";
          const sortField = SORT_FIELD_MAP[rawSortField] ?? "attendanceDate";
          const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "desc";

          dispatch(
            fetchAttendanceTableList({
              from: filters?.from,
              to: filters?.to,
              regionId: filters?.regionId,
              searchTerm,
              page: currentPage,
              limit: pageSize,
              sort: sortField,
              order: sortOrder,
            })
          );
        }}
        enablePagination={true}
        serverSidePagination={true}
        enableSorting={true}
        serverSideSorting={true}
        onSortChange={(newSorting) => setSorting(newSorting)}
        sorting={sorting}
        totalItems={pagination.total}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        PaginationComponent={TablePagination}
        emptyMessage="No attendance records found matching your filters"
      />
    </div>
  );
}
