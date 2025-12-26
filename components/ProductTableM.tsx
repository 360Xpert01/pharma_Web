"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import TableColumnHeader from "@/components/TableColumnHeader";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllProducts } from "@/store/slices/product/getAllProductsSlice";

export default function MedicineTable() {
  const [openId, setOpenId] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  // Get products from Redux store
  const { products, loading, error } = useAppSelector((state) => state.allProducts);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Define columns for the table header
  const productColumns = [
    { label: "Pulse Code", className: "col-span-2" },
    { label: "Name", className: "col-span-2" },
    { label: "Category", className: "col-span-2" },
    { label: "SKU", className: "col-span-2 text-center" },
    { label: "Image", className: "col-span-2 text-center" },
    { label: "Formula", className: "col-span-2" },
    { label: "", className: "col-span-1" },
  ];

  return (
    <div>
      <div className="px-8">
        <TableColumnHeader columns={productColumns} gridCols={12} />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex justify-center items-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg px-6 py-4">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Products List */}
      {!loading && !error && products.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="space-y-3 -mt-6">
          {products.map((product) => (
            <div key={product.id} className="rounded-2xl shadow-sm border border-gray-200">
              <div className="grid grid-cols-12 gap-4 px-8 py-3 items-center">
                {/* Pulse Code */}
                <div className="col-span-2">
                  <span className="font-mono text-sm text-gray-600">{product.pulseCode}</span>
                </div>

                {/* Name */}
                <div className="col-span-2">
                  <span className="font-semibold text-gray-900">{product.name}</span>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {product.productCategory}
                  </span>
                </div>

                {/* SKU Count */}
                <div className="col-span-2 text-center">
                  <span className="text-lg font-bold text-gray-900">{product.skuCount}</span>
                </div>

                {/* Image */}
                <div className="col-span-2 flex justify-center">
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-gray-200">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Formula */}
                <div className="col-span-1">
                  <span className="font-mono text-sm text-gray-700">{product.productFormula}</span>
                </div>

                {/* Actions */}
                <div className="col-span-1 relative text-right">
                  <button
                    onClick={() => setOpenId(openId === product.id ? null : product.id)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition cursor-pointer"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {openId === product.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                      <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            Edit Medicine
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            View Details
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
