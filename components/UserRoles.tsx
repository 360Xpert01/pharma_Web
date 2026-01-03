"use client";

import React, { useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
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

  // Define columns for the table header
  const columns = [
    { label: "Role ID", className: "w-[20%] ml-3" },
    { label: "Date", className: "w-[22%]" },
    { label: "Role Title", className: "w-[24%]" },
    { label: "Permissions", className: "w-[24%]" },
    { label: "Status", className: "w-[0%]" },
    { label: "", className: "w-[0%]" },
  ];

  const handleRetry = () => {
    dispatch(getAllRoles());
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full overflow-hidden bg-[var(--background)]">
        <TableColumnHeader
          columns={columns}
          containerClassName="flex w-[80%]"
          showBackground={false}
        />
        <div className="px-3">
          <TableLoadingState variant="skeleton" rows={5} columns={5} message="Loading roles..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full overflow-hidden bg-[var(--background)]">
        <TableColumnHeader
          columns={columns}
          containerClassName="flex w-[80%]"
          showBackground={false}
        />
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load roles" />
      </div>
    );
  }

  // Empty state
  if (rolesData.length === 0) {
    return (
      <div className="w-full overflow-hidden bg-[var(--background)]">
        <TableColumnHeader
          columns={columns}
          containerClassName="flex w-[80%]"
          showBackground={false}
        />
        <TableEmptyState
          message="No roles found"
          description="There are currently no roles in the system."
        />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-[var(--background)]">
      {/* Table Header */}
      <TableColumnHeader
        columns={columns}
        containerClassName="flex w-[80%]"
        showBackground={false}
      />

      {/* Card List */}
      <div>
        {rolesData.map((role) => (
          <div
            key={role.id}
            className="px-3 py-3 w-[98%] flex items-center gap-6 hover:bg-[var(--gray-0)] transition-all cursor-pointer border border-[var(--gray-2)] mx-4 my-3 rounded-8 bg-[var(--background)]"
          >
            {/* Role ID - 15% */}
            <div className="w-[15%]">
              <p className="font-semibold text-sm text-[var(--gray-9)] truncate">{role.roleId}</p>
            </div>

            {/* Created Date - 18% */}
            <div className="w-[18%]">
              <p className="text-sm text-[var(--gray-5)] truncate">{role.created}</p>
            </div>

            {/* Title - 20% */}
            <div className="w-[20%]">
              <p className="font-semibold text-sm text-[var(--gray-9)] truncate" title={role.title}>
                {role.title}
              </p>
            </div>

            {/* Responsibilities - 20% */}
            <div className="w-[20%]">
              <p className="font-semibold text-sm text-[var(--gray-9)] truncate">
                {role.responsibilities} Responsibilities
              </p>
            </div>

            {/* Status - 20% */}
            <div className="w-[20%]">
              <StatusBadge status={role.status} />
            </div>

            {/* Actions - 7% */}
            <div className="w-[7%] flex justify-end">
              <button className="text-[var(--gray-4)] hover:text-[var(--gray-7)] transition">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
