"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import ImageWithFallback from "@/components/shared/ImageWithFallback";

// ── Dummy Data ──────────────────────────────────────────────────────────────
const DUMMY_DISTRIBUTORS = [
  {
    id: "dist-001",
    pulseCode: "DST-0001",
    legacyCode: "LEG-001",
    distributorName: "Alpha Pharma Distributors",
    distributorStatus: "active",
    zone: "North Zone",
    region: "Lahore Region",
    distributorType: "Wholesale",
  },
  {
    id: "dist-002",
    pulseCode: "DST-0002",
    legacyCode: "LEG-002",
    distributorName: "Beta Medical Supplies",
    distributorStatus: "active",
    zone: "South Zone",
    region: "Karachi Region",
    distributorType: "Retail",
  },
  {
    id: "dist-003",
    pulseCode: "DST-0003",
    legacyCode: "LEG-003",
    distributorName: "Gamma Health Traders",
    distributorStatus: "inactive",
    zone: "East Zone",
    region: "Islamabad Region",
    distributorType: "Wholesale",
  },
  {
    id: "dist-004",
    pulseCode: "DST-0004",
    legacyCode: "LEG-004",
    distributorName: "Delta Pharma Network",
    distributorStatus: "active",
    zone: "West Zone",
    region: "Peshawar Region",
    distributorType: "Sub-Distributor",
  },
  {
    id: "dist-005",
    pulseCode: "DST-0005",
    legacyCode: "LEG-005",
    distributorName: "Epsilon Drug Mart",
    distributorStatus: "active",
    zone: "Central Zone",
    region: "Multan Region",
    distributorType: "Retail",
  },
  {
    id: "dist-006",
    pulseCode: "DST-0006",
    legacyCode: "LEG-006",
    distributorName: "Zeta MedCare Distributors",
    distributorStatus: "inactive",
    zone: "North Zone",
    region: "Faisalabad Region",
    distributorType: "Wholesale",
  },
];

// ── Types ────────────────────────────────────────────────────────────────────
interface DistributorRow {
  id: string;
  pulseCode: string;
  legacyCode: string;
  distributorName: string;
  distributorStatus: string;
  zone: string;
  region: string;
  distributorType: string;
}

interface DistributorFilters {
  status?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DistributorTable({
  searchTerm = "",
  filters: externalFilters,
}: {
  searchTerm?: string;
  filters?: DistributorFilters;
}) {
  const router = useRouter();
  const [sorting, setSorting] = useState<any[]>([]);

  // Filter by search term
  const data = useMemo<DistributorRow[]>(() => {
    const term = searchTerm.toLowerCase();
    return DUMMY_DISTRIBUTORS.filter(
      (d) =>
        d.distributorName.toLowerCase().includes(term) ||
        d.pulseCode.toLowerCase().includes(term) ||
        d.legacyCode.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // ── Columns ──────────────────────────────────────────────────────────────
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
              <span className="text-xs text-gray-500 truncate block">
                {row.original.distributorType}
              </span>
            </div>
          </Link>
        ),
      },
      {
        accessorKey: "legacyCode",
        header: "Legacy Code",
        cell: ({ row }) => (
          <span className="text-[var(--muted-foreground)]">{row.original.legacyCode}</span>
        ),
      },
      {
        accessorKey: "zone",
        header: "Zone",
      },
      {
        accessorKey: "region",
        header: "Region",
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
            {/* Edit */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dashboard/UpdateDistributor?id=${row.original.id}`);
              }}
              className="group hover:opacity-80 transition cursor-pointer"
              title="Edit Distributor"
            >
              <EditIcon />
            </button>
            {/* View */}
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
      loading={false}
      error={null}
      onRetry={() => {}}
      enableSorting={true}
      enableExpanding={false}
      enablePagination={true}
      serverSidePagination={false}
      serverSideSorting={false}
      totalItems={data.length}
      onPaginationChange={() => {}}
      onSortChange={(newSorting) => setSorting(newSorting)}
      pageSize={10}
      emptyMessage="No distributors found"
      PaginationComponent={TablePagination}
    />
  );
}
