"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  pageSizeOptions?: number[];
  showPageInfo?: boolean;
  showItemsPerPageSelector?: boolean;
  className?: string;
}

export default function TablePagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [10, 20, 30, 50, 100],
  showPageInfo = true,
  showItemsPerPageSelector = true,
  className = "",
}: TablePaginationProps) {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the range of items being displayed
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 bg-[var(--background)] rounded-xl mt-3 ${className}`}
    >
      {/* Left: Records info */}
      <div className="flex items-center gap-2 text-sm text-[var(--gray-6)]">
        <span>Records:</span>
        <span className="text-[var(--gray-8)] font-medium">
          {startItem}-{String(endItem).padStart(2, "0")}
        </span>
        <span>of</span>
        <span className="text-[var(--gray-8)] font-medium">{totalItems}</span>
      </div>

      {/* Right: Page controls */}
      <div className="flex items-center gap-2">
        {/* First Page Button */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-1.5 text-[var(--gray-5)] hover:text-[var(--gray-7)] hover:bg-[var(--gray-2)] rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Go to first page"
          title="First page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 text-[var(--gray-5)] hover:text-[var(--gray-7)] hover:bg-[var(--gray-2)] rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Go to previous page"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page label */}
        <span className="text-sm text-[var(--gray-6)]">Page:</span>

        {/* Page Dropdown */}
        <select
          value={currentPage}
          onChange={(e) => {
            const page = parseInt(e.target.value, 10);
            if (!isNaN(page)) {
              onPageChange(page);
            }
          }}
          className="min-w-[60px] px-2 py-1 text-center text-sm border border-[var(--gray-3)] rounded-md bg-[var(--background)] text-[var(--gray-8)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] cursor-pointer"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-1.5 text-[var(--gray-5)] hover:text-[var(--gray-7)] hover:bg-[var(--gray-2)] rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Go to next page"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-1.5 text-[var(--gray-5)] hover:text-[var(--gray-7)] hover:bg-[var(--gray-2)] rounded-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Go to last page"
          title="Last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
