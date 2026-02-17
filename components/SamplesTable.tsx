"use client";

import React, { useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  clearPartySample,
  fetchPartySample,
  PartySample,
} from "@/store/slices/party/partySampleSlice";

export default function SamplesTable({ id }: { id: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, pagination } = useSelector((state: RootState) => state.partySample);

  const partySampleData = data || [];

  useEffect(() => {
    if (id) {
      dispatch(fetchPartySample({ partyId: id, page: 1, limit: 10 }));
    }

    return () => {
      dispatch(clearPartySample());
    };
  }, [dispatch, id]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch(fetchPartySample({ partyId: id, page, limit: pageSize }));
  };

  const columns = useMemo<ColumnDef<PartySample>[]>(
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
        cell: ({ row }) => <p className="font-medium text-(--gray-9)">{row.original?.product}</p>,
      },
      {
        accessorKey: "type",
        header: "SKU's",
        cell: ({ row }) => <p className="text-(--gray-5)">{row.original?.sku}</p>,
      },
      {
        accessorKey: "allocated",
        header: "Allocated",
        cell: ({ row }) => (
          <p className="font-semibold  text-[var(--destructive)]">{row.original.allocated}</p>
        ),
      },
    ],
    []
  );

  return (
    <div className="w-full">
      <CenturoTable
        data={partySampleData}
        columns={columns}
        loading={loading}
        error={error}
        enableExpanding={false}
        enablePagination={true}
        pageSize={10}
        emptyMessage="No samples found"
        PaginationComponent={TablePagination}
        serverSidePagination={true}
        totalItems={pagination?.total || 0}
        onPaginationChange={handlePaginationChange}
      />
    </div>
  );
}
