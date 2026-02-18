"use client";

import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getAllTerritories,
  resetTerritoriesState,
  resetDeleteTerritoryState,
} from "@/store/slices/territory";
import { toast } from "sonner";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";

interface Territory {
  id: string;
  pulseCode: string;
  name: string;
  description: string;
  bricks: number;
}

interface TerritoryFilters {
  status?: string;
}

export default function TerritoryTable({
  searchTerm,
  filters: externalFilters,
}: {
  searchTerm: string;
  filters?: TerritoryFilters;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { territories, loading, error, pagination } = useAppSelector((s) => s.allTerritories);

  // Merge external filters with internal state
  const filters = useMemo(() => externalFilters || {}, [externalFilters]);

  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
    message: deleteMessage,
  } = useAppSelector((state) => state.deleteTerritory);

  // Fetch territories on mount and when filters change
  useEffect(() => {
    dispatch(
      getAllTerritories({
        search: searchTerm,
        page: 1,
        limit: 10,
        ...filters,
      })
    );

    return () => {
      dispatch(resetTerritoriesState());
    };
  }, [dispatch, searchTerm, JSON.stringify(filters)]);

  // Handle pagination changes
  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch(
      getAllTerritories({
        search: searchTerm,
        page,
        limit: pageSize,
        ...filters,
      })
    );
  };

  // Handle delete success
  useEffect(() => {
    if (deleteSuccess && deleteMessage) {
      toast.success("Success", { description: deleteMessage });
      dispatch(resetDeleteTerritoryState());
      // Refresh the list
      dispatch(getAllTerritories({ page: 1, limit: 10, search: searchTerm }));
    }
  }, [deleteSuccess, deleteMessage, dispatch, searchTerm]);

  // Handle errors
  useEffect(() => {
    if (deleteError) {
      toast.error("Error", { description: deleteError });
    }
  }, [deleteError]);

  // ================= DATA =================
  const data = useMemo<Territory[]>(() => {
    return territories.map((t) => ({
      id: t.id,
      pulseCode: t.pulseCode,
      name: t.name,
      description: t.description || "N/A",
      bricks: t.bricks?.length || 0,
    }));
  }, [territories]);

  // ================= COLUMNS =================
  const columns = useMemo<ColumnDef<Territory>[]>(
    () => [
      {
        accessorKey: "pulseCode",
        header: "Pulse Code",
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)] line-clamp-1">
            {row.original.description}
          </span>
        ),
      },
      // {
      //   accessorKey: "bricks",
      //   header: "Bricks",
      //   cell: ({ row }) => (
      //     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      //       {row.original.bricks} brick(s)
      //     </span>
      //   ),
      // },
      {
        id: "expand",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {/* Edit Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dashboard/territory-form?id=${row.original.id}`);
              }}
              className="group hover:opacity-80 transition cursor-pointer"
              title="Edit Territory"
            >
              <EditIcon />
            </button>
          </div>
        ),
      },
    ],
    [router]
  );

  return (
    <CenturoTable
      data={data}
      columns={columns}
      loading={loading}
      error={error}
      onRetry={() =>
        dispatch(
          getAllTerritories({
            page: 1,
            limit: 10,
            ...filters,
          })
        )
      }
      enableSorting={true}
      enableExpanding={false}
      enablePagination={true}
      serverSidePagination={true}
      totalItems={pagination?.total || 0}
      onPaginationChange={handlePaginationChange}
      pageSize={10}
      emptyMessage="No territories found"
      PaginationComponent={TablePagination}
    />
  );
}
