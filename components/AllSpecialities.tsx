// components/AllSpecialities.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusToggle from "@/components/form/StatusToggle";

interface Speciality {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

// Hardcoded specialities data
const HARDCODED_SPECIALITIES: Speciality[] = [
  {
    id: "1",
    pulseCode: "SP_000001",
    name: "Cardiology",
    isActive: true,
  },
  {
    id: "2",
    pulseCode: "SP_000002",
    name: "Neurology",
    isActive: true,
  },
  {
    id: "3",
    pulseCode: "SP_000003",
    name: "Orthopedics",
    isActive: true,
  },
  {
    id: "4",
    pulseCode: "SP_000004",
    name: "Pediatrics",
    isActive: true,
  },
  {
    id: "5",
    pulseCode: "SP_000005",
    name: "Dermatology",
    isActive: true,
  },
  {
    id: "6",
    pulseCode: "SP_000006",
    name: "Ophthalmology",
    isActive: false,
  },
  {
    id: "7",
    pulseCode: "SP_000007",
    name: "General Surgery",
    isActive: true,
  },
  {
    id: "8",
    pulseCode: "SP_000008",
    name: "ENT",
    isActive: true,
  },
  {
    id: "9",
    pulseCode: "SP_000009",
    name: "Psychiatry",
    isActive: true,
  },
  {
    id: "10",
    pulseCode: "SP_000010",
    name: "Gastroenterology",
    isActive: false,
  },
];

export default function AllSpecialities() {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  // Load hardcoded data
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setSpecialities(HARDCODED_SPECIALITIES);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleStatus = (id: string) => {
    setSpecialities((prevSpecialities) =>
      prevSpecialities.map((speciality) =>
        speciality.id === id ? { ...speciality, isActive: !speciality.isActive } : speciality
      )
    );
  };

  const deleteSpeciality = (id: string) => {
    setSpecialities((prevSpecialities) =>
      prevSpecialities.filter((speciality) => speciality.id !== id)
    );
    setOpenId(null);
  };

  const handleRetry = () => {
    setLoading(true);
    setTimeout(() => {
      setSpecialities(HARDCODED_SPECIALITIES);
      setLoading(false);
    }, 500);
  };

  const columns: ColumnDef<Speciality>[] = [
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
      header: "Speciality Name",
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
                label: "Edit Speciality",
                onClick: () => console.log("Edit Speciality", row.original.id),
              },
              {
                label: "Delete Speciality",
                onClick: () => deleteSpeciality(row.original.id),
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
        data={specialities}
        columns={columns}
        loading={loading}
        error={null}
        onRetry={handleRetry}
        enableSorting={false}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No specialities found"
      />
    </div>
  );
}
