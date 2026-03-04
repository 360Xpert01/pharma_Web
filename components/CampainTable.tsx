"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllTeams } from "@/store/slices/team/getAllTeamsSlice";

interface Team {
  id: string;
  pulseCode: string;
  name: string;
  channelName: string;
  callPoints: { id: string; name: string }[];
  isActive: boolean;
  users: { id: string; profilePicture?: string }[];
}

export default function CampaignsTable({
  searchTerm,
  filters,
}: {
  searchTerm: string;
  filters?: { status?: string; channelId?: string };
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { teams, loading, error, pagination } = useAppSelector((state) => state.allTeams);

  const [sorting, setSorting] = useState<any[]>([{ id: "pulseCode", desc: false }]);
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Map UI column ids to actual DB column names on the Team table
  const SORT_FIELD_MAP: Record<string, string> = {
    pulseCode: "pulseCode",
    name: "name",
    channelName: "channelId",
    isActive: "isActive",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    legacyCode: "legacyCode",
  };

  useEffect(() => {
    const rawSortField = sorting.length > 0 ? sorting[0].id : "pulseCode";
    const sortField = SORT_FIELD_MAP[rawSortField] ?? "pulseCode";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "asc";

    dispatch(
      getAllTeams({
        search: searchTerm,
        isActive: filters?.status,
        channelId: filters?.channelId,
        page: paginationState.pageIndex + 1,
        limit: paginationState.pageSize,
        sort: sortField,
        order: sortOrder as any,
      })
    );
  }, [
    dispatch,
    searchTerm,
    filters?.status,
    filters?.channelId,
    paginationState.pageIndex,
    paginationState.pageSize,
    sorting,
  ]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPaginationState({ pageIndex: page - 1, pageSize });
  };

  const handleRetry = () => {
    const rawSortField = sorting.length > 0 ? sorting[0].id : "pulseCode";
    const sortField = SORT_FIELD_MAP[rawSortField] ?? "pulseCode";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "asc";

    dispatch(
      getAllTeams({
        search: searchTerm,
        isActive: filters?.status,
        channelId: filters?.channelId,
        page: paginationState.pageIndex + 1,
        limit: paginationState.pageSize,
        sort: sortField,
        order: sortOrder as any,
      })
    );
  };

  const columns: ColumnDef<Team>[] = [
    {
      id: "pulseCode",
      header: "ID",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div className="t-td-b " title={row.original.pulseCode || "N/A"}>
          {row.original.pulseCode || "N/A"}
        </div>
      ),
    },
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b " title={row.original.name}>
          {row.original.name}
        </div>
      ),
    },
    {
      id: "channelName",
      header: "Channel",
      accessorKey: "channelName",
      cell: ({ row }) => (
        <div className="t-td-b " title={row.original.channelName || "N/A"}>
          {row.original.channelName || "N/A"}
        </div>
      ),
    },
    {
      id: "callPoints",
      header: "Call Point",
      accessorKey: "callPoints",
      enableSorting: true,
      cell: ({ row }) => {
        const callPoints = row.original.callPoints;
        if (!callPoints || callPoints.length === 0) return <span className="t-sm">N/A</span>;
        return (
          <div className="t-td-b max-w-[200px]" title={callPoints.map((cp) => cp.name).join(", ")}>
            {callPoints.map((cp) => cp.name).join(", ")}
          </div>
        );
      },
    },
    {
      id: "users",
      header: "Assigned",
      accessorKey: "users",
      enableSorting: false,
      cell: ({ row }) => {
        const users = row.original.users;
        if (!users || users.length === 0) return <span className="t-sm">N/A</span>;
        return (
          <div className="flex -space-x-2">
            {users.slice(0, 3).map((user, idx) => (
              <div
                key={user.id}
                className="w-8 h-8 rounded-8 border-2 border-[var(--light)] overflow-hidden ring-2 ring-[var(--gray-1)]"
              >
                <img
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=User+${idx + 1}`}
                  alt={`User ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=User+${idx + 1}`;
                  }}
                />
              </div>
            ))}
            {users.length > 3 && (
              <div className="w-8 h-8 rounded-8 border-2 border-[var(--light)] flex items-center justify-center text-xs font-medium text-[var(--gray-5)] ring-2 ring-[var(--gray-1)] bg-[var(--gray-1)]">
                +{users.length - 3}
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "isActive",
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }) => (
        <div className="flex items-center">
          <StatusBadge status={row.original.isActive ? "active" : "inactive"} />
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              router.push(`/dashboard/UpdateTeamForm?id=${row.original.id}&mode=update`);
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="Edit Campaign"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => console.log("View", row.original.id)}
            className="group hover:opacity-80 transition cursor-pointer"
            title="View Details"
          >
            <EyeIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={teams}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        serverSidePagination={true}
        enableSorting={true}
        serverSideSorting={true}
        onSortChange={(newSorting) => setSorting(newSorting)}
        sorting={sorting}
        totalItems={pagination?.total || 0}
        onPaginationChange={handlePaginationChange}
        pageSize={paginationState.pageSize}
        PaginationComponent={TablePagination}
        emptyMessage="No teams found"
      />
    </div>
  );
}
