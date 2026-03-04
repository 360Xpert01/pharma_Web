// components/AllSpecialities.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getAllSpecializations,
  resetSpecializationsState,
} from "@/store/slices/specialization/getAllSpecializationsSlice";
import EditIcon from "@/components/svgs/edit-icon";

interface Speciality {
  id: string;
  pulseCode: string;
  name: string;
  status: "active" | "inactive";
}

interface AllSpecialitiesProps {
  onEditSpeciality?: (specialityId: string) => void;
}

export default function AllSpecialities({ onEditSpeciality }: AllSpecialitiesProps) {
  const dispatch = useAppDispatch();
  const { loading, error, specializations, pagination } = useAppSelector(
    (state) => state.allSpecializations
  );
  const [openId, setOpenId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<any[]>([]);

  // Fetch specializations on mount and when sorting change
  useEffect(() => {
    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllSpecializations({
        page: 1,
        limit: 10,
        sort: sortField,
        order: sortOrder as any,
      })
    );

    return () => {
      dispatch(resetSpecializationsState());
    };
  }, [dispatch, sorting]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllSpecializations({
        page,
        limit: pageSize,
        sort: sortField,
        order: sortOrder as any,
      })
    );
  };

  const handleRetry = () => {
    dispatch(getAllSpecializations());
  };

  const handleEdit = (id: string) => {
    if (onEditSpeciality) {
      onEditSpeciality(id);
    }
  };

  const toggleStatus = (id: string) => {
    // TODO: Implement update API when available
    console.log("Toggle status for:", id);
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
            title="Edit Speciality"
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
        data={specializations}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enableSorting={true}
        serverSideSorting={true}
        enablePagination={true}
        serverSidePagination={true}
        totalItems={pagination?.total || specializations?.length || 0}
        onPaginationChange={handlePaginationChange}
        onSortChange={(newSorting) => setSorting(newSorting)}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No specialities found"
      />
    </div>
  );
}
