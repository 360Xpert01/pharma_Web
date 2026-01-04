"use client";

import React, { useEffect, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllCallPoints } from "@/store/slices/callPoint/getAllCallPointsSlice";

interface CallPoint {
  id: string;
  pulseCode: string;
  name: string;
  latitude: number;
  longitude: number;
}

export default function CallPointsList() {
  const dispatch = useAppDispatch();
  const { callPoints, loading, error } = useAppSelector((state) => state.allCallPoints);
  const hasFetched = useRef(false);
  const [openId, setOpenId] = useState<string | null>(null);

  // Fetch call points on component mount (prevent double call)
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(getAllCallPoints());
      hasFetched.current = true;
    }
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getAllCallPoints());
  };

  const columns: ColumnDef<CallPoint>[] = [
    {
      header: "Pulse Code",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.pulseCode || "N/A"}>
          {row.original.pulseCode || "N/A"}
        </div>
      ),
    },
    {
      header: "Location Title",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.name}>
          {row.original.name}
        </div>
      ),
    },
    {
      header: "Latitude",
      accessorKey: "latitude",
      cell: ({ row }) => (
        <div className="t-td truncate" title={String(row.original.latitude)}>
          {row.original.latitude}
        </div>
      ),
    },
    {
      header: "Longitude",
      accessorKey: "longitude",
      cell: ({ row }) => (
        <div className="t-td truncate" title={String(row.original.longitude)}>
          {row.original.longitude}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
          <TableActionDropdown
            isOpen={openId === row.original.id}
            onToggle={() => setOpenId(openId === row.original.id ? null : row.original.id)}
            onClose={() => setOpenId(null)}
            items={[
              {
                label: "Edit",
                onClick: () => console.log("Edit", row.original.id),
              },
              {
                label: "Delete",
                onClick: () => console.log("Delete", row.original.id),
                variant: "danger",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={callPoints || []}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No call points found"
      />
    </div>
  );
}
