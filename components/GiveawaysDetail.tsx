"use client";

import React from "react";
import Image from "next/image";

interface GiveawayItem {
  id: string;
  name: string;
  description: string;
  totalQty: number;
  qtyLeft: number;
}

const giveawaysData: GiveawayItem[] = [
  { id: "1", name: "Branded Pen", description: "Blue Ink Pen", totalQty: 500, qtyLeft: 120 },
  { id: "2", name: "Notepad", description: "A4 Size Spiral", totalQty: 300, qtyLeft: 85 },
  { id: "3", name: "Calendar", description: "2025 Desk Calendar", totalQty: 200, qtyLeft: 45 },
  { id: "4", name: "USB Drive", description: "8GB Storage", totalQty: 150, qtyLeft: 30 },
  { id: "5", name: "Keychain", description: "Metal Keychain", totalQty: 400, qtyLeft: 95 },
  { id: "6", name: "Mug", description: "Coffee Mug", totalQty: 250, qtyLeft: 60 },
  { id: "7", name: "Branded Pen", description: "Blue Ink Pen", totalQty: 500, qtyLeft: 120 },
  { id: "8", name: "Notepad", description: "A4 Size Spiral", totalQty: 300, qtyLeft: 85 },
  { id: "9", name: "Calendar", description: "2025 Desk Calendar", totalQty: 200, qtyLeft: 45 },
  { id: "10", name: "USB Drive", description: "8GB Storage", totalQty: 150, qtyLeft: 30 },
  { id: "11", name: "Keychain", description: "Metal Keychain", totalQty: 400, qtyLeft: 95 },
  { id: "12", name: "Mug", description: "Coffee Mug", totalQty: 250, qtyLeft: 60 },
];

export default function GiveawaysDetail() {
  return (
    <div className="w-full">
      <div className="mt-3">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Giveaways</h2>

        {/* Grid Layout: Desktop par 3, Tablet par 2, Mobile par 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {giveawaysData.map((giveaway) => (
            <div
              key={giveaway.id}
              className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              {/* Left: Giveaway Info */}
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                  <Image
                    src="/capMan.svg" // Giveaway specific icon ya image yahan lagayein
                    alt={giveaway.name}
                    width={48}
                    height={48}
                    className="object-contain p-1"
                  />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{giveaway.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{giveaway.description}</p>
                </div>
              </div>

              {/* Center: Total QTY */}
              <div className="text-center px-2">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">
                  Total QTY
                </p>
                <p className="text-lg font-bold text-emerald-500 leading-none mt-1">
                  {giveaway.totalQty}
                </p>
              </div>

              {/* Right: QTY Left */}
              <div className="text-right pl-2">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">
                  QTY Left
                </p>
                <p className="text-lg font-bold text-red-500 leading-none mt-1">
                  {giveaway.qtyLeft}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
