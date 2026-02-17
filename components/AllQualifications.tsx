// components/AllQualifications.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getAllQualifications,
  resetQualificationsState,
} from "@/store/slices/qualification/getAllQualificationsSlice";
import EditIcon from "@/components/svgs/edit-icon";

interface Qualification {
  id: string;
  pulseCode: string;
  name: string;
  status: "active" | "inactive";
}

interface AllQualificationsProps {
  onEditQualification?: (qualificationId: string) => void;
}

export default function AllQualifications({ onEditQualification }: AllQualificationsProps) {
  const dispatch = useAppDispatch();
  const { loading, error, qualifications } = useAppSelector((state) => state.allQualifications);
  const [openId, setOpenId] = useState<string | null>(null);

  // Fetch qualifications on mount
  useEffect(() => {
    dispatch(getAllQualifications());

    return () => {
      dispatch(resetQualificationsState());
    };
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getAllQualifications());
  };

  const handleEdit = (id: string) => {
    if (onEditQualification) {
      onEditQualification(id);
    }
  };

  const toggleStatus = (id: string) => {
    // TODO: Implement update API when available
    console.log("Toggle status for:", id);
    // For now, just log - would need an update qualification API endpoint
  };

  const deleteQualification = (id: string) => {
    // TODO: Implement delete API when available
    console.log("Delete qualification:", id);
    setOpenId(null);
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
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex items-center">
          <StatusBadge status={row.original.status} />
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
              handleEdit(row.original.id);
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="Edit Qualification"
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
        data={qualifications}
        columns={columns}
        loading={loading}
        error={error}
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
