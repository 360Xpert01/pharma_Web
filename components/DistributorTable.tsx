"use client";

import { useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllDistributors } from "@/store/slices/distributor/getAllDistributorsSlice";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import ImageWithFallback from "@/components/shared/ImageWithFallback";

// ── Types ─────────────────────────────────────────────────────────────────────
interface DistributorRow {
  id: string;
  pulseCode: string;
  legacyCode: string;
  distributorName: string;
  distributorStatus: string;
  zoneId: string;
  regionId: string;
  zoneLabel: string;
  regionLabel: string;
  distributorTypeId: string;
  distributorTypeName: string;
}

interface DistributorFilters {
  distributorStatus?: string;
  distributorTypeId?: string;
  zoneId?: string;
  regionId?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DistributorTable({
  searchTerm = "",
  filters: externalFilters,
}: {
  searchTerm?: string;
  filters?: DistributorFilters;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { distributors, loading, error, pagination } = useAppSelector((s) => s.allDistributors);
  const [sorting, setSorting] = useState<any[]>([{ id: "pulseCode", desc: true }]);

  const filters = externalFilters || {};

  // ── Fetch on mount / search / sort / filter change (resets to page 1) ─────
  useEffect(() => {
    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllDistributors({
        search: searchTerm,
        page: 1,
        limit: 20,
        sort: sortField,
        order: sortOrder,
        ...filters,
      })
    );
  }, [dispatch, searchTerm, JSON.stringify(filters), JSON.stringify(sorting)]);

  // ── Server-side pagination handler ────────────────────────────────────────
  const handlePaginationChange = (page: number, pageSize: number) => {
    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllDistributors({
        search: searchTerm,
        page,
        limit: pageSize,
        sort: sortField,
        order: sortOrder,
        ...filters,
      })
    );
  };

  // ── Map API data to row shape ─────────────────────────────────────────────
  const data = useMemo<DistributorRow[]>(
    () =>
      distributors.map((d) => ({
        id: d.id,
        pulseCode: d.pulseCode,
        legacyCode: d.legacyCode,
        distributorName: d.distributorName,
        distributorStatus: d.distributorStatus,
        zoneId: d.zoneId,
        regionId: d.regionId,
        zoneLabel: d.zoneName
          ? d.zoneDescription
            ? `${d.zoneName} - ${d.zoneDescription}`
            : d.zoneName
          : "—",
        regionLabel: d.regionName
          ? d.regionDescription
            ? `${d.regionName} - ${d.regionDescription}`
            : d.regionName
          : "—",
        distributorTypeId: d.distributorTypeId,
        distributorTypeName: d.distributorTypeName || "—",
      })),
    [distributors]
  );

  // ── Columns ───────────────────────────────────────────────────────────────
  const columns = useMemo<ColumnDef<DistributorRow>[]>(
    () => [
      {
        accessorKey: "pulseCode",
        header: "ID",
      },
      {
        accessorKey: "distributorName",
        header: "Distributor Name",
        cell: ({ row }) => (
          <Link
            href={`/dashboard/Distributor-Profile?id=${row.original.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <ImageWithFallback
              src=""
              alt={row.original.distributorName}
              width={36}
              height={36}
              className="rounded-8"
              fallbackSrc="/girlPic.png"
            />
            <div className="min-w-0">
              <p className="text-[var(--primary)] underline truncate font-medium">
                {row.original.distributorName}
              </p>
              <span className="text-xs text-gray-500 truncate block">{row.original.pulseCode}</span>
            </div>
          </Link>
        ),
      },
      {
        accessorKey: "legacyCode",
        header: "Legacy Code",
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">{row.original.legacyCode || "—"}</span>
        ),
      },
      {
        accessorKey: "distributorTypeName",
        header: "Distributor Type",
        enableSorting: false,
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">{row.original.distributorTypeName}</span>
        ),
      },
      {
        accessorKey: "zoneLabel",
        header: "Zone",
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">{row.original.zoneLabel}</span>
        ),
      },
      {
        accessorKey: "regionLabel",
        header: "Region",
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">{row.original.regionLabel}</span>
        ),
      },
      {
        accessorKey: "distributorStatus",
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge
            status={row.original.distributorStatus === "active" ? "active" : "inactive"}
          />
        ),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dashboard/UpdateDistributor?id=${row.original.id}`);
              }}
              className="hover:opacity-80 transition cursor-pointer"
              title="Edit Distributor"
            >
              <EditIcon />
            </button>
            <Link
              href={`/dashboard/Distributor-Profile?id=${row.original.id}`}
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
      onRetry={() => dispatch(getAllDistributors({ search: searchTerm, page: 1, limit: 20 }))}
      enableSorting={true}
      enableExpanding={false}
      enablePagination={true}
      serverSidePagination={true}
      serverSideSorting={true}
      totalItems={pagination?.total ?? 0}
      onPaginationChange={handlePaginationChange}
      onSortChange={(newSorting) => setSorting(newSorting)}
      pageSize={20}
      emptyMessage="No distributors found"
      PaginationComponent={TablePagination}
    />
  );
}
