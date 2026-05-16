"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";
import { RoleGuard } from "@/components/shared/RoleGuard";

import SalesDashboard1 from "../SalesDashboard1";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";

import { useAppDispatch, useAppSelector } from "@/store";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  pulseCode: string;
  supervisor: string;
  team: string;
  roleBy: string;
  profilePicture: string;
}

interface EmployeeFilters {
  status?: string;
  roleId?: string;
  teamId?: string;
  supervisorId?: string;
}

export default function SalesTeamTable({
  searchTerm,
  filters: externalFilters,
}: {
  searchTerm: string;
  filters?: EmployeeFilters;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { users, loading, error, pagination } = useAppSelector((s) => s.allUsers);
  const [sorting, setSorting] = useState<any[]>([]);

  // Page + page size are owned here so the fetch, the rendered rows and the
  // pagination footer all derive from a single source of truth. Previously the
  // fetch used a hardcoded page/limit while the footer read CenturoTable's
  // independent internal state, so "Records 1-23 of 23 / Show 100" could be
  // shown while only a handful of rows were actually fetched.
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Merge external filters with internal state.
  // Memoized so the fetch effect only re-runs when the filters actually
  // change (not on every render), keeping pagination stable.
  const filters = useMemo(() => externalFilters || {}, [externalFilters]);

  // Track the previous query to detect when search/filters/sort change.
  const prevQueryRef = useRef({ searchTerm, filters, sorting });

  // Fetch whenever the query or pagination changes.
  useEffect(() => {
    // Detect if the query (search, filters, or sorting) has changed.
    const queryChanged =
      prevQueryRef.current.searchTerm !== searchTerm ||
      prevQueryRef.current.filters !== filters ||
      prevQueryRef.current.sorting !== sorting;

    // If the query changed, we MUST fetch from page 1.
    // We also update our local 'page' state so the UI stays in sync.
    let effectivePage = page;
    if (queryChanged) {
      effectivePage = 1;
      setPage(1);
      // Update the ref so we don't trigger a reset on the next render (when 'page' state update hits)
      prevQueryRef.current = { searchTerm, filters, sorting };
    }

    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllUsers({
        search: searchTerm,
        page: effectivePage,
        limit: pageSize,
        sort: sortField,
        order: sortOrder as any,
        ...filters,
      })
    );
  }, [dispatch, searchTerm, filters, sorting, page, pageSize]);

  const handlePaginationChange = (nextPage: number, nextPageSize: number) => {
    if (nextPageSize !== pageSize) {
      setPageSize(nextPageSize);
      setPage(1);
    } else {
      setPage(nextPage);
    }
  };

  // ================= DATA =================
  const data = useMemo<TeamMember[]>(() => {
    return users.map((u) => {
      // Build supervisor name from the nested supervisor object
      const supervisorName = u.supervisor
        ? [u.supervisor.firstName, u.supervisor.middleName, u.supervisor.lastName]
            .filter(Boolean)
            .join(" ")
        : "N/A";
      // Combine name parts, filtering out empty values
      const nameParts = [u.firstName, u.middleName, u.lastName].filter(Boolean);
      const fullName = nameParts.length > 0 ? nameParts.join(" ") : "N/A";

      // Get team name from teams array or team object
      const teamName =
        (u.teams && u.teams.length > 0 ? u.teams[0].name : "") || u.team?.name || "N/A";

      return {
        id: u.id,
        name: fullName,
        email: u.email,
        mobileNumber: u.mobileNumber || "N/A",
        pulseCode: u.pulseCode,
        supervisor: supervisorName,
        team: teamName,
        roleBy: u.role?.roleName || "N/A",
        profilePicture: u.profilePicture || "/girlPic.png",
      };
    });
  }, [users]);

  // ================= COLUMNS =================
  const columns = useMemo<ColumnDef<TeamMember>[]>(
    () => [
      {
        accessorKey: "pulseCode",
        header: "ID",
      },
      {
        id: "firstName",
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
        id: "mobileNumber",
        accessorKey: "mobileNumber",
        header: "Contact No #",
      },
      {
        id: "supervisor.firstName",
        accessorKey: "supervisor",
        header: "Supervisor",
      },
      {
        id: "teams.name",
        accessorKey: "team",
        header: "Team",
      },
      {
        id: "expand",
        header: "",
        enableSorting: false, // Explicitly disable sorting for action column
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <RoleGuard action="edit">
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
            </RoleGuard>

            {/* Info Icon - Opens Statistics */}
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                row.toggleExpanded();
              }}
              className="group hover:opacity-80 transition cursor-pointer"
              title="View Statistics"
            >
              <EyeIcon />
            </button> */}

            <Link
              href={`/dashboard/Employee-Profile?id=${row.original.id}`}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <EyeIcon />
            </Link>
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
      onRetry={() => {
        const sortField = sorting.length > 0 ? sorting[0].id : "";
        const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";
        dispatch(
          getAllUsers({
            search: searchTerm,
            page,
            limit: pageSize,
            sort: sortField,
            order: sortOrder as any,
            ...filters,
          })
        );
      }}
      enableSorting={true}
      enableExpanding={true}
      enablePagination={true}
      serverSidePagination={true}
      serverSideSorting={true}
      totalItems={pagination?.total || 0}
      serverCurrentPage={page}
      onPaginationChange={handlePaginationChange}
      onSortChange={(newSorting) => setSorting(newSorting)}
      pageSize={pageSize}
      emptyMessage="No employees found"
      renderExpandedRow={() => <SalesDashboard1 />}
      PaginationComponent={TablePagination}
    />
  );
}
