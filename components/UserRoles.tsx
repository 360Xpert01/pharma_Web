"use client";

import React, { useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import TableColumnHeader from "@/components/TableColumnHeader";

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

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--gray-9) mx-auto"></div>
          <p className="mt-4 text-(--gray-6)">Loading roles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-(--destructive) font-semibold">Error loading roles</p>
          <p className="text-(--gray-6) mt-2">{error}</p>
          <button
            onClick={() => dispatch(getAllRoles())}
            className="mt-4 px-4 py-2 bg-(--primary) text-(--light) rounded-lg hover:bg-(--primary-2) transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (rolesData.length === 0) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <p className="text-(--gray-6)">No roles found</p>
      </div>
    );
  }
  // Define columns for the table header
  const columns = [
    { label: "Role ID" },
    { label: "Date" },
    { label: "Role Title" },
    { label: "Permissions" },
    { label: "Status" },
  ];

  return (
    <div className="w-full ">
      {/* Table Header */}
      <TableColumnHeader columns={columns} gridCols={5} />

      {/* Card List */}
      <div className="space-y-3">
        {rolesData.map((role) => (
          <div
            key={role.id}
            className="bg-[var(--background)] border border-(--gray-2) rounded-xl p-3 transition-shadow duration-200"
          >
            <div className="flex items-center justify-between gap-6">
              {/* Left Section */}
              <div className="flex-1 grid grid-cols-5 gap-6">
                {/* Role ID */}
                <div>
                  <p className="mt-1 font-semibold text-md text-(--gray-9)">{role.roleId}</p>
                </div>

                {/* Created Date */}
                <div>
                  <p className="mt-1 text-sm text-(--gray-5)">{role.created}</p>
                </div>

                {/* Title */}
                <div>
                  <p className="mt-1 font-semibold text-(--gray-9)">{role.title}</p>
                </div>

                {/* Responsibilities */}
                <div>
                  <p className="mt-1 font-semibold text-(--gray-9)">
                    {role.responsibilities} Responsibilities
                  </p>
                </div>

                <div className="flex justify-start ">
                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-2 px-12 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      role.status === "active"
                        ? "bg-(--success) text-(--light)"
                        : "bg-(--gray-3) text-(--light)"
                    }`}
                  >
                    {role.status === "active" ? "Active" : "Inactive"}
                  </span>

                  {/* More Options */}
                </div>
              </div>

              {/* Right Section: Status + Actions */}

              <div className="">
                <button className="text-(--gray-4) hover:text-(--gray-7) transition">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
