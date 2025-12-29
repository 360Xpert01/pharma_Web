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
}

export default function ManagerSection({
  manager,
  onDeleteProduct,
  onProductInputChange,
}: ManagerSectionProps) {
  return (
    <div className="flex gap-6">
      {/* Left Side: Manager Name (25%) */}
      <div className="w-1/4">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Sales Manager
          </p>
          <p className="text-lg font-bold text-gray-900">{manager.name}</p>
        </div>
      </div>

      {/* Right Side: Sales Representatives (75%) */}
      <div className="w-3/4 space-y-4">
        {manager.salesReps.map((rep) => (
          <SalesRepCard
            key={rep.id}
            rep={rep}
            onDeleteProduct={onDeleteProduct}
            onProductInputChange={onProductInputChange}
          />
        ))}
      </div>
    </div>
  );
}
