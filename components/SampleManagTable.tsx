"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/slices/product/getAllProductsSlice";
import { formatDate } from "@/utils/formatDate";

export default function SampleManagTable() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const dispatch = useDispatch<any>();

  const { products, loading, error } = useSelector((state: any) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Define columns for the table header
  const sampleColumns = [
    { label: "Pulse Code", className: "w-[25%] ml-3" },
    { label: "Date", className: "w-[25%]" },
    { label: "Product Name", className: "w-[31%]" },
    { label: "Category", className: "w-[0%]" },
    { label: "", className: "w-[0%]" }, // Actions
  ];

  const handleRetry = () => {
    dispatch(getAllProducts());
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
  const paginatedProducts = products?.slice(startIndex, endIndex) || [];

  return (
    <div className="w-full overflow-hidden">
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={5}
            message="Loading products..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load products" />
      ) : products.length === 0 ? (
        <TableEmptyState
          message="No products found"
          description="There are currently no products in the system."
        />
      ) : (
        <div>
          <TableColumnHeader
            columns={sampleColumns}
            containerClassName="flex w-[80%]"
            showBackground={false}
          />

          <div>
            {paginatedProducts.map((item: any) => (
              <div
                key={item.id}
                className="px-3 py-3 w-[98%] flex items-center gap-6 hover:bg-[var(--gray-0)] transition-all cursor-pointer border border-[var(--gray-2)] mx-4 my-3 rounded-8 bg-[var(--background)]"
              >
                {/* Pulse Code */}
                <div
                  className="w-[20%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={item.pulseCode || "N/A"}
                >
                  {item.pulseCode || "N/A"}
                </div>

                {/* Date */}
                <div
                  className="w-[20%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={formatDate(item.createdAt)}
                >
                  {formatDate(item.createdAt)}
                </div>

                {/* Product Name */}
                <div
                  className="w-[25%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={item.name || "N/A"}
                >
                  {item.name || "N/A"}
                </div>

                {/* Category */}
                <div
                  className="w-[27%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={item.productCategory || "N/A"}
                >
                  {item.productCategory || "N/A"}
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
                            console.log("Duplicate", item.id);
                            setOpenId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--gray-1)] cursor-pointer transition"
                        >
                          Duplicate
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
          {products && products.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={products.length}
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
