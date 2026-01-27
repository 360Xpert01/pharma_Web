// components/AllDoctorSegments.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusToggle from "@/components/form/StatusToggle";

interface DoctorSegment {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

// Hardcoded doctor segments data
const HARDCODED_SEGMENTS: DoctorSegment[] = [
  {
    id: "1",
    pulseCode: "DS_000001",
    name: "Segment A",
    isActive: true,
  },
  {
    id: "2",
    pulseCode: "DS_000002",
    name: "Segment B",
    isActive: true,
  },
  {
    id: "3",
    pulseCode: "DS_000003",
    name: "Segment C",
    isActive: true,
  },
  {
    id: "4",
    pulseCode: "DS_000004",
    name: "Premium Segment",
    isActive: false,
  },
  {
    id: "5",
    pulseCode: "DS_000005",
    name: "Standard Segment",
    isActive: true,
  },
];

export default function AllDoctorSegments() {
  const [segments, setSegments] = useState<DoctorSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  // Load hardcoded data
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setSegments(HARDCODED_SEGMENTS);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleStatus = (id: string) => {
    setSegments((prevSegments) =>
      prevSegments.map((segment) =>
        segment.id === id ? { ...segment, isActive: !segment.isActive } : segment
      )
    );
  };

  const deleteSegment = (id: string) => {
    setSegments((prevSegments) => prevSegments.filter((segment) => segment.id !== id));
    setOpenId(null);
  };

  const handleRetry = () => {
    setLoading(true);
    setTimeout(() => {
      setSegments(HARDCODED_SEGMENTS);
      setLoading(false);
    }, 500);
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
      accessorKey: "isActive",
      cell: ({ row }) => (
        <div className="flex items-center">
          <StatusToggle
            status={row.original.isActive ? "Active" : "Inactive"}
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
          <TableActionDropdown
            isOpen={openId === row.original.id}
            onToggle={() => setOpenId(openId === row.original.id ? null : row.original.id)}
            onClose={() => setOpenId(null)}
            items={[
              {
                label: "View Details",
                onClick: () => console.log("View Details", row.original.id),
              },
              {
                label: "Edit Segment",
                onClick: () => console.log("Edit Segment", row.original.id),
              },
              {
                label: "Delete Segment",
                onClick: () => deleteSegment(row.original.id),
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
        data={segments}
        columns={columns}
        loading={loading}
        error={null}
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
