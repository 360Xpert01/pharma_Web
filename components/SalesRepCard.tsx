"use client";

import React from "react";
import { Search, MoreVertical, Trash2, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { ProductTarget } from "./ProductTargetRow";

export interface SalesRep {
  id: string;
  name: string;
  role: string;
  avatar: string;
  productTags: string[];
  products: ProductTarget[];
}

interface SalesRepCardProps {
  rep: SalesRep;
  onDeleteProduct: (repId: string, productId: string) => void;
  onProductInputChange: (repId: string, productId: string, value: string) => void;
  onConflictClick?: () => void;
}

export default function SalesRepCard({
  rep,
  onDeleteProduct,
  onProductInputChange,
  onConflictClick,
}: SalesRepCardProps) {
  // Check if any product has conflict
  const hasAnyConflict = rep.products.some((p) => p.hasConflict);

  // Get percentage color
  const getPercentageColor = (percentage: number) => {
    if (percentage === 100) return "text-(--gray-6)";
    if (percentage >= 50) return "text-(--warning)";
    return "text-(--destructive)";
  };

  // Get row border style based on conflict
  const getRowBorderStyle = (hasConflict: boolean) => {
    if (hasConflict) {
      return "border-2 border-(--destructive-1)";
    }
    return "border border-(--gray-2)";
  };

  return (
    <div className="bg-(--background) border border-(--gray-2) rounded-8 overflow-hidden">
      {/* Header Row: Avatar, Name, Role, Search, Menu */}
      <div className="flex items-center justify-between gap-4 p-5 pb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-8 bg-(--gray-2) overflow-hidden flex-shrink-0">
            <Image
              src={rep.avatar}
              alt={rep.name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name and Role */}
          <div>
            <p className="t-val-sm">{rep.name}</p>
            <p className="t-sm">{rep.role}</p>
          </div>
        </div>

        {/* Search and Menu */}
        <div className="flex items-center gap-3">
          {/* Search SKU Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Select SKU's"
              className="w-52 px-4 py-2.5 pl-10 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none text-sm bg-(--background)"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--gray-4)" />
          </div>

          {/* Three Dots Menu */}
          <button className="text-(--gray-4) hover:text-(--gray-6) p-2 hover:bg-(--gray-1) rounded-8 transition cursor-pointer">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Tags Row */}
      <div className="flex flex-wrap gap-2 px-5 pb-4">
        {rep.productTags.map((tag, index) => {
          // Alternate between filled and outlined styles
          const isFilled = index % 2 === 0;
          return (
            <span
              key={index}
              className={`px-3 py-1.5 text-sm font-medium rounded-8 ${
                isFilled
                  ? "bg-(--gray-8) text-(--light)"
                  : "bg-(--background) border border-(--gray-3) text-(--gray-7)"
              }`}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* Product Target Rows - Two Column Layout */}
      <div className="px-5 pb-4 space-y-3">
        {/* Create pairs of products for two-column layout */}
        {Array.from({ length: Math.ceil(rep.products.length / 2) }).map((_, rowIndex) => {
          const leftProduct = rep.products[rowIndex * 2];
          const rightProduct = rep.products[rowIndex * 2 + 1];

          return (
            <div key={rowIndex} className="grid grid-cols-2 gap-4">
              {/* Left Product Card */}
              {leftProduct && (
                <div
                  className={`rounded-8 p-4 bg-(--gray-0) ${getRowBorderStyle(leftProduct.hasConflict || false)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Product Name */}
                      <span className="t-label min-w-[120px]">{leftProduct.name}</span>
                      {/* Target Quantity */}
                      <span className="t-sm">{leftProduct.targetQuantity}</span>
                      {/* Percentage */}
                      <span
                        className={`t-label ${getPercentageColor(leftProduct.completionPercentage)}`}
                      >
                        {leftProduct.completionPercentage}%
                      </span>
                    </div>
                    {/* Delete Button */}
                    <button
                      onClick={() => onDeleteProduct(rep.id, leftProduct.id)}
                      className="text-(--destructive-1) hover:text-(--destructive) p-2 hover:bg-(--destructive-0) rounded-8 transition cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Right Product Card - Input Style */}
              {rightProduct && (
                <div
                  className={`rounded-8 p-4 bg-(--background) ${getRowBorderStyle(false)} flex items-center gap-3`}
                >
                  {/* Product Name Input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={rightProduct.inputValue || rightProduct.name}
                      onChange={(e) =>
                        onProductInputChange(rep.id, rightProduct.id, e.target.value)
                      }
                      placeholder="Product name"
                      className="w-full font-semibold text-(--primary) text-sm bg-transparent outline-none"
                    />
                  </div>
                  {/* Set Monthly Target Input */}
                  <input
                    type="text"
                    placeholder="Set Monthly Target"
                    className="px-3 py-2 border border-(--gray-2) rounded-8 text-sm text-(--gray-4) w-36 bg-(--background)"
                  />
                  {/* Share % Input */}
                  <input
                    type="text"
                    placeholder="Share (%)"
                    className="px-3 py-2 border border-(--gray-2) rounded-8 text-sm text-(--gray-4) w-24 bg-(--background)"
                  />
                </div>
              )}

              {/* Empty placeholder if odd number of products */}
              {!rightProduct && leftProduct && <div></div>}
            </div>
          );
        })}
      </div>

      {/* Conflict Warning Banner */}
      {hasAnyConflict && (
        <div
          onClick={onConflictClick}
          className="flex items-center gap-2 px-5 py-3 bg-(--destructive-0) cursor-pointer hover:bg-(--destructive-0) transition-colors"
        >
          <AlertTriangle className="w-4 h-4 text-(--destructive) flex-shrink-0" />
          <p className="t-md t-err">Conflicts In Sales Allocation</p>
        </div>
      )}
    </div>
  );
}
