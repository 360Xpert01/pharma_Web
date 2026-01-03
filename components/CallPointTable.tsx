"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllCallPoints } from "@/store/slices/callPoint/getAllCallPointsSlice";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";

export default function CallPointsList() {
  const dispatch = useAppDispatch();
  const { callPoints, loading, error } = useAppSelector((state) => state.allCallPoints);
  const hasFetched = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch call points on component mount (prevent double call)
  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(getAllCallPoints());
      hasFetched.current = true;
    }
  }, [dispatch]);

  // Define columns for the table header - matching EmploySection/CampainTable pattern
  const callPointColumns = [
    { label: "Pulse Code", className: "w-[32%] ml-3" },
    { label: "Location Title", className: "w-[32%]" },
    { label: "Latitude", className: "w-[30%]" },
    { label: "Longitude", className: "w-[0%]" },
    { label: "", className: "w-[0%]" },
  ];

  const handleRetry = () => {
    dispatch(getAllCallPoints());
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
  const paginatedCallPoints = callPoints?.slice(startIndex, endIndex) || [];

  return (
    <div className="w-full overflow-hidden bg-(--background)">
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={4}
            message="Loading call points..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load call points" />
      ) : callPoints.length === 0 ? (
        <TableEmptyState
          message="No call points found"
          description="There are currently no call points in the system."
        />
      ) : (
        <div>
          {/* Column Headers */}
          <TableColumnHeader
            columns={callPointColumns}
            containerClassName="flex w-[80%]"
            showBackground={false}
          />

          {/* List */}
          <div>
            {paginatedCallPoints.map((point) => (
              <div
                key={point.id}
                className="px-3 py-3 w-[98%] flex items-center gap-6 hover:bg-[var(--gray-0)] transition-all cursor-pointer border border-[var(--gray-2)] mx-4 my-3 rounded-8 bg-[var(--background)]"
              >
                {/* Pulse Code */}
                <div className="w-[30%] t-td-b truncate" title={point.pulseCode || "N/A"}>
                  {point.pulseCode || "N/A"}
                </div>

                {/* Location Title */}
                <div className="w-[30%] t-td-b truncate" title={point.name}>
                  {point.name}
                </div>

                {/* Latitude */}
                <div className="w-[30%] t-td truncate" title={String(point.latitude)}>
                  {point.latitude}
                </div>

                {/* Longitude */}
                <div className="w-[20%] t-td truncate" title={String(point.longitude)}>
                  {point.longitude}
                </div>

                {/* More Options */}
                <div className="w-[8%] flex items-center justify-end">
                  <button className="p-2 text-[var(--gray-4)] hover:text-[var(--gray-6)] hover:bg-[var(--gray-1)] rounded-8 transition cursor-pointer">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {callPoints.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={callPoints.length}
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
