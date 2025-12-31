"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/slices/product/getAllProductsSlice";
import { formatDate } from "@/utils/formatDate";

export default function SampleManagTable() {
  const [openId, setOpenId] = useState<string | null>(null);
  const dispatch = useDispatch<any>();

  const { products, loading, error } = useSelector((state: any) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Define columns for the table header
  const sampleColumns = [
    { label: "Pulse Code", className: "flex-1" },
    { label: "Date", className: "flex-1" },
    { label: "Product Name", className: "flex-1" },
    { label: "SKUS", className: "flex-1" },
    { label: "", className: "w-12" }, // Actions
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="px-3">
        <TableColumnHeader
          columns={sampleColumns}
          containerClassName="flex text-sm font-medium gap-4"
        />
      </div>

      {/* Loading State */}
      {loading && <div className="px-3 py-8 text-center text-(--gray-5)">Loading products...</div>}

      {/* Error State */}
      {error && <div className="px-3 py-8 text-center text-(--destructive)">{error}</div>}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="px-3 py-8 text-center text-(--gray-5)">No products found.</div>
      )}

      {/* Products List */}
      {!loading &&
        !error &&
        products.map((item: any) => (
          <div
            key={item.id}
            className="px-3 py-1 transition-colors flex items-center hover:bg-(--gray-1)"
          >
            <div className="w-full rounded-lg p-4 shadow-sm bg-[var(--background)]">
              {/* Perfectly Equal Columns using flex */}
              <div className="flex items-center text-sm font-medium gap-4">
                {/* Pulse Code */}
                <div className="flex-1 font-bold font-mono text-(--gray-6)">
                  {item.pulseCode || "N/A"}
                </div>

                {/* Date */}
                <div className="flex-1 font-medium text-(--gray-4)">
                  {formatDate(item.createdAt)}
                </div>

                {/* Product Name */}
                <div className="flex-1 font-semibold text-(--gray-9)">{item.name || "N/A"}</div>

                {/* Category */}
                <div className="flex-1 font-medium text-(--gray-4)">
                  {item.productCategory || "N/A"}
                </div>

                {/* More Options */}
                <div className="w-12 flex justify-end flex-shrink-0">
                  <div className="relative">
                    <button
                      onClick={() => setOpenId(openId === item.id ? null : item.id)}
                      className="p-2 rounded-full transition cursor-pointer text-(--gray-4) hover:text-(--gray-7) hover:bg-(--gray-1)"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openId === item.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                        <div className="absolute right-0 top-10 mt-2 w-48 rounded-lg shadow-lg z-50 bg-[var(--background)] border border-(--gray-2)">
                          <div className="py-1">
                            <button className="w-full text-left px-4 py-2 text-sm cursor-pointer transition text-(--gray-7) hover:bg-(--gray-1)">
                              Edit
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm cursor-pointer transition text-(--gray-7) hover:bg-(--gray-1)">
                              Duplicate
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm cursor-pointer transition text-(--destructive) hover:bg-(--gray-1)">
                              Delete
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
