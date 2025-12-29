"use client";

import React from "react";
import { Search, MoreVertical } from "lucide-react";
import Image from "next/image";
import ProductTargetRow, { ProductTarget } from "./ProductTargetRow";

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
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
      {/* Header Row: Avatar, Name, Role, Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
            <Image
              src={rep.avatar}
              alt={rep.name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>

          {/* Name and Role */}
          <div>
            <p className="font-bold text-gray-900">{rep.name}</p>
            <p className="text-sm text-gray-600">{rep.role}</p>
          </div>
        </div>

        {/* Search and Menu */}
        <div className="flex items-center gap-3">
          {/* Search SKU Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search SKU"
              className="w-48 px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Three Dots Menu */}
          <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Tags (Blue Chips) */}
      <div className="flex flex-wrap gap-2">
        {rep.productTags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Product Target Rows */}
      <div className="space-y-3 pt-2">
        {rep.products.map((product) => (
          <ProductTargetRow
            key={product.id}
            product={product}
            onDelete={(productId) => onDeleteProduct(rep.id, productId)}
            onInputChange={(productId, value) => onProductInputChange(rep.id, productId, value)}
            onConflictClick={onConflictClick}
          />
        ))}
      </div>
    </div>
  );
}
