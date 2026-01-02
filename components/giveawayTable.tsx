"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllGiveaways, resetGiveawaysState } from "@/store/slices/giveaway/getAllGiveawaysSlice";

export default function GiveawayTable() {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Redux state
  const { giveaways, loading, error } = useAppSelector((state) => state.allGiveaways);

  // Sort giveaways by createdAt (newest first)
  const sortedGiveaways = useMemo(() => {
    if (!giveaways || giveaways.length === 0) return [];

    return [...giveaways].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA; // Descending order (newest first)
    });
  }, [giveaways]);

  // Fetch giveaways on mount (prevent double call)
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(getAllGiveaways());
      hasFetched.current = true;
    }

    return () => {
      // Don't reset state on unmount to preserve data when navigating
      // dispatch(resetGiveawaysState());
    };
  }, [dispatch]);

  // Define columns for the table header
  const giveawayColumns = [
    { label: "Pulse Code", className: "w-[27%]" },
    { label: "Name", className: "w-[26%]" },
    { label: "Category", className: "w-[26%]" },
    { label: "Product Name", className: "w-[26%]" },
    { label: "", className: "w-[0%]" }, // Actions
  ];

  const handleRetry = () => {
    dispatch(getAllGiveaways());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Calculate paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGiveaways = sortedGiveaways.slice(startIndex, endIndex);

  return (
    <div className="w-full overflow-hidden">
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={5}
            message="Loading giveaways..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load giveaways" />
      ) : sortedGiveaways.length === 0 ? (
        <TableEmptyState
          message="No giveaways found"
          description="There are currently no giveaways in the system."
        />
      ) : (
        <div>
          <TableColumnHeader
            columns={giveawayColumns}
            containerClassName="flex w-full px-3"
            showBackground={false}
          />

          <div>
            {paginatedGiveaways.map((item) => (
              <div
                key={item.id}
                className="px-3 py-3 w-full flex items-center hover:bg-[var(--gray-0)] transition-all cursor-pointer border border-[var(--gray-2)] mx-3 my-3 rounded-8 bg-[var(--background)]"
              >
                {/* Pulse Code */}
                <div
                  className="w-[40%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={item.pulseCode || "N/A"}
                >
                  {item.pulseCode || "N/A"}
                </div>

                {/* Name */}
                <div
                  className="w-[40%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={item.name}
                >
                  {item.name}
                </div>

                {/* Category */}
                <div
                  className="w-[40%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={item.category}
                >
                  {item.category}
                </div>

                {/* Product Name */}
                <div
                  className="w-[30%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={item.productName}
                >
                  {item.productName}
                </div>

                {/* More Options */}
                <div className="w-[8%] flex items-center justify-end relative">
                  <button
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    className="p-2 text-[var(--gray-4)] hover:text-[var(--gray-6)] hover:bg-[var(--gray-1)] rounded-8 transition cursor-pointer"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {openId === item.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                      <div className="absolute right-0 top-10 mt-2 w-48 bg-[var(--light)] rounded-8 shadow-soft border border-[var(--gray-2)] z-50">
                        <button
                          onClick={() => {
                            console.log("Edit", item.id);
                            setOpenId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--gray-1)] cursor-pointer transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            console.log("View Details", item.id);
                            setOpenId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--gray-1)] cursor-pointer transition"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            console.log("Delete", item.id);
                            setOpenId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-[var(--destructive)] hover:bg-[var(--gray-1)] cursor-pointer transition"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {sortedGiveaways.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={sortedGiveaways.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              pageSizeOptions={[10, 20, 30, 50]}
              showPageInfo={true}
              showItemsPerPageSelector={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
