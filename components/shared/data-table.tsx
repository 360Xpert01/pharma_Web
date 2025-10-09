"use client";

import { Button } from "@/components/ui/button/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/lib/icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { DataTableProps } from "@/types/shared";
import { useDataTable } from "@/hooks/useDataTable";

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
  emptyMessage = "No results found.",
  loading = false,
  className,
}: DataTableProps<TData, TValue>) {
  const { pagination, setPagination } = useDataTable();

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: pageCount !== undefined,
    manualFiltering: true,
    manualSorting: true,
  });

  // Loading skeleton
  const renderLoadingSkeleton = () => (
    <>
      {Array.from({ length: pagination.pageSize }).map((_, index) => (
        <TableRow key={index}>
          {columns.map((_, cellIndex) => (
            <TableCell key={cellIndex}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );

  // Empty state
  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
          <div className="text-sm">{emptyMessage}</div>
        </div>
      </TableCell>
    </TableRow>
  );

  // Table rows
  const renderTableRows = () => {
    if (loading) return renderLoadingSkeleton();
    if (!table.getRowModel().rows?.length) return renderEmptyState();

    return table.getRowModel().rows.map((row) => (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        className="hover:bg-muted/50"
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Table */}
      <ScrollArea className="rounded-md border">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
        {/* Row selection info */}
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <>
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected
            </>
          )}
        </div>

        {/* Page size selector */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pagination info */}
        <div className="flex items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() === -1 ? "..." : table.getPageCount()}
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            size="sm"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage() || loading}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || loading}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || loading}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="sm"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage() || loading}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
