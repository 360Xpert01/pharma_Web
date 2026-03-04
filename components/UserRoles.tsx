"use client";

"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusBadge from "@/components/shared/StatusBadge";
import { useDebounce } from "use-debounce";

interface Role {
  id: string;
  roleId: string;
  created: string;
  title: string;
  responsibilities: number;
  status: "active" | "inactive";
}

interface UserRolesProps {
  searchTerm?: string;
  filters?: {
    roleId?: string;
    teamId?: string;
    supervisorId?: string;
    status?: string;
  };
}

export default function RolesCardList({ searchTerm = "", filters }: UserRolesProps) {
  const dispatch = useAppDispatch();
  const { roles, loading, error, pagination } = useAppSelector((state) => state.allRoles);
  const [openId, setOpenId] = useState<string | null>(null);

  // Server-side state
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const sort = sorting.length > 0 ? sorting[0].id : "pulseCode";
    const order = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "asc";

    dispatch(
      getAllRoles({
        page: currentPage,
        limit: pageSize,
        sort,
        order,
        search: searchTerm,
        // If filters are added to the API, they can be spread here
        ...filters,
      })
    );
  }, [dispatch, sorting, currentPage, pageSize, searchTerm, filters]);

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

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
    const sort = sorting.length > 0 ? sorting[0].id : "pulseCode";
    const order = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "asc";

    dispatch(
      getAllRoles({
        page: currentPage,
        limit: pageSize,
        sort,
        order,
        search: searchTerm,
        ...filters,
      })
    );
  };

  const columns: ColumnDef<Role>[] = [
    {
      header: "Role ID",
      accessorKey: "roleId",
      id: "pulseCode", // Map to backend field for sorting
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.roleId}>
          {row.original.roleId}
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "created",
      id: "createdAt", // Map to backend field for sorting
      cell: ({ row }) => (
        <div className="t-td truncate" title={row.original.created}>
          {row.original.created}
        </div>
      ),
    },
    {
      header: "Role Title",
      accessorKey: "title",
      id: "roleName", // Map to backend field for sorting
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.title}>
          {row.original.title}
        </div>
      ),
    },
    {
      header: "Permissions",
      accessorKey: "responsibilities",
      id: "permissions", // Map to backend field for sorting
      cell: ({ row }) => (
        <div className="t-td-b truncate">{row.original.responsibilities} Responsibilities</div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      id: "status", // Map to backend field for sorting
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
        pageSize={pageSize}
        PaginationComponent={TablePagination}
        emptyMessage="No roles found"
        // Server-side props
        serverSidePagination={true}
        totalItems={pagination?.total || 0}
        onPaginationChange={handlePaginationChange}
        serverSideSorting={true}
        onSortChange={setSorting}
        sorting={sorting}
      />
    </div>
  );
}
