"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllGiveaways, GiveawayItemDisplay } from "@/store/slices/giveaway/getAllGiveawaysSlice";
import { useRouter } from "next/navigation";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";

interface Giveaway extends GiveawayItemDisplay {}

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
  const [sorting, setSorting] = useState<any[]>([]);

  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Redux state
  const { giveaways, loading, error, total } = useAppSelector((state) => state.allGiveaways);

  console.log(giveaways, "giveaways");

  // Fetch giveaways when searchTerm, filters, sorting or pagination changes
  useEffect(() => {
    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllGiveaways({
        search: searchTerm,
        page: paginationState.pageIndex + 1,
        limit: paginationState.pageSize,
        status: filters?.status,
        sort: sortField,
        order: sortOrder as any,
      })
    );
  }, [dispatch, searchTerm, filters, paginationState.pageIndex, paginationState.pageSize, sorting]);

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
        serverSideSorting={true}
        totalItems={total || 0}
        onPaginationChange={handlePaginationChange}
        onSortChange={(newSorting) => setSorting(newSorting)}
        pageSize={paginationState.pageSize}
        PaginationComponent={TablePagination}
        emptyMessage="No giveaways found"
      />
    </div>
  );
}
