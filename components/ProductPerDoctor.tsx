"use client";

import React from "react";

interface ProductStat {
  name: string;
  value: string;
  percentage: number; // For the progress bar width
  color: string;
}

export default function ProductPerformance() {
  const products: ProductStat[] = [
    { name: "Product Name1", value: "445.2K", percentage: 80, color: "bg-[#FF7051]" },
    { name: "Product Name2", value: "65.2K", percentage: 35, color: "bg-[#34D399]" },
    { name: "Product Name3", value: "5.2K", percentage: 5, color: "bg-[#1E75FF]" },
    { name: "Product Name4", value: "44K", percentage: 25, color: "bg-[#7C3AED]" },
    { name: "Product Name5", value: "25.9K", percentage: 18, color: "bg-[#EC4899]" },
    { name: "Product Name6", value: "65.11K", percentage: 40, color: "bg-[#10B981]" },
  ];

  return (
    <div className="w-full h-full bg-white rounded-8 shadow-soft border border-gray-1 p-6 flex flex-col">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-9 mb-6">Product Performance</h2>

      {/* Product List */}
      <div className="space-y-8">
        {products.map((product, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#1E75FF] font-semibold text-sm">{product.name}</span>
              <span className="text-[#334155] font-bold text-sm">{product.value}</span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${product.color} transition-all duration-500`}
                style={{ width: `${product.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
