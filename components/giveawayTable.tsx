"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllGiveaways } from "@/store/slices/giveaway/getAllGiveawaysSlice";

interface Giveaway {
  id: string;
  pulseCode: string;
  name: string;
  category: string;
  productName: string;
  createdAt: string;
}

export default function GiveawayTable() {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const [openId, setOpenId] = useState<string | null>(null);

  // Redux state
  const { giveaways, loading, error } = useAppSelector((state) => state.allGiveaways);

  // Sort giveaways by createdAt (newest first)
  const sortedGiveaways = useMemo(() => {
    if (!giveaways || giveaways.length === 0) return [];

    return [...giveaways].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // Descending order (newest first)
    });
  }, [giveaways]);

  // Fetch giveaways on mount (prevent double call)
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(getAllGiveaways());
      hasFetched.current = true;
    }
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getAllGiveaways());
  };

  const columns: ColumnDef<Giveaway>[] = [
    {
      header: "Pulse Code",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.pulseCode || "N/A"}>
          {row.original.pulseCode || "N/A"}
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.name}>
          {row.original.name}
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.category}>
          {row.original.category}
        </div>
      ),
    },
    {
      header: "Product Name",
      accessorKey: "productName",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.productName}>
          {row.original.productName}
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
                label: "View Details",
                onClick: () => console.log("View Details", row.original.id),
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
        data={sortedGiveaways}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No giveaways found"
      />
    </div>
  );
}
