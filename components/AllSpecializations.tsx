// components/AllSpecializations.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusToggle from "@/components/form/StatusToggle";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getAllSpecializations,
  resetSpecializationsState,
} from "@/store/slices/specialization/getAllSpecializationsSlice";

interface Specialization {
  id: string;
  pulseCode: string;
  name: string;
  status: "active" | "inactive";
}

export default function AllSpecializations() {
  const dispatch = useAppDispatch();
  const { loading, error, specializations } = useAppSelector((state) => state.allSpecializations);
  const [openId, setOpenId] = useState<string | null>(null);

  // Fetch specializations on mount
  useEffect(() => {
    dispatch(getAllSpecializations());

    return () => {
      dispatch(resetSpecializationsState());
    };
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getAllSpecializations());
  };

  const toggleStatus = (id: string) => {
    // TODO: Implement update API when available
    console.log("Toggle status for:", id);
  };

  const deleteSpecialization = (id: string) => {
    // TODO: Implement delete API when available
    console.log("Delete specialization:", id);
    setOpenId(null);
  };

  const columns: ColumnDef<Specialization>[] = [
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
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enableSorting={false}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No specializations found"
      />
    </div>
  );
}
