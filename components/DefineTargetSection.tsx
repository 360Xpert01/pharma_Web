"use client";

import React from "react";
import ProductTargetRow from "./ProductTargetRow";

interface SKU {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  profilePicture?: string;
  skus: SKU[];
}

interface DefineTargetSectionProps {
  products: Product[];
  teamDetailsLoading: boolean;
  skuTargets: Record<string, string>;
  onSkuTargetChange: (skuId: string, value: string) => void;
  selectedTeam: string;
}

export default function DefineTargetSection({
  products,
  teamDetailsLoading,
  skuTargets,
  onSkuTargetChange,
  selectedTeam,
}: DefineTargetSectionProps) {
  if (!selectedTeam) return null;

  return (
    <div className="space-y-6 pt-10">
      <div className="flex items-center gap-2">
        <h2 className="t-h2 text-(--gray-9) font-bold">Define Target</h2>
      </div>

      <div className="space-y-8">
        {teamDetailsLoading && (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-(--gray-3) border-t-primary rounded-8 animate-spin mb-4"></div>
            <p className="t-md text-(--gray-5)">Loading team products and SKUs...</p>
          </div>
        )}

        {!teamDetailsLoading && products.length === 0 && (
          <div className="py-20 text-center bg-(--gray-0) rounded-8 border-2 border-dashed border-(--gray-2)">
            <p className="t-lg text-(--gray-5)">No products found for this team.</p>
          </div>
        )}

        {!teamDetailsLoading &&
          products.length > 0 &&
          products.map((product) => (
            <ProductTargetRow
              key={product.id}
              product={product}
              skuTargets={skuTargets}
              onSkuTargetChange={onSkuTargetChange}
            />
          ))}
      </div>
    </div>
  );
}
