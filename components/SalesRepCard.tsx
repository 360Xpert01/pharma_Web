"use client";

import React, { useState } from "react";
import { Search, MoreVertical, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { ProductTarget } from "./ProductTargetRow";
import EditIcon from "./svgs/edit-icon";
import DeleteIcon from "./svgs/delete-icon";

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
  conflictTags: string[]; // Tags that appear in multiple sales reps
  onDeleteProduct: (repId: string, productId: string) => void;
  onProductInputChange: (repId: string, productId: string, value: string) => void;
  onConflictClick?: () => void;
}

export default function SalesRepCard({
  rep,
  conflictTags,
  onDeleteProduct,
  onProductInputChange,
  onConflictClick,
}: SalesRepCardProps) {
  const [editingProducts, setEditingProducts] = useState<Set<string>>(new Set());

  // Check if any product has conflict OR if this rep has any conflict tags
  const hasAnyConflict =
    rep.products.some((p) => p.hasConflict) ||
    rep.productTags.some((tag) => conflictTags.includes(tag));

  // Toggle edit mode for a product
  const toggleEdit = (productId: string) => {
    setEditingProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // Get percentage color - always same dark color
  const getPercentageColor = (percentage: number) => {
    return "text-(--gray-9)"; // Always dark gray, no color change
  };

  // Get row border style based on conflict
  const getRowBorderStyle = (hasConflict: boolean) => {
    if (hasConflict) {
      return "border-2 border-(--destructive) bg-(--background)"; // Red border, white background
    }
    return "border border-(--gray-2) bg-(--background)"; // Normal gray border, white background
  };

  return (
    <div className="bg-(--background) border border-(--gray-2) rounded-8 overflow-hidden shadow-soft">
      {/* Header Row: Avatar, Name, Role, Search, Menu */}
      <div className="flex items-center justify-between gap-4 p-5 pb-4">
        <div className="flex items-center gap-4">
          {/* Avatar - Shows initials with gradient bg if no image */}
          <div className="w-12 h-12 rounded-8 bg-linear-to-br from-[#0f72f4] to-[#7076f6] overflow-hidden flex-shrink-0 flex items-center justify-center">
            {rep.avatar && rep.avatar !== "/placeholder-avatar.jpg" ? (
              <Image
                src={rep.avatar}
                alt={rep.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-white font-semibold text-sm uppercase">
                {rep.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            )}
          </div>

          {/* Name and Role */}
          <div>
            <p className="t-label-b text-(--gray-9)">{rep.name}</p>
            <p className="t-sm text-(--gray-5)">{rep.role}</p>
          </div>
        </div>

        {/* Search and Menu */}
        <div className="flex items-center gap-3">
          {/* Search SKU Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Select SKU's"
              className="w-52 px-4 py-2.5 pl-10 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none t-md text-(--gray-7) bg-(--background)"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--gray-4)" />
          </div>

          {/* Three Dots Menu */}
          <button className="text-(--gray-4) hover:text-(--gray-6) p-2 hover:bg-(--gray-1) rounded-8 transition cursor-pointer">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Tags Row - Blue and Light Red pattern */}
      <div className="flex flex-wrap gap-2 px-5 pb-4">
        {rep.productTags.map((tag, index) => {
          // Check if this tag is in conflict (appears in multiple sales reps)
          const isConflictTag = conflictTags.includes(tag);
          console.log(`🏷️ Tag: ${tag} | isConflict: ${isConflictTag}`);
          return (
            <span
              key={index}
              className={`px-3 py-1.5 t-sm font-medium rounded-8 ${
                isConflictTag ? "bg-red-50 text-red-600" : "bg-blue-600 text-white"
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
                  className={`rounded-8 p-4 ${
                    editingProducts.has(leftProduct.id)
                      ? "bg-(--background) border border-(--primary-1)"
                      : getRowBorderStyle(leftProduct.hasConflict || false)
                  }`}
                >
                  {editingProducts.has(leftProduct.id) ? (
                    // Edit Mode
                    <div className="flex items-center gap-4">
                      {/* Product Name - Read Only Text - Same as View Mode */}
                      <span className="t-label-b text-(--gray-9) min-w-[120px]">
                        {leftProduct.inputValue || leftProduct.name}
                      </span>
                      {/* Target Input */}
                      <input
                        type="text"
                        placeholder="Set Monthly Target"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            toggleEdit(leftProduct.id);
                          }
                        }}
                        className="px-2 py-1.5 border border-(--gray-2) rounded-8 t-sm text-(--gray-5) w-32 bg-(--background)"
                      />
                      {/* Share % Input */}
                      <input
                        type="text"
                        placeholder="Share (%)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            toggleEdit(leftProduct.id);
                          }
                        }}
                        className="px-2 py-1.5 border border-(--gray-2) rounded-8 t-sm text-(--gray-5) w-24 bg-(--background)"
                      />
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Product Name */}
                        <span className="t-label-b text-(--gray-9) min-w-[120px]">
                          {leftProduct.inputValue || leftProduct.name}
                        </span>
                        {/* Target Quantity */}
                        <span className="t-sm text-(--gray-5)">{leftProduct.targetQuantity}</span>
                        {/* Percentage */}
                        <span
                          className={`t-label-b ${getPercentageColor(leftProduct.completionPercentage)}`}
                        >
                          {leftProduct.completionPercentage}%
                        </span>
                      </div>
                      {/* Edit and Delete Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEdit(leftProduct.id)}
                          className="group hover:opacity-80 transition cursor-pointer"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(rep.id, leftProduct.id)}
                          className="group hover:opacity-80 transition cursor-pointer"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Right Product Card - Input Style by default or edit mode */}
              {rightProduct && (
                <div
                  className={`rounded-8 p-4 ${
                    editingProducts.has(rightProduct.id)
                      ? "bg-(--background) border border-(--primary-1)"
                      : getRowBorderStyle(rightProduct.hasConflict || false)
                  }`}
                >
                  {editingProducts.has(rightProduct.id) ? (
                    // Edit Mode
                    <div className="flex items-center gap-4">
                      {/* Product Name - Read Only Text - Same as View Mode */}
                      <span className="t-label-b text-(--gray-9) min-w-[120px]">
                        {rightProduct.inputValue || rightProduct.name}
                      </span>
                      {/* Target Input */}
                      <input
                        type="text"
                        placeholder="Set Monthly Target"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            toggleEdit(rightProduct.id);
                          }
                        }}
                        className="px-2 py-1.5 border border-(--gray-2) rounded-8 t-sm text-(--gray-5) w-32 bg-(--background)"
                      />
                      {/* Share % Input */}
                      <input
                        type="text"
                        placeholder="Share (%)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            toggleEdit(rightProduct.id);
                          }
                        }}
                        className="px-2 py-1.5 border border-(--gray-2) rounded-8 t-sm text-(--gray-5) w-24 bg-(--background)"
                      />
                    </div>
                  ) : (
                    // View Mode (Default)
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="t-label-b text-(--gray-9) min-w-[120px]">
                          {rightProduct.inputValue || rightProduct.name}
                        </span>
                        <span className="t-sm text-(--gray-5)">{rightProduct.targetQuantity}</span>
                        <span
                          className={`t-label-b ${getPercentageColor(rightProduct.completionPercentage)}`}
                        >
                          {rightProduct.completionPercentage}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleEdit(rightProduct.id)}
                          className="group hover:opacity-80 transition cursor-pointer"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(rep.id, rightProduct.id)}
                          className="group hover:opacity-80 transition cursor-pointer"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  )}
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
          className="flex items-center gap-2 px-5 py-3 bg-(--destructive-light) cursor-pointer hover:opacity-90 transition-opacity"
        >
          <AlertTriangle className="w-4 h-4 text-(--destructive) flex-shrink-0" />
          <p className="t-md text-(--destructive) font-medium">Conflicts In Sales Allocation</p>
        </div>
      )}
    </div>
  );
}
