"use client";

import React from "react";
import Image from "next/image";

interface SampleItem {
  id: string;
  name: string;
  dosage: string;
  icon: string;
  totalQty: number;
  qtyLeft: number;
}

const samplesData: SampleItem[] = [
  { id: "1", name: "Glucerna", dosage: "400mg", icon: "💊", totalQty: 150, qtyLeft: 10 },
  { id: "2", name: "Lisinopril", dosage: "5mg-200/gm-PM", icon: "💊", totalQty: 150, qtyLeft: 10 },
  { id: "3", name: "Glucerna", dosage: "250mg", icon: "💊", totalQty: 150, qtyLeft: 10 },
  { id: "4", name: "Metformin", dosage: "Tablet 500Mg", icon: "💊", totalQty: 200, qtyLeft: 45 },
  { id: "5", name: "Amlodipine", dosage: "Capsul 10Mg", icon: "💊", totalQty: 180, qtyLeft: 30 },
  { id: "6", name: "Simvastatin", dosage: "Tablet 20Mg", icon: "💊", totalQty: 100, qtyLeft: 25 },
  {
    id: "7",
    name: "Levothyroxine",
    dosage: "Tablet 50Mcg",
    icon: "💊",
    totalQty: 120,
    qtyLeft: 15,
  },
  { id: "8", name: "Omeprazole", dosage: "Capsule 20Mg", icon: "💊", totalQty: 200, qtyLeft: 50 },
  { id: "9", name: "Atorvastatin", dosage: "Tablet 10Mg", icon: "💊", totalQty: 90, qtyLeft: 12 },
];

export default function SamplesDetail() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Samples</h2>

      <div className="space-y-3">
        {samplesData.map((sample) => (
          <div
            key={sample.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
          >
            {/* Left: Medicine Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-2xl">
                {sample.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{sample.name}</h3>
                <p className="text-sm text-gray-600">{sample.dosage}</p>
              </div>
            </div>

            {/* Right: Quantities */}
            <div className="flex items-center gap-12">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Total QTY</p>
                <p className="text-lg font-bold text-green-600">{sample.totalQty}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">QTY Left</p>
                <p className="text-lg font-bold text-red-600">{sample.qtyLeft}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
