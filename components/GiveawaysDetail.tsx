"use client";

import React from "react";
import Image from "next/image";

interface GiveawayItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalQty: number;
  qtyLeft: number;
}

const giveawaysData: GiveawayItem[] = [
  {
    id: "1",
    name: "Branded Pen",
    description: "Blue Ink Pen",
    icon: "🖊️",
    totalQty: 500,
    qtyLeft: 120,
  },
  {
    id: "2",
    name: "Notepad",
    description: "A4 Size Spiral",
    icon: "📓",
    totalQty: 300,
    qtyLeft: 85,
  },
  {
    id: "3",
    name: "Calendar",
    description: "2025 Desk Calendar",
    icon: "📅",
    totalQty: 200,
    qtyLeft: 45,
  },
  {
    id: "4",
    name: "USB Drive",
    description: "8GB Storage",
    icon: "💾",
    totalQty: 150,
    qtyLeft: 30,
  },
  {
    id: "5",
    name: "Keychain",
    description: "Metal Keychain",
    icon: "🔑",
    totalQty: 400,
    qtyLeft: 95,
  },
  { id: "6", name: "Mug", description: "Coffee Mug", icon: "☕", totalQty: 250, qtyLeft: 60 },
  {
    id: "7",
    name: "Tote Bag",
    description: "Eco-Friendly Bag",
    icon: "👜",
    totalQty: 180,
    qtyLeft: 40,
  },
  {
    id: "8",
    name: "Water Bottle",
    description: "500ml Bottle",
    icon: "💧",
    totalQty: 220,
    qtyLeft: 55,
  },
  {
    id: "9",
    name: "Hand Sanitizer",
    description: "50ml Bottle",
    icon: "🧴",
    totalQty: 600,
    qtyLeft: 150,
  },
];

export default function GiveawaysDetail() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Giveaways</h2>

      <div className="space-y-3">
        {giveawaysData.map((giveaway) => (
          <div
            key={giveaway.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
          >
            {/* Left: Giveaway Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
                {giveaway.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{giveaway.name}</h3>
                <p className="text-sm text-gray-600">{giveaway.description}</p>
              </div>
            </div>

            {/* Right: Quantities */}
            <div className="flex items-center gap-12">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Total QTY</p>
                <p className="text-lg font-bold text-green-600">{giveaway.totalQty}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">QTY Left</p>
                <p className="text-lg font-bold text-red-600">{giveaway.qtyLeft}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
