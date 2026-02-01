"use client";

import React, { useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { clearPartyGiveaways, fetchPartyGiveaways } from "@/store/slices/party/partyGiveawaySlice";

interface Giveaway {
  id: string;
  date: string;
  name: string;
  type: string;
  available: number;
  allocated: number;
  status: "In Stock" | "Out of Stock" | "Low Stock";
}

export default function GiveawaysTable({ id }: { id: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, pagination } = useSelector(
    (state: RootState) => state.partyGiveaway
  );

  const giveaways = data || [];

  useEffect(() => {
    if (id) {
      dispatch(fetchPartyGiveaways({ partyId: id, page: 1, limit: 10 }));
    }

    return () => {
      dispatch(clearPartyGiveaways());
    };
  }, [dispatch, id]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch(fetchPartyGiveaways({ partyId: id, page, limit: pageSize }));
  };

  const columns = useMemo<ColumnDef<Giveaway>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => (
          <p className="font-medium text-(--gray-9)">{row.original?.pulseCode || "N/A"}</p>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <p className="text-(--gray-5)">{row.original.date}</p>,
      },
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => (
          <p className="font-medium text-(--gray-9)">{row.original.productName}</p>
        ),
      },
      // {
      //   accessorKey: "type",
      //   header: "SkU's",
      //   cell: ({ row }) => <p className="text-(--gray-5)">{row.original.type}</p>,
      // },
      // {
      //   accessorKey: "available",
      //   header: "Available",
      //   cell: ({ row }) => (
      //     <p className="font-semibold text-(--gray-9)">{row.original.available}</p>
      //   ),
      // },
      {
        accessorKey: "allocated",
        header: "Allocated",
        cell: ({ row }) => (
          <p className="font-semibold text-[var(--destructive)]">{row.original.allocated}</p>
        ),
      },
      // {
      //   accessorKey: "status",
      //   header: "Status",
      //   cell: ({ row }) => {
      //     const status = row.original.status;
      //     let badgeStatus: "active" | "inactive" | "pending" | "rejected" = "inactive";
      //     let statusLabel = status;

      //     if (status === "In Stock") {
      //       badgeStatus = "active";
      //       statusLabel = "In Stock";
      //     } else if (status === "Out of Stock") {
      //       badgeStatus = "rejected";
      //       statusLabel = "Out of Stock";
      //     } else if (status === "Low Stock") {
      //       badgeStatus = "pending";
      //       statusLabel = "Low Stock";
      //     }

      //     return <StatusBadge status={badgeStatus} label={statusLabel} />;
      //   },
      // },
      // {
      //   id: "actions",
      //   header: "",
      //   cell: () => (
      //     <div className="flex justify-end">
      //       <MoreVertical className="w-4 h-4 text-(--gray-4) cursor-pointer" />
      //     </div>
      //   ),
      // },
    ],
    []
  );

  return (
    <div className="w-full">
      <CenturoTable
        data={giveaways}
        columns={columns}
        loading={loading}
        error={error}
        enableExpanding={false}
        enablePagination={true}
        pageSize={10}
        emptyMessage="No giveaways found"
        PaginationComponent={TablePagination}
        serverSidePagination={true}
        totalItems={pagination?.total || 0}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
}
