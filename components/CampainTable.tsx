"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllTeams } from "@/store/slices/team/getAllTeamsSlice";

interface Team {
  id: string;
  pulseCode: string;
  name: string;
  channelName: string;
  callPointName: string;
  isActive: boolean;
  users: { id: string; profilePicture?: string }[];
}

export default function CampaignsTable() {
  const dispatch = useAppDispatch();
  const { teams, loading, error } = useAppSelector((state) => state.allTeams);

  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllTeams());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getAllTeams());
  };

  const columns: ColumnDef<Team>[] = [
    {
      header: "ID",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div className="t-td-b " title={row.original.pulseCode || "N/A"}>
          {row.original.pulseCode || "N/A"}
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b " title={row.original.name}>
          {row.original.name}
        </div>
      ),
    },
    {
      header: "Channel",
      accessorKey: "channelName",
      cell: ({ row }) => (
        <div className="t-td-b " title={row.original.channelName || "N/A"}>
          {row.original.channelName || "N/A"}
        </div>
      ),
    },
    {
      header: "Call Point",
      accessorKey: "callPointName",
      cell: ({ row }) => (
        <div className="t-td-b " title={row.original.callPointName || "N/A"}>
          {row.original.callPointName || "N/A"}
        </div>
      ),
    },
    {
      header: "Assigned",
      accessorKey: "users",
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
                label: "Duplicate",
                onClick: () => console.log("Duplicate", row.original.id),
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
        data={teams || []}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No teams found"
      />
    </div>
  );
}
