"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusToggle from "@/components/form/StatusToggle";

interface Specialization {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

export default function SpecializationsManager() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [specializations, setSpecializations] = useState<Specialization[]>([
    { id: "1", pulseCode: "SP01", name: "Cardiologist", isActive: true },
    { id: "2", pulseCode: "SP02", name: "Dermatologist", isActive: true },
    { id: "3", pulseCode: "SP03", name: "Neurologist", isActive: true },
    { id: "4", pulseCode: "SP04", name: "Pediatrician", isActive: true },
    { id: "5", pulseCode: "SP05", name: "Orthopedic Surgeon", isActive: true },
    { id: "6", pulseCode: "SP06", name: "Gynecologist", isActive: true },
    { id: "7", pulseCode: "SP07", name: "Ophthalmologist", isActive: true },
    { id: "8", pulseCode: "SP08", name: "Psychiatrist", isActive: true },
    { id: "9", pulseCode: "SP09", name: "Endocrinologist", isActive: true },
    { id: "10", pulseCode: "SP10", name: "Gastroenterologist", isActive: true },
    { id: "11", pulseCode: "SP11", name: "Pulmonologist", isActive: true },
    { id: "12", pulseCode: "SP12", name: "Rheumatologist", isActive: false },
    { id: "13", pulseCode: "SP13", name: "Urologist", isActive: true },
    { id: "14", pulseCode: "SP14", name: "ENT Specialist", isActive: true },
    { id: "15", pulseCode: "SP15", name: "Nephrologist", isActive: true },
  ]);

  const toggleStatus = (id: string) => {
    setSpecializations(
      specializations.map((spec) => (spec.id === id ? { ...spec, isActive: !spec.isActive } : spec))
    );
  };

  const deleteSpecialization = (id: string) => {
    setSpecializations(specializations.filter((spec) => spec.id !== id));
    setOpenId(null);
  };

  const columns: ColumnDef<Specialization>[] = [
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
      header: "Specialization Name",
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
            onChange={() => toggleStatus(row.original.id)}
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
                label: "Edit Specialization",
                onClick: () => console.log("Edit Specialization", row.original.id),
              },
              {
                label: "Delete Specialization",
                onClick: () => deleteSpecialization(row.original.id),
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
        data={specializations}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No specializations found"
      />
    </div>
  );
}
