"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";

interface GiveawayItem {
  id: string;
  date: string;
  productName: string;
  category: string;
}

const giveawayData: GiveawayItem[] = [
  {
    id: "GWAWYD23456789",
    date: "2025-10-15",
    productName: "Eco-Friendly Tote Bag",
    category: "Sustainable Shopping",
  },
  {
    id: "GWAWYD34567890",
    date: "2025-11-05",
    productName: "Bluetooth Speaker",
    category: "Tech Gadget Gift",
  },
  {
    id: "GWAWYD45678901",
    date: "2025-12-01",
    productName: "Custom Water Bottle",
    category: "Health Awareness Gift",
  },
  {
    id: "GWAWYD56789012",
    date: "2025-12-15",
    productName: "Personalized Mug",
    category: "Corporate Branding",
  },
  {
    id: "GWAWYD67890123",
    date: "2026-01-10",
    productName: "Portable Phone Charger",
    category: "On-the-Go Gadget",
  },
  {
    id: "GWAWYD78901234",
    date: "2026-02-05",
    productName: "Travel Organizer Kit",
    category: "Traveler's Essential",
  },
  {
    id: "GWAWYD89012345",
    date: "2026-03-01",
    productName: "Smartwatch",
    category: "Fitness Tracking",
  },
];

export default function GiveawayTable() {
  const [openId, setOpenId] = useState<string | null>(null);

  // Define columns for the table header
  const giveawayColumns = [
    { label: "Pulse Code", className: "flex-1" },
    { label: "Date", className: "flex-1" },
    { label: "Product Name", className: "flex-1" },
    { label: "Category", className: "flex-1" },
    { label: "", className: "w-12" }, // Actions
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="px-3">
        <TableColumnHeader
          columns={giveawayColumns}
          containerClassName="flex text-sm font-medium gap-4"
        />
      </div>
      {giveawayData.map((item) => (
        <div
          key={item.id}
          className="px-3 py-1 hover:bg-gray-50 transition-colors  flex items-center"
        >
          <div className="w-full bg-white rounded-lg p-4 shadow-sm">
            {/* Perfectly Equal Columns using flex */}
            <div className="flex items-center text-sm font-medium gap-4">
              {/* Giveaway ID */}
              <div className="flex-1 font-bold text-gray-600 font-mono">{item.id}</div>

              {/* Date */}
              <div className="flex-1 font-medium text-gray-400">{item.date}</div>

              {/* Product Name */}
              <div className="flex-1 font-semibold text-gray-900">{item.productName}</div>

              {/* Category */}
              <div className="flex-1 font-medium text-gray-400">{item.category}</div>

              {/* More Options */}
              <div className="w-12 flex justify-end flex-shrink-0">
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
