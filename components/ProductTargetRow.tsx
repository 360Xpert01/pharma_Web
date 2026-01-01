"use client";

import React from "react";
import { Trash2, AlertCircle } from "lucide-react";

export interface ProductTarget {
  id: string;
  name: string;
  targetQuantity: string;
  completionPercentage: number;
  inputValue: string;
  hasConflict?: boolean;
  conflictMessage?: string;
}

interface ProductTargetRowProps {
  product: ProductTarget;
  onDelete: (id: string) => void;
  onInputChange: (id: string, value: string) => void;
  onConflictClick?: () => void;
}

export default function ProductTargetRow({
  product,
  onDelete,
  onInputChange,
  onConflictClick,
}: ProductTargetRowProps) {
  const getPercentageColor = (percentage: number) => {
    if (percentage === 100) return "text-(--success)";
    if (percentage >= 50) return "text-(--warning)";
    return "text-(--destructive)";
  };

  return (
    <div className="space-y-2">
      {/* Product Name and Target Info Row */}
      <div className="flex items-center gap-3">
        {/* Product Name */}
        <div className="flex-1">
          <p className="font-semibold text-(--gray-9) text-sm">{product.name}</p>
        </div>

        {/* Target Quantity */}
        <div>
          <p className="text-sm text-(--gray-5)">{product.targetQuantity}</p>
        </div>

        {/* Completion Percentage */}
        <div>
          <p className={`text-sm font-bold ${getPercentageColor(product.completionPercentage)}`}>
            {product.completionPercentage}%
          </p>
        </div>

        {/* Delete Icon */}
        <button
          onClick={() => onDelete(product.id)}
          className="text-(--destructive) hover:text-(--destructive) transition cursor-pointer p-1.5 hover:bg-(--destructive-0) rounded-lg"
          title="Delete product target"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Two Input Fields Row */}
      <div className={`grid grid-cols-2 gap-3 ${product.hasConflict ? "pb-2" : ""}`}>
        {/* First Input Field */}
        <input
          type="text"
          value={product.inputValue}
          onChange={(e) => onInputChange(product.id, e.target.value)}
          placeholder="e.g. Atorvastatin 10mg"
          className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none text-sm ${
            product.hasConflict
              ? "border-(--destructive-1) bg-(--destructive-0)"
              : "border-(--gray-3)"
          }`}
        />

        {/* Second Input Field (placeholder for future use) */}
        <input
          type="text"
          placeholder="e.g. Elt 250mg"
          className="px-3 py-2 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none text-sm"
        />
      </div>

      {/* Conflict Error Message */}
      {product.hasConflict && (
        <div
          onClick={onConflictClick}
          className="flex items-center gap-2 px-3 py-2 bg-(--destructive-0) border border-(--destructive-1) rounded-lg cursor-pointer hover:bg-(--destructive-0) transition-colors"
        >
          <AlertCircle className="w-4 h-4 text-(--destructive) flex-shrink-0" />
          <p className="text-xs text-(--destructive)">
            {product.conflictMessage || "Conflict with existing target"}
          </p>
        </div>
      )}
    </div>
  );
}
