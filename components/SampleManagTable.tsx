"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/slices/product/getAllProductsSlice";

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
    { label: "Product Code", className: "flex-1" },
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
      {loading && <div className="px-3 py-8 text-center text-gray-500">Loading products...</div>}

      {/* Error State */}
      {error && <div className="px-3 py-8 text-center text-red-500">{error}</div>}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="px-3 py-8 text-center text-gray-500">No products found.</div>
      )}

      {/* Products List */}
      {!loading &&
        !error &&
        products.map((item: any) => (
          <div
            key={item.id}
            className="px-3 py-1 hover:bg-gray-50 transition-colors  flex items-center"
          >
            <div className="w-full bg-white rounded-lg p-4 shadow-sm">
              {/* Perfectly Equal Columns using flex */}
              <div className="flex items-center text-sm font-medium gap-4">
                {/* Pulse Code */}
                <div className="flex-1 font-bold text-gray-600 font-mono">
                  {item.pulseCode || "N/A"}
                </div>

                {/* Product Code */}
                <div className="flex-1 font-medium text-gray-400">{item.productCode || "N/A"}</div>

                {/* Product Name */}
                <div className="flex-1 font-semibold text-gray-900">{item.name || "N/A"}</div>

                {/* Category */}
                <div className="flex-1 font-medium text-gray-400">
                  {item.productCategory || "N/A"}
                </div>

                {/* More Options */}
                <div className="w-12 flex justify-end flex-shrink-0">
                  <div className="relative">
                    <button
                      onClick={() => setOpenId(openId === item.id ? null : item.id)}
                      className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition cursor-pointer"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openId === item.id && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                        <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                          <div className="py-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                              Edit
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                              Duplicate
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
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
