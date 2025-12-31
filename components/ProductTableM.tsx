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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--primary)"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex justify-center items-center py-12">
          <div className="bg-(--destructive-0) border border-(--destructive-1) rounded-lg px-6 py-4">
            <p className="text-(--destructive) font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Products List */}
      {!loading && !error && products.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <p className="text-(--gray-5) text-lg">No products found</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="space-y-3 -mt-6">
          {products.map((product) => (
            <div key={product.id} className="rounded-2xl shadow-sm border border-(--gray-2)">
              <div className="grid grid-cols-12 gap-4 px-8 py-3 items-center">
                {/* Pulse Code */}
                <div className="col-span-2">
                  <span className="font-mono text-sm text-(--gray-6)">{product.pulseCode}</span>
                </div>

                {/* Name */}
                <div className="col-span-2">
                  <span className="font-semibold text-(--gray-9)">{product.name}</span>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-(--primary-0) text-(--primary-2)">
                    {product.productCategory}
                  </span>
                </div>

                {/* SKU Count */}
                <div className="col-span-2 text-center">
                  <span className="text-lg font-bold text-(--gray-9)">{product.skuCount}</span>
                </div>

                {/* Image */}
                <div className="col-span-2 flex justify-center">
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-(--gray-2)">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-(--gray-2) flex items-center justify-center">
                        <span className="text-xs text-(--gray-4)">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Formula */}
                <div className="col-span-1">
                  <span className="font-mono text-sm text-(--gray-7)">
                    {product.productFormula}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-1 relative text-right">
                  <button
                    onClick={() => setOpenId(openId === product.id ? null : product.id)}
                    className="p-2 text-(--gray-4) hover:text-(--gray-7) hover:bg-(--gray-1) rounded-full transition cursor-pointer"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {openId === product.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                      <div className="absolute right-0 top-10 mt-2 w-48 bg-[var(--background)] rounded-lg shadow-lg border border-(--gray-2) z-50">
                        <div className="py-1">
                          <button className="w-full text-left px-4 py-2 text-sm text-(--gray-7) hover:bg-(--gray-1) cursor-pointer">
                            Edit Medicine
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-(--gray-7) hover:bg-(--gray-1) cursor-pointer">
                            View Details
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-(--destructive) hover:bg-(--destructive-0) cursor-pointer">
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
