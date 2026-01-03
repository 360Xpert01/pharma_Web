"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TablePagination from "@/components/TablePagination";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllProducts } from "@/store/slices/product/getAllProductsSlice";

export default function MedicineTable() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const dispatch = useAppDispatch();

  // Get products from Redux store
  const { products, loading, error, total, page, limit } = useAppSelector(
    (state) => state.allProducts
  );

  // Fetch products when page or items per page changes
  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  // Define columns for the table header
  const productColumns = [
    { label: "Pulse Code", className: "w-[17%]" },
    { label: "Name", className: "w-[17%]" },
    { label: "Category", className: "w-[17%]" },
    { label: "SKU", className: "w-[17%]" },
    { label: "Image", className: "w-[17%]" },
    { label: "Formula", className: "w-[17%] mr-4" },
    { label: "", className: "w-[0%]" },
  ];

  const handleRetry = () => {
    dispatch(getAllProducts({ page: currentPage, limit: itemsPerPage }));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="mr-6">
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={7}
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
            columns={productColumns}
            containerClassName="flex w-full px-3"
            showBackground={false}
          />

          <div>
            {products.map((product) => (
              <div
                key={product.id}
                className="px-3 py-3 w-full flex items-center gap-4 hover:bg-[var(--gray-0)] transition-all cursor-pointer border border-[var(--gray-2)] mx-3 my-3 rounded-8 bg-[var(--background)]"
              >
                {/* Pulse Code */}
                <div className="w-[17%] t-td-b truncate" title={product.pulseCode}>
                  {product.pulseCode}
                </div>

                {/* Name */}
                <div className="w-[17%] t-td-b truncate" title={product.name}>
                  {product.name}
                </div>

                {/* Category */}
                <div className="w-[17%]">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-8 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">
                    {product.productCategory}
                  </span>
                </div>

                {/* SKU Count */}
                <div className="w-[17%] flex items-center">
                  <span className="t-val-sm">{product.skuCount}</span>
                </div>

                {/* Image */}
                <div className="w-[17%] flex items-center">
                  <div className="w-12 h-12 rounded-8 overflow-hidden ring-2 ring-[var(--gray-2)]">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--gray-2)] flex items-center justify-center">
                        <span className="text-xs text-[var(--gray-5)]">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Formula */}
                <div className="w-[17%] t-td-b truncate" title={product.productFormula}>
                  {product.productFormula}
                </div>

                {/* Actions */}
                <div className="flex-1 flex items-center justify-end relative">
                  <button
                    onClick={() => setOpenId(openId === product.id ? null : product.id)}
                    className="p-2 text-[var(--gray-4)] hover:text-[var(--gray-6)] hover:bg-[var(--gray-1)] rounded-8 transition cursor-pointer"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {openId === product.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                      <div className="absolute right-0 top-10 mt-2 w-48 bg-[var(--light)] rounded-8 shadow-soft border border-[var(--gray-2)] z-50">
                        <button
                          onClick={() => {
                            console.log("Edit", product.id);
                            setOpenId(null);
                          }}
                          className="w-full text-left px-4 py-2 t-td hover:bg-[var(--gray-1)] cursor-pointer transition"
                        >
                          Edit Medicine
                        </button>
                        <button
                          onClick={() => {
                            console.log("View Details", product.id);
                            setOpenId(null);
                          }}
                          className="w-full text-left px-4 py-2 t-td hover:bg-[var(--gray-1)] cursor-pointer transition"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            console.log("Delete", product.id);
                            setOpenId(null);
                          }}
                          className="w-full text-left px-4 py-2 t-td t-err hover:bg-[var(--gray-1)] cursor-pointer transition"
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
          {!loading && !error && products.length > 0 && (
            <TablePagination
              currentPage={currentPage}
              totalItems={total}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              pageSizeOptions={[10, 20, 30, 50, 100]}
              showPageInfo={true}
              showItemsPerPageSelector={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
