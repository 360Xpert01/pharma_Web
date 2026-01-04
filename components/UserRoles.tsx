"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusBadge from "@/components/shared/StatusBadge";

interface Role {
  id: string;
  roleId: string;
  created: string;
  title: string;
  responsibilities: number;
  status: "active" | "inactive";
}

export default function RolesCardList() {
  const dispatch = useAppDispatch();
  const { roles, loading, error } = useAppSelector((state) => state.allRoles);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  // Map API data to component format
  const rolesData: Role[] = (roles || []).map((role) => ({
    id: role.id,
    roleId: role.pulseCode, // Using pulseCode as roleId (e.g., "rol05")
    created: role.createdAt
      ? new Date(role.createdAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    title: role.roleName,
    responsibilities: role.permissions || 0,
    status: role.status || "active",
  }));

  const handleRetry = () => {
    dispatch(getAllRoles());
  };

  const columns: ColumnDef<Role>[] = [
    {
      header: "Role ID",
      accessorKey: "roleId",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.roleId}>
          {row.original.roleId}
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "created",
      cell: ({ row }) => (
        <div className="t-td truncate" title={row.original.created}>
          {row.original.created}
        </div>
      ),
    },
    {
      header: "Role Title",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.title}>
          {row.original.title}
        </div>
      ),
    },
    {
      header: "Permissions",
      accessorKey: "responsibilities",
      cell: ({ row }) => (
        <div className="t-td-b truncate">{row.original.responsibilities} Responsibilities</div>
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
        data={rolesData}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No roles found"
      />
    </div>
  );
}
