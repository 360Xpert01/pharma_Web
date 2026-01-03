"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CenturoTable";
import TablePagination from "@/components/TablePagination";
import { getAllPrefixes } from "@/store/slices/preFix/getAllPrefixesSlice";

interface PrefixItem {
  entity: string;
  code: string;
}

export default function PrefixListComponent() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllPrefixes());
  }, [dispatch]);

  const { prefixes, loading, error } = useSelector((state: any) => state.allPrefixes);

  const handleRetry = () => {
    dispatch(getAllPrefixes());
  };

  const columns: ColumnDef<PrefixItem>[] = [
    {
      header: "Entity Name",
      accessorKey: "entity",
      cell: ({ row }) => (
        <div className="t-td-b" title={row.original.entity}>
          {row.original.entity}
        </div>
      ),
    },
    {
      header: "Prefix Code",
      accessorKey: "code",
      cell: ({ row }) => (
        <div className="t-td text-center" title={row.original.code}>
          {row.original.code}
        </div>
      ),
    },
    {
      id: "example",
      header: "Example",
      cell: ({ row, table }) => {
        const index = row.index;
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;
        const globalIndex = pageIndex * pageSize + index + 1;
        return (
          <div className="t-td-b text-right pr-6">
            {row.original.code}-{String(globalIndex).padStart(2, "0")}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={prefixes || []}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No prefixes found"
      />
    </div>
  );
}
