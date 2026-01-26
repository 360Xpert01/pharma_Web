"use client";

import React, { useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";

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
  const router = useRouter();
  const { users, loading, error, pagination } = useAppSelector((s) => s.allUsers);

  // Fetch users on mount
  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch(getAllUsers({ page, limit: pageSize }));
  };

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
                router.push(`/dashboard/UpdateEmployees?id=${row.original.id}`);
              }}
              className="group hover:opacity-80 transition cursor-pointer"
              title="Edit Employee"
            >
              <EditIcon />
            </button>

            {/* Info Icon - Opens Statistics */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                row.toggleExpanded();
              }}
              className="group hover:opacity-80 transition cursor-pointer"
              title="View Statistics"
            >
              <EyeIcon />
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
      onRetry={() => dispatch(getAllUsers({ page: 1, limit: 10 }))}
      enableSorting={true}
      enableExpanding={true}
      enablePagination={true}
      serverSidePagination={true}
      totalItems={pagination?.total || 0}
      onPaginationChange={handlePaginationChange}
      pageSize={10}
      emptyMessage="No employees found"
      renderExpandedRow={() => <SalesDashboard1 />}
      PaginationComponent={TablePagination}
    />
  );
}
