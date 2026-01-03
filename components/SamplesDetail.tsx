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
  { id: "1", name: "Glucerna", dosage: "400mg", totalQty: 150, qtyLeft: 10 },
  { id: "2", name: "Lisinopril", dosage: "Syrup 200Mg/5MI", totalQty: 150, qtyLeft: 10 },
  { id: "3", name: "Glucerna", dosage: "250mg", totalQty: 150, qtyLeft: 10 },
  { id: "4", name: "Metformin", dosage: "Tablet 500Mg", totalQty: 200, qtyLeft: 45 },
  { id: "5", name: "Amlodipine", dosage: "Capsule 10Mg", totalQty: 180, qtyLeft: 30 },
  { id: "6", name: "Simvastatin", dosage: "Tablet 20Mg", totalQty: 100, qtyLeft: 25 },
  { id: "7", name: "Levothyroxine", dosage: "Tablet 50Mcg", totalQty: 120, qtyLeft: 15 },
  { id: "8", name: "Omeprazole", dosage: "Capsule 20Mg", totalQty: 200, qtyLeft: 50 },
  { id: "9", name: "Atorvastatin", dosage: "Tablet 10Mg", totalQty: 90, qtyLeft: 12 },
];

export default function SamplesDetail() {
  return (
    <div className="">
      <div className="mt-3">
        <h2 className="t-h3 mb-6">Samples</h2>

        <div className="space-y-3">
          {samplesData.map((sample) => (
            <div
              key={sample.id}
              className="flex items-center rounded-8 shadow-soft border border-(--gray-1) bg-(--background) p-3"
            >
              {/* Left: Medicine Info */}
              <div className="flex items-center gap-4 w-[280px]">
                <div className="relative">
                  <div className="w-14 h-14 rounded-8 overflow-hidden border-2 border-white shadow-soft">
                    <Image
                      src="/capMan.svg"
                      alt={sample.name}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="t-label-b">{sample.name}</h3>
                  <p className="t-sm">{sample.dosage}</p>
                </div>
              </div>

              {/* Center: Total QTY */}
              <div className="flex-1 flex justify-center">
                <div className="text-center">
                  <p className="t-cap">Total QTY</p>
                  <p className="t-val-sm t-ok">{sample.totalQty}</p>
                </div>
              </div>

              {/* Right: QTY Left */}
              <div className="flex-1 flex justify-center">
                <div className="text-center">
                  <p className="t-cap">QTY Left</p>
                  <p className="t-val-sm t-err">{sample.qtyLeft}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
