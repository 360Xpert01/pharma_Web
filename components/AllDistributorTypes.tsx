// components/AllDistributorTypes.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getAllDistributorTypes,
  resetDistributorTypesState,
} from "@/store/slices/distributorType/getAllDistributorTypesSlice";
import EditIcon from "@/components/svgs/edit-icon";

interface DistributorType {
  id: string;
  pulseCode: string;
  name: string;
  status: "active" | "inactive";
}

interface AllDistributorTypesProps {
  onEditDistributorType?: (distributorTypeId: string) => void;
}

export default function AllDistributorTypes({ onEditDistributorType }: AllDistributorTypesProps) {
  const dispatch = useAppDispatch();
  const { loading, error, distributorTypes } = useAppSelector((state) => state.allDistributorTypes);
  const [openId, setOpenId] = useState<string | null>(null);

  // Fetch distributor types on mount
  useEffect(() => {
    dispatch(getAllDistributorTypes());

    return () => {
      dispatch(resetDistributorTypesState());
    };
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getAllDistributorTypes());
  };

  const handleEdit = (id: string) => {
    if (onEditDistributorType) {
      onEditDistributorType(id);
    }
  };

  const toggleStatus = (id: string) => {
    // TODO: Implement update API when available
    console.log("Toggle status for:", id);
    // For now, just log - would need an update distributor type API endpoint
  };

  const deleteDistributorType = (id: string) => {
    // TODO: Implement delete API when available
    console.log("Delete distributor type:", id);
    setOpenId(null);
  };

  const columns: ColumnDef<DistributorType>[] = [
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
      header: "Distributor Type Name",
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
            title="Edit Distributor Type"
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
        data={distributorTypes}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enableSorting={false}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No distributor types found"
      />
    </div>
  );
}
