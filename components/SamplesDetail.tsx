"use client";

import React from "react";
import Image from "next/image";

interface SampleItem {
  id: string;
  name: string;
  dosage: string;
  totalQty: number;
  qtyLeft: number;
}

const samplesData: SampleItem[] = [
  { id: "1", name: "Gluecerna", dosage: "400mg", totalQty: 150, qtyLeft: 10 },
  { id: "2", name: "Lisinopril", dosage: "Syrup 200Mg/5MI", totalQty: 150, qtyLeft: 10 },
  { id: "3", name: "Lisinopril", dosage: "Syrup 200Mg/5MI", totalQty: 150, qtyLeft: 10 },
  { id: "4", name: "Gluecerna", dosage: "400mg", totalQty: 150, qtyLeft: 10 },
  { id: "5", name: "Lisinopril", dosage: "Syrup 200Mg/5MI", totalQty: 150, qtyLeft: 10 },
  { id: "6", name: "Lisinopril", dosage: "Syrup 200Mg/5MI", totalQty: 150, qtyLeft: 10 },
  { id: "7", name: "Gluecerna", dosage: "400mg", totalQty: 150, qtyLeft: 10 },
  { id: "8", name: "Lisinopril", dosage: "Syrup 200Mg/5MI", totalQty: 150, qtyLeft: 10 },
  { id: "9", name: "Lisinopril", dosage: "Syrup 200Mg/5MI", totalQty: 150, qtyLeft: 10 },
];

export default function SamplesDetail() {
  return (
    <div className="w-full p-4">
      <div className="mt-3">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Samples</h2>

        {/* Responsive Grid: Desktop par 3, Tablet par 2, Mobile par 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {samplesData.map((sample) => (
            <div
              key={sample.id}
              className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              {/* Left: Product Info */}
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/capMan.svg" // Replace with your actual medicine image path
                    alt={sample.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-gray-900 text-sm truncate">{sample.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{sample.dosage}</p>
                </div>
              </div>

              {/* Center: Total QTY */}
              <div className="text-center px-2">
                <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-tight">
                  Total QTY
                </p>
                <p className="text-lg font-bold text-emerald-500 leading-none mt-1">
                  {sample.totalQty}
                </p>
              </div>

              {/* Right: QTY Left */}
              <div className="text-right pl-2">
                <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-tight">
                  QTY Left
                </p>
                <p className="text-lg font-bold text-red-500 leading-none mt-1">{sample.qtyLeft}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
