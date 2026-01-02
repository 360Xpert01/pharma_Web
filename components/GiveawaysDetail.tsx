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
  { id: "7", name: "Tote Bag", description: "Eco-Friendly Bag", totalQty: 180, qtyLeft: 40 },
  { id: "8", name: "Water Bottle", description: "500ml Bottle", totalQty: 220, qtyLeft: 55 },
  { id: "9", name: "Hand Sanitizer", description: "50ml Bottle", totalQty: 600, qtyLeft: 150 },
];

export default function GiveawaysDetail() {
  return (
    <div className="">
      <div className="mt-3">
        <h2 className="text-xl font-bold text-(--employee-detail-tab-heading) mb-6">Giveaways</h2>

        <div className="space-y-3">
          {giveawaysData.map((giveaway) => (
            <div
              key={giveaway.id}
              className="flex items-center rounded-8 shadow-soft border border-(--gray-1) bg-(--background) p-3"
            >
              {/* Left: Giveaway Info */}
              <div className="flex items-center gap-4 w-[280px]">
                <div className="relative">
                  <div className="w-14 h-14 rounded-8 overflow-hidden border-2 border-white shadow-soft">
                    <Image
                      src="/capMan.svg"
                      alt={giveaway.name}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-(--gray-9)">{giveaway.name}</h3>
                  <p className="text-sm text-(--gray-5)">{giveaway.description}</p>
                </div>
              </div>

              {/* Center: Total QTY */}
              <div className="flex-1 flex justify-center">
                <div className="text-center">
                  <p className="text-xs text-(--gray-4)">Total QTY</p>
                  <p className="text-lg font-bold text-(--success)">{giveaway.totalQty}</p>
                </div>
              </div>

              {/* Right: QTY Left */}
              <div className="flex-1 flex justify-center">
                <div className="text-center">
                  <p className="text-xs text-(--gray-4)">QTY Left</p>
                  <p className="text-lg font-bold text-(--destructive)">{giveaway.qtyLeft}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
