"use client";

import React from "react";
import SalesRepCard, { SalesRep } from "./SalesRepCard";

export interface Manager {
  id: string;
  name: string;
  salesReps: SalesRep[];
}

interface ManagerSectionProps {
  manager: Manager;
  onDeleteProduct: (repId: string, productId: string) => void;
  onProductInputChange: (repId: string, productId: string, value: string) => void;
  onConflictClick?: () => void;
}

export default function ManagerSection({
  manager,
  onDeleteProduct,
  onProductInputChange,
  onConflictClick,
}: ManagerSectionProps) {
  // Detect duplicate tags across all sales reps
  const getConflictTags = () => {
    const tagCounts: Record<string, number> = {};

    // Count occurrences of each tag
    manager.salesReps.forEach((rep) => {
      rep.productTags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Return tags that appear more than once
    const conflicts = Object.keys(tagCounts).filter((tag) => tagCounts[tag] > 1);
    console.log("🔍 Manager:", manager.name, "| Tag Counts:", tagCounts, "| Conflicts:", conflicts);
    return conflicts;
  };

  const conflictTags = getConflictTags();

  return (
    <div className="flex gap-6">
      {/* Left Side: Manager Name (25%) */}
      <div className="w-1/4">
        <div>
          <p className="t-over text-(--gray-5) mb-1">Area Manager</p>
          <p className="t-h3 text-(--gray-9)">{manager.name}</p>
        </div>
      </div>

      {/* Right Side: Sales Representatives (75%) */}
      <div className="w-3/4 space-y-4">
        {manager.salesReps.map((rep) => (
          <SalesRepCard
            key={rep.id}
            rep={rep}
            conflictTags={conflictTags}
            onDeleteProduct={onDeleteProduct}
            onProductInputChange={onProductInputChange}
            onConflictClick={onConflictClick}
          />
        ))}
      </div>
    </div>
  );
}
