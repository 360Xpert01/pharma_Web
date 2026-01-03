"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ExpandedState,
} from "@tanstack/react-table";
import { ChevronUp, ChevronDown } from "lucide-react";

interface CenturoTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  enableSorting?: boolean;
  enableExpanding?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  renderExpandedRow?: (row: T) => React.ReactNode;
  onRowClick?: (row: T) => void;
  PaginationComponent?: React.ComponentType<{
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (size: number) => void;
    showItemsPerPageSelector?: boolean;
    showPageInfo?: boolean;
  }>;
}

export default function CenturoTable<T>({
  data,
  columns,
  loading = false,
  error = null,
  onRetry,
  enableSorting = true,
  enableExpanding = false,
  enablePagination = false,
  pageSize = 10,
  emptyMessage = "No data found",
  renderExpandedRow,
  onRowClick,
  PaginationComponent,
}: CenturoTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(pageSize);

  // Paginate data if pagination is enabled
  const paginatedData = React.useMemo(() => {
    if (!enablePagination) return data;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage, enablePagination]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: {
      sorting: enableSorting ? sorting : [],
      expanded: enableExpanding ? expanded : {},
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onExpandedChange: enableExpanding ? setExpanded : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getExpandedRowModel: enableExpanding ? getExpandedRowModel() : undefined,
  });

  const columnCount = columns.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Loading State
  if (loading) {
    return (
      <div className="w-full overflow-x-auto border border-(--gray-2) rounded-8 bg-(--background)">
        <table className="w-full border-collapse">
          <thead className="bg-(--gray-0) border-b border-(--gray-2)">
            <tr>
              {columns.map((_, index) => (
                <th key={index} className="px-4 py-3 text-left">
                  <div className="h-3 bg-(--gray-3) rounded-8 animate-pulse w-2/3"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-(--gray-2)">
                {columns.map((_, colIndex) => (
                  <td key={colIndex} className="px-4 py-3">
                    <div className="h-6 bg-(--gray-1) rounded-8 animate-pulse w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="w-full p-8 text-center border border-(--destructive) rounded-8 bg-(--background)">
        <p className="t-md t-err mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-(--destructive) text-(--light) rounded-8 hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  // Empty State
  if (!data.length) {
    return (
      <div className="w-full p-8 text-center border border-(--gray-2) rounded-8 bg-(--background)">
        <p className="t-md t-mute">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-x-auto border border-(--gray-2) rounded-8 bg-(--background)">
        <table className="w-full border-collapse">
          <thead className="bg-(--gray-0) border-b border-(--gray-2)">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      className={`px-4 py-3 text-left t-th ${
                        canSort ? "cursor-pointer select-none hover:bg-(--gray-1)" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span className="ml-auto">
                            {isSorted === "asc" && <ChevronUp className="w-4 h-4" />}
                            {isSorted === "desc" && <ChevronDown className="w-4 h-4" />}
                            {!isSorted && <ChevronUp className="w-4 h-4 opacity-20" />}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  onClick={() => onRowClick && onRowClick(row.original)}
                  className={`border-b border-(--gray-2) hover:bg-(--gray-0) transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${row.getIsExpanded() ? "bg-(--gray-0)" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 t-td">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>

                {/* Expanded Row */}
                {enableExpanding && row.getIsExpanded() && renderExpandedRow && (
                  <tr>
                    <td
                      colSpan={columnCount}
                      className="bg-(--gray-0) p-4 border-b border-(--gray-2)"
                    >
                      {renderExpandedRow(row.original)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {enablePagination && PaginationComponent && !loading && !error && data.length > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalItems={data.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          showItemsPerPageSelector
          showPageInfo
        />
      )}
    </div>
  );
}
