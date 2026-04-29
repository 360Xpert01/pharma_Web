"use client";

import React, { useMemo, useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  fetchDailyCallReport,
  DailyCallRecord,
  CallProduct,
  CallSample,
} from "@/store/slices/DCR/dailyCallReportSlice";
import { format } from "date-fns";

const DEFAULT_AVATAR = "/girlPic.png";

export default function DcrTable({
  filters,
  searchTerm = "",
}: {
  filters?: { from?: string; to?: string; employeeId?: string; regionId?: string };
  searchTerm?: string;
}) {
  const dispatch = useAppDispatch();
  const { list, pagination, loading, error } = useAppSelector((state) => state.dailyCallReport);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(
      fetchDailyCallReport({
        from: filters?.from,
        to: filters?.to,
        salrepname: filters?.employeeId,
        territoryname: filters?.regionId,
        search: searchTerm,
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [dispatch, filters, searchTerm, currentPage, pageSize]);

  const displayData = useMemo(() => {
    return (list || []).map((item: DailyCallRecord) => {
      const formatProductList = (items: (CallProduct | CallSample)[]) => {
        if (!items || items.length === 0) return "None";
        return items
          .map((i) => `${i?.productId?.slice(0, 8) || "Unknown"} (${i?.quantity || 0})`)
          .join(", ");
      };

      // Handle time parsing: API gives "10:26", Date wants full date
      let formattedTime = item?.checkInAt || "N/A";
      if (item?.checkInAt && item?.callDate) {
        try {
          const dateStr = item.callDate.includes("T") ? item.callDate.split("T")[0] : item.callDate;
          const fullDate = new Date(`${dateStr}T${item.checkInAt}`);
          if (!isNaN(fullDate.getTime())) {
            formattedTime = format(fullDate, "hh:mm a");
          }
        } catch (e) {
          console.error("Time parsing error", e);
        }
      }

      return {
        ...item,
        reportDate: item?.callDate ? format(new Date(item.callDate), "yyyy-MM-dd") : "N/A",
        saleRepName: item?.salrepname || "N/A",
        territory: item?.territoryname || "N/A",
        doctorName: item?.partyname || "N/A",
        doctorSpecialization: item?.segment || "N/A",
        startTime: formattedTime,
        samplesGiven: formatProductList(item?.callSamples || []),
        orderTaken: formatProductList(item?.callProducts || []),
        notes: item?.comments || item?.remarks || "No notes",
        isFake: item?.fake_call === true || item?.fake_call === "true",
      };
    });
  }, [list]);

  const columns: ColumnDef<any>[] = [
    {
      header: "Report Date",
      accessorKey: "reportDate",
      cell: ({ row }) => <p className="t-label">{row.original?.reportDate || "N/A"}</p>,
    },
    {
      header: "Representative",
      accessorKey: "saleRepName",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img
            src={DEFAULT_AVATAR}
            alt={row.original?.saleRepName}
            className="w-10 h-10 rounded-8 object-cover border border-(--gray-2) shadow-soft flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <p className="t-td-b">{row.original?.saleRepName || "N/A"}</p>
            </div>
            <p className="t-cap">Sales Rep</p>
          </div>
        </div>
      ),
    },
    {
      header: "Territory/Brick",
      accessorKey: "territory",
      cell: ({ row }) => <p className="t-label">{row.original?.territory || "N/A"}</p>,
    },
    {
      header: "Doctor/Store Name",
      accessorKey: "doctorName",
      cell: ({ row }) => <p className="t-td-b">{row.original?.doctorName || "N/A"}</p>,
    },
    {
      header: "Speciality/Category",
      accessorKey: "doctorSpecialization",
      cell: ({ row }) => <p className="t-label">{row.original?.doctorSpecialization || "N/A"}</p>,
    },
    {
      header: "Call Start Time",
      accessorKey: "startTime",
      cell: ({ row }) => <p className="t-label">{row.original?.startTime || "N/A"}</p>,
    },
    {
      header: "GPS Verified",
      accessorKey: "isFake",
      cell: ({ row }) => (
        <p
          className={`t-label font-bold ${
            row.original?.isFake ? "text-red-600" : "text-green-600"
          }`}
        >
          {row.original?.isFake ? "True" : "False"}
        </p>
      ),
    },
    {
      header: "Samples Given",
      accessorKey: "samplesGiven",
      cell: ({ row }) => (
        <p className="t-label truncate max-w-[150px]" title={row.original?.samplesGiven}>
          {row.original?.samplesGiven || "None"}
        </p>
      ),
    },
    {
      header: "Order Taken",
      accessorKey: "orderTaken",
      cell: ({ row }) => (
        <p className="t-label truncate max-w-[150px]" title={row.original?.orderTaken}>
          {row.original?.orderTaken || "None"}
        </p>
      ),
    },
    {
      header: "Remarks",
      accessorKey: "notes",
      cell: ({ row }) => (
        <p className="t-label truncate max-w-[200px]" title={row.original?.notes}>
          {row.original?.notes || "No notes"}
        </p>
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
          dispatch(
            fetchDailyCallReport({
              from: filters?.from,
              to: filters?.to,
              salrepname: filters?.employeeId,
              territoryname: filters?.regionId,
              search: searchTerm,
              page: currentPage,
              limit: pageSize,
            })
          );
        }}
        enablePagination={true}
        serverSidePagination={true}
        totalItems={pagination.total}
        pageSize={pageSize}
        onPaginationChange={handlePaginationChange}
        PaginationComponent={TablePagination}
        emptyMessage="No DCR records found matching your filters"
      />
    </div>
  );
}
