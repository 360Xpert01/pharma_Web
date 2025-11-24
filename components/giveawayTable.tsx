"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

interface GiveawayItem {
  id: string;
  date: string;
  productName: string;
  category: string;
  sold: number;
  remaining: number;
  status: "In Stock" | "Out of Stock" | "Low Stock";
}

const giveawayData: GiveawayItem[] = [
  {
    id: "GWAWYD23456789",
    date: "2025-10-15",
    productName: "Eco-Friendly Tote Bag",
    category: "Sustainable Shopping",
    sold: 120,
    remaining: 30,
    status: "In Stock",
  },
  {
    id: "GWAWYD34567890",
    date: "2025-11-05",
    productName: "Bluetooth Speaker",
    category: "Tech Gadget Gift",
    sold: 0,
    remaining: 15,
    status: "Out of Stock",
  },
  {
    id: "GWAWYD45678901",
    date: "2025-12-01",
    productName: "Custom Water Bottle",
    category: "Health Awareness Gift",
    sold: 12,
    remaining: 20,
    status: "Low Stock",
  },
  {
    id: "GWAWYD56789012",
    date: "2025-12-15",
    productName: "Personalized Mug",
    category: "Corporate Branding",
    sold: 350,
    remaining: 28,
    status: "In Stock",
  },
  {
    id: "GWAWYD67890123",
    date: "2026-01-10",
    productName: "Portable Phone Charger",
    category: "On-the-Go Gadget",
    sold: 20,
    remaining: 18,
    status: "In Stock",
  },
  {
    id: "GWAWYD78901234",
    date: "2026-02-05",
    productName: "Travel Organizer Kit",
    category: "Traveler's Essential",
    sold: 150,
    remaining: 22,
    status: "In Stock",
  },
  {
    id: "GWAWYD89012345",
    date: "2026-03-01",
    productName: "Smartwatch",
    category: "Fitness Tracking",
    sold: 50,
    remaining: 25,
    status: "In Stock",
  },
];

export default function GiveawayTable() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="w-full overflow-hidden">
      {giveawayData.map((item) => (
        <div
          key={item.id}
          className="px-3 py-1 hover:bg-gray-50 transition-colors  flex items-center"
        >
          <div className="w-full bg-white rounded-lg p-4 shadow-sm">
            {/* Perfectly Equal Columns using flex */}
            <div className="flex items-center text-sm font-medium">
              {/* Giveaway ID */}
              <div className="w-48 flex-shrink-0 font-bold text-gray-600 font-mono">{item.id}</div>

              {/* Date */}
              <div className="flex-1 min-w-40 font-medium text-gray-400">{item.date}</div>

              {/* Product Name */}
              <div className="flex-1 min-w-40 font-semibold text-gray-900">{item.productName}</div>

              {/* Category */}
              <div className="flex-1 min-w-20 font-medium  text-gray-400">{item.category}</div>

              {/* Sold */}
              <div className="w-30 text-center font-bold text-gray-900">{item.sold}</div>

              {/* Remaining */}
              <div className="w-40 text-center text-red-500">{item.remaining}</div>

              {/* Status Badge */}
              <div className="w-32 flex justify-center">
                <span
                  className={`px-8 py-1 rounded-full text-xs text-white font-medium whitespace-nowrap shadow-sm ${
                    item.status === "In Stock"
                      ? "bg-emerald-400"
                      : item.status === "Out of Stock"
                        ? "bg-red-400"
                        : "bg-amber-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* More Options */}
              <div className="w-16 flex justify-end">
                <div className="relative">
                  <button
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {openId === item.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                      <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Edit
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Duplicate
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
