"use client";

import React, { useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Edit, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import SalesDashboard1 from "../SalesDashboard1";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";

import { useAppDispatch, useAppSelector } from "@/store";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  supervisor: string;
  roleBy: string;
  profilePicture: string;
}

export default function SalesTeamTable() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((s) => s.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // ================= DATA =================
  const data = useMemo<TeamMember[]>(() => {
    return users.map((u) => {
      const supervisor = users.find((x) => x.id === u.supervisorId);
      return {
        id: u.id,
        name: `${u.firstName} ${u.middleName ?? ""} ${u.lastName}`,
        email: u.email,
        phone: u.mobileNumber || "N/A",
        role: u.pulseCode,
        supervisor: supervisor ? `${supervisor.firstName} ${supervisor.lastName}` : "N/A",
        roleBy: u.role?.roleName || "N/A",
        profilePicture: u.profilePicture || "/girlPic.svg",
      };
    });
  }, [users]);

  // ================= COLUMNS =================
  const columns = useMemo<ColumnDef<TeamMember>[]>(
    () => [
      {
        accessorKey: "role",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <Link
            href={`/dashboard/Employee-Profile?id=${row.original.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src={row.original.profilePicture}
              alt={row.original.name}
              width={36}
              height={36}
              className="rounded-8"
            />
            <div className="min-w-0">
              <p className="text-[var(--primary)] underline truncate font-medium">
                {row.original.name}
              </p>
              <span className="text-xs text-gray-500 truncate block">{row.original.roleBy}</span>
            </div>
          </Link>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">{row.original.email}</span>
        ),
      },
      {
        accessorKey: "phone",
        header: "Contact No #",
      },
      {
        accessorKey: "supervisor",
        header: "Supervisor",
      },
      {
        id: "expand",
        header: "",
        enableSorting: false, // Explicitly disable sorting for action column
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {/* Edit Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Add edit functionality
                console.log("Edit employee:", row.original.id);
              }}
              className="p-1.5 hover:bg-(--gray-1) rounded transition-colors"
              title="Edit Employee"
            >
              <Edit className="w-4 h-4 text-(--gray-6) hover:text-(--primary)" />
            </button>

            {/* Info Icon - Opens Statistics */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                row.toggleExpanded();
              }}
              className="p-1.5 hover:bg-(--gray-1) rounded transition-colors"
              title="View Statistics"
            >
              <Info
                className={`w-4 h-4 transition-colors ${
                  row.getIsExpanded() ? "text-(--primary)" : "text-(--gray-6)"
                } hover:text-(--primary)`}
              />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <CenturoTable
      data={data}
      columns={columns}
      loading={loading}
      error={error}
      onRetry={() => dispatch(getAllUsers())}
      enableSorting={true}
      enableExpanding={true}
      enablePagination={true}
      pageSize={10}
      emptyMessage="No employees found"
      renderExpandedRow={() => <SalesDashboard1 />}
      PaginationComponent={TablePagination}
    />
  );
}
