"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { generateProductData, productBadges, type ProductData } from "./productPerformanceData";

interface ProductPerformanceProps {
  products?: ProductData[];
  className?: string;
}

export default function ProductPerformance({ products, className }: ProductPerformanceProps) {
  const productData = products || generateProductData();
  const [hoveredBar, setHoveredBar] = useState<{
    productId: string;
    type: "sample" | "order";
  } | null>(null);

  return (
    <Card className={cn("shadow-soft", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="t-h4 text-(--gray-9)">Product Performance</CardTitle>

          {/* Visual Badges - Not clickable, just indicators */}
          <div className="flex gap-2 flex-wrap">
            {productBadges.map((badge) => (
              <Badge
                key={badge.id}
                className={cn(
                  "text-[10px] font-semibold px-2.5 py-1 border-0 rounded-8",
                  badge.color
                )}
              >
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        {/* Bar Chart Container */}
        <div className="relative">
          {/* Bars Section with left/right borders */}
          <div className="relative h-[200px] flex items-end justify-between gap-4 px-6 border-l border-r border-dashed border-(--gray-3)">
            {productData.map((product) => (
              <div key={product.id} className="flex-1 flex flex-col items-center">
                {/* Bars Container */}
                <div className="relative w-full h-full flex items-end justify-center gap-2">
                  {/* Order Captured Bar - First */}
                  <div
                    className="relative flex-1 bg-(--primary-0) rounded-t-lg transition-all hover:opacity-90 cursor-pointer"
                    style={{
                      height: `${(product.orderCaptured / 100) * 200}px`,
                    }}
                    onMouseEnter={() => setHoveredBar({ productId: product.id, type: "order" })}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip for Order Captured */}
                    {hoveredBar?.productId === product.id && hoveredBar?.type === "order" && (
                      <div className="bg-white shadow-lg rounded-8 px-3 py-2 whitespace-nowrap z-10 border border-(--gray-2) absolute -top-14 left-1/2 transform -translate-x-1/2">
                        <div className="text-(--gray-5) t-cap">
                          {product.name} {product.strength}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-(--primary-0)"></div>
                          <span className="t-label-b text-(--primary)">
                            {product.orderCaptured}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sample Distributed Bar - Second */}
                  <div
                    className="relative flex-1 bg-(--primary) rounded-t-lg transition-all hover:opacity-90 cursor-pointer"
                    style={{
                      height: `${(product.sampleDistributed / 100) * 200}px`,
                    }}
                    onMouseEnter={() => setHoveredBar({ productId: product.id, type: "sample" })}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip for Sample Distributed */}
                    {hoveredBar?.productId === product.id && hoveredBar?.type === "sample" && (
                      <div className="bg-white shadow-lg rounded-8 px-3 py-2 whitespace-nowrap z-10 border border-(--gray-2) absolute -top-14 left-1/2 transform -translate-x-1/2">
                        <div className="text-(--gray-5) t-cap">
                          {product.name} {product.strength}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-(--primary)"></div>
                          <span className="t-label-b text-(--primary)">
                            {product.sampleDistributed}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* X-axis Dashed Line - Visual Separator */}
          <div className="w-full border-t border-dashed border-(--gray-3) my-0"></div>

          {/* Product Names Section */}
          <div className="flex items-start justify-between gap-4 px-6 pb-3">
            {productData.map((product) => (
              <div key={product.id} className="flex-1 flex flex-col items-center">
                <div className="text-(--gray-6) t-sm text-center truncate w-full">
                  {product.name}
                </div>
                <div className="text-(--gray-5) t-cap text-center truncate w-full">
                  {product.strength}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
