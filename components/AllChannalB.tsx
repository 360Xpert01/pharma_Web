// components/ChannelsManager.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusBadge from "@/components/shared/StatusBadge";

interface Channel {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

export default function ChannelsManager() {
  const dispatch = useAppDispatch();
  const { channels, loading, error } = useAppSelector((state) => state.allChannels);
  const [openId, setOpenId] = useState<string | null>(null);

  // Fetch channels on component mount
  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch]);

  const toggleStatus = (id: string) => {
    // TODO: Implement API call to update channel status
    console.log("Toggle status for channel:", id);
  };

  const deleteChannel = (id: string) => {
    // TODO: Implement API call to delete channel
    console.log("Delete channel:", id);
    setOpenId(null);
  };

  const handleRetry = () => {
    dispatch(getAllChannels());
  };

  const columns: ColumnDef<Channel>[] = [
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
      header: "Channel Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.name}>
          {row.original.name}
        </div>
      ),
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
                label: "Add New Campaign",
                onClick: () => console.log("Add New Campaign", row.original.id),
              },
              {
                label: "Edit Channel",
                onClick: () => console.log("Edit Channel", row.original.id),
              },
              {
                label: "Delete Channel",
                onClick: () => deleteChannel(row.original.id),
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
        data={channels || []}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enableSorting={false}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No channels found"
      />
    </div>
  );
}
