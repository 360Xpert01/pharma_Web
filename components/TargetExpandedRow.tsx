import React from "react";

interface Product {
  id: string;
  productName: string;
  targetPackets: number;
  achievementPercentage: number;
}

interface EmployeeTarget {
  userId: string;
  username: string;
  tags?: string[];
  products?: Product[];
}

interface TargetExpandedRowProps {
  target: EmployeeTarget;
}

// Helper function to get status badge color
const getStatusBadgeColor = (status: string) => {
  const statusColors: Record<string, string> = {
    completed: "bg-[var(--success)] text-white",
    pending: "bg-[var(--warning)] text-white",
    overdue: "bg-[var(--error)] text-white",
    "in-progress": "bg-[var(--info)] text-white",
  };
  return statusColors[status.toLowerCase()] || "bg-[var(--gray-3)] text-[var(--gray-9)]";
};

export default function TargetExpandedRow({ target }: TargetExpandedRowProps) {
  const products = target.products || [];
  const tags = target.tags || [];

  return (
    <div className="px-6 py-5 bg-[var(--gray-0)]">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="mb-5 flex items-center justify-end border-b border-[var(--gray-2)] pb-4">
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-8 text-xs font-semibold ${getStatusBadgeColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Product Cards Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-8 px-4 py-3 border-2 bg-[var(--background)] border-[var(--gray-2)]"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex-1">
                  <p className="t-label-b text-[var(--gray-9)]">{product.productName}</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="t-label-b text-[var(--gray-9)]">{product.targetPackets} Packets</p>
                </div>
                <div className="flex-1 text-right">
                  <p className="t-label-b text-[var(--gray-9)]">{product.achievementPercentage}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="t-md text-[var(--gray-6)]">No products available</p>
        </div>
      )}
    </div>
  );
}
