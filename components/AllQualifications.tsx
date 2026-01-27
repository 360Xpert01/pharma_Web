// components/AllQualifications.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusToggle from "@/components/form/StatusToggle";

interface Qualification {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

// Hardcoded qualifications data
const HARDCODED_QUALIFICATIONS: Qualification[] = [
  {
    id: "1",
    pulseCode: "QL_000001",
    name: "MBBS",
    isActive: true,
  },
  {
    id: "2",
    pulseCode: "QL_000002",
    name: "MD - General Medicine",
    isActive: true,
  },
  {
    id: "3",
    pulseCode: "QL_000003",
    name: "MS - General Surgery",
    isActive: true,
  },
  {
    id: "4",
    pulseCode: "QL_000004",
    name: "DNB",
    isActive: true,
  },
  {
    id: "5",
    pulseCode: "QL_000005",
    name: "DM - Cardiology",
    isActive: true,
  },
  {
    id: "6",
    pulseCode: "QL_000006",
    name: "MCh - Neurosurgery",
    isActive: false,
  },
  {
    id: "7",
    pulseCode: "QL_000007",
    name: "Diploma in Child Health",
    isActive: true,
  },
];

export default function AllQualifications() {
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  // Load hardcoded data
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setQualifications(HARDCODED_QUALIFICATIONS);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleStatus = (id: string) => {
    setQualifications((prevQualifications) =>
      prevQualifications.map((qualification) =>
        qualification.id === id
          ? { ...qualification, isActive: !qualification.isActive }
          : qualification
      )
    );
  };

  const deleteQualification = (id: string) => {
    setQualifications((prevQualifications) =>
      prevQualifications.filter((qualification) => qualification.id !== id)
    );
    setOpenId(null);
  };

  const handleRetry = () => {
    setLoading(true);
    setTimeout(() => {
      setQualifications(HARDCODED_QUALIFICATIONS);
      setLoading(false);
    }, 500);
  };

  const columns: ColumnDef<Qualification>[] = [
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
      header: "Qualification Name",
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
                label: "Edit Qualification",
                onClick: () => console.log("Edit Qualification", row.original.id),
              },
              {
                label: "Delete Qualification",
                onClick: () => deleteQualification(row.original.id),
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
        data={qualifications}
        columns={columns}
        loading={loading}
        error={null}
        onRetry={handleRetry}
        enableSorting={false}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No qualifications found"
      />
    </div>
  );
}
