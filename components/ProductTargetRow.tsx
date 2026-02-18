"use client";

import React from "react";

export interface SKU {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  profilePicture?: string;
  skus: SKU[];
}

interface ProductTargetRowProps {
  product: Product;
  skuTargets: Record<string, string>;
  onSkuTargetChange: (skuId: string, value: string) => void;
}

export default function ProductTargetRow({
  product,
  skuTargets,
  onSkuTargetChange,
}: ProductTargetRowProps) {
  return (
    <div className="flex gap-8 items-center bg-white rounded-8 p-4">
      {/* Product Branding */}
      <div className="flex flex-col items-center w-32 shrink-0">
        <div className="w-24 h-24 bg-(--gray-0) rounded-8 flex items-center justify-center overflow-hidden mb-3 border border-(--gray-1)">
          {product.profilePicture ? (
            <img
              src={product.profilePicture}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-(--gray-3) text-full">💊</div>
          )}
        </div>
        <span className="t-h4 text-center text-(--gray-9) font-bold">{product.name}</span>
      </div>

      {/* SKU Grid */}
      <div className="flex-1 bg-(--gray-0) rounded-8 p-6 border border-(--gray-1)">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-(--background) p-4 rounded-8">
          {product.skus?.map((sku) => (
            <div
              key={sku.id}
              className="bg-(--gray-0) rounded-8 px-4 py-3 flex items-center justify-between shadow-soft"
            >
              <span className="t-sm font-bold text-(--gray-9)">{sku.name || "N/A"}</span>
              <div className="w-24 h-9 bg-(--background) rounded-8 border border-(--gray-2) flex items-center justify-between px-2 overflow-hidden focus-within:border-(--primary) transition-colors">
                <input
                  type="text"
                  placeholder="Target"
                  className="w-full h-full text-right t-sm font-bold text-(--gray-9) focus:outline-none placeholder:text-(--gray-3) placeholder:font-normal bg-transparent"
                  value={skuTargets[sku.id] || ""}
                  onChange={(e) => onSkuTargetChange(sku.id, e.target.value)}
                />
                <span className="ml-1 text-(--gray-5) select-none text-xs">%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
