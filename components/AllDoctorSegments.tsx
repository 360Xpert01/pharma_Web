// components/AllDoctorSegments.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusToggle from "@/components/form/StatusToggle";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllSegments, resetSegmentsState } from "@/store/slices/segment/getAllSegmentsSlice";
import EditIcon from "@/components/svgs/edit-icon";

interface DoctorSegment {
  id: string;
  pulseCode: string;
  name: string;
  status: "active" | "inactive";
}

export default function AllDoctorSegments() {
  const dispatch = useAppDispatch();
  const { loading, error, segments } = useAppSelector((state) => state.allSegments);
  const [openId, setOpenId] = useState<string | null>(null);

  // Fetch segments on mount
  useEffect(() => {
    dispatch(getAllSegments());

    return () => {
      dispatch(resetSegmentsState());
    };
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getAllSegments());
  };

  const toggleStatus = (id: string) => {
    // TODO: Implement update API when available
    console.log("Toggle status for:", id);
  };

  const deleteSegment = (id: string) => {
    // TODO: Implement delete API when available
    console.log("Delete segment:", id);
    setOpenId(null);
  };

  const columns: ColumnDef<DoctorSegment>[] = [
    {
      header: "ID",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.pulseCode || "N/A"}>
          {row.original.pulseCode || "N/A"}
        </div>
      ),
    },
    {
      header: "Segment Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.name}>
          {row.original.name}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex items-center">
          <StatusToggle
            status={row.original.status === "active" ? "Active" : "Inactive"}
            onChange={(newStatus) => {
              toggleStatus(row.original.id);
            }}
          />
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // No link, just action
              console.log("Edit Segment", row.original.id);
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="Edit Segment"
          >
            <EditIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={segments}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enableSorting={false}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No doctor segments found"
      />
    </div>
  );
}
