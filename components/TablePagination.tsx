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

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5; // Show max 5 page numbers at a time

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than max
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if near the start
      if (currentPage <= 3) {
        endPage = 4;
      }

      // Adjust if near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
      // Reset to page 1 when changing items per page
      onPageChange(1);
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-4 bg-[var(--background)] border-t border-[var(--gray-2)] ${className}`}
    >
      {/* Left: Items per page selector and info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
        {showItemsPerPageSelector && onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-[var(--gray-7)] whitespace-nowrap">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="min-w-[70px] px-3 py-1.5 border border-[var(--gray-3)] rounded-md text-sm text-[var(--gray-9)] bg-[var(--background)] hover:border-[var(--gray-4)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all cursor-pointer"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {showPageInfo && (
          <div className="text-[var(--gray-7)] whitespace-nowrap">
            <span className="text-[var(--gray-9)] font-semibold">
              {startItem}-{endItem}
            </span>{" "}
            of <span className="text-[var(--gray-9)] font-semibold">{totalItems}</span>
          </div>
        )}
      </div>

      {/* Right: Pagination controls */}
      <div className="flex items-center gap-1">
        {/* First Page Button */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 text-[var(--gray-7)] hover:text-[var(--gray-9)] hover:bg-[var(--gray-2)] rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--gray-7)]"
          aria-label="Go to first page"
          title="First page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-[var(--gray-7)] hover:text-[var(--gray-9)] hover:bg-[var(--gray-2)] rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--gray-7)]"
          aria-label="Go to previous page"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-1">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-1.5 text-[var(--gray-5)] text-sm font-medium select-none"
                >
                  •••
                </span>
              );
            }

            const pageNumber = page as number;
            const isCurrentPage = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`min-w-[36px] px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  isCurrentPage
                    ? "bg-[var(--primary)] text-white shadow-sm ring-1 ring-[var(--primary)]/20"
                    : "text-[var(--gray-7)] hover:text-[var(--gray-9)] hover:bg-[var(--gray-2)]"
                }`}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-[var(--gray-7)] hover:text-[var(--gray-9)] hover:bg-[var(--gray-2)] rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--gray-7)]"
          aria-label="Go to next page"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-[var(--gray-7)] hover:text-[var(--gray-9)] hover:bg-[var(--gray-2)] rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[var(--gray-7)]"
          aria-label="Go to last page"
          title="Last page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
