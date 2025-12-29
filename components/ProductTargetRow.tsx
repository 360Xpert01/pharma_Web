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
}

export default function ProductTargetRow({
  product,
  onDelete,
  onInputChange,
}: ProductTargetRowProps) {
  const getPercentageColor = (percentage: number) => {
    if (percentage === 100) return "text-green-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-2">
      {/* Product Name and Target Info Row */}
      <div className="flex items-center gap-3">
        {/* Product Name */}
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
        </div>

        {/* Target Quantity */}
        <div>
          <p className="text-sm text-gray-500">{product.targetQuantity}</p>
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
          className="text-red-500 hover:text-red-700 transition cursor-pointer p-1.5 hover:bg-red-50 rounded-lg"
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
          className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm ${
            product.hasConflict ? "border-red-300 bg-red-50" : "border-gray-300"
          }`}
        />

        {/* Second Input Field (placeholder for future use) */}
        <input
          type="text"
          placeholder="e.g. Elt 250mg"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
        />
      </div>

      {/* Conflict Error Message */}
      {product.hasConflict && (
        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-600">
            {product.conflictMessage || "Conflict with existing target"}
          </p>
        </div>
      )}
    </div>
  );
}
