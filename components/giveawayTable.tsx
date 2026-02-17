"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllGiveaways } from "@/store/slices/giveaway/getAllGiveawaysSlice";
import { useRouter } from "next/navigation";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";

interface Giveaway {
  id: string;
  pulseCode: string;
  name: string;
  category: string;
  productName: string;
  createdAt: string;
}

export default function GiveawayTable({
  searchTerm,
  filters,
}: {
  searchTerm?: string;
  filters?: { status?: string };
}) {
  const dispatch = useAppDispatch();
  const [openId, setOpenId] = useState<string | null>(null);
  const router = useRouter();

  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Redux state
  const { giveaways, loading, error, total } = useAppSelector((state) => state.allGiveaways);

  console.log(giveaways, "giveaways");

  // Fetch giveaways when searchTerm, filters, or pagination changes
  useEffect(() => {
    dispatch(
      getAllGiveaways({
        search: searchTerm,
        page: paginationState.pageIndex + 1,
        limit: paginationState.pageSize,
        status: filters?.status,
      })
    );
  }, [dispatch, searchTerm, filters, paginationState.pageIndex, paginationState.pageSize]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPaginationState({ pageIndex: page - 1, pageSize });
  };

  const handleRetry = () => {
    dispatch(
      getAllGiveaways({
        search: searchTerm,
        page: paginationState.pageIndex + 1,
        limit: paginationState.pageSize,
      })
    );
  };

  const columns: ColumnDef<Giveaway>[] = [
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
        <div className="flex items-center gap-3 justify-end" onClick={(e) => e.stopPropagation()}>
          {/* Edit Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/UpdateGiveaway?id=${row.original.id}`);
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="Edit Giveaway"
          >
            <EditIcon />
          </button>

          {/* View Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/giveaway-details?id=${row.original.id}`);
            }}
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
        data={giveaways}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        serverSidePagination={true}
        totalItems={total || 0}
        onPaginationChange={handlePaginationChange}
        pageSize={paginationState.pageSize}
        PaginationComponent={TablePagination}
        emptyMessage="No giveaways found"
      />
    </div>
  );
}
