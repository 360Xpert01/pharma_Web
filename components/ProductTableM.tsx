"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import Image from "next/image";

interface Medicine {
  id: string;
  code: string; // ← Naya field (e.g. MED-001)
  sapId: string; // ← Pehle wala SAPLID
  name: string;
  category: string;
  skuCount: number;
  image: string;
  formula: string;
}

const medicinesData: Medicine[] = [
  {
    id: "1",
    code: "MED-001",
    sapId: "SAPLID12345678",
    name: "Amoxicillin",
    category: "Antibiotic",
    skuCount: 12,
    image: "/medicine.jpg",
    formula: "C₁₆H₁₉N₃O₅S",
  },
  {
    id: "2",
    code: "MED-002",
    sapId: "SAPLID45678901",
    name: "Ibuprofen",
    category: "Pain Relief",
    skuCount: 8,
    image: "/medicine.jpg",
    formula: "C₁₃H₁₈O₂",
  },
  {
    id: "3",
    code: "MED-003",
    sapId: "SAPLID12354798",
    name: "Brufen 120Ml",
    category: "Syrup",
    skuCount: 15,
    image: "/medicine.jpg",
    formula: "C₁₃H₁₈O₂",
  },
  {
    id: "4",
    code: "MED-004",
    sapId: "SAPLID13574246",
    name: "Loratadine",
    category: "Antihistamine",
    skuCount: 20,
    image: "/medicine.jpg",
    formula: "C₂₂H₂₃ClN₂O₂",
  },
  {
    id: "5",
    code: "MED-005",
    sapId: "SAPLID98765432",
    name: "Paracetamol",
    category: "Analgesic",
    skuCount: 35,
    image: "/medicine.jpg",
    formula: "C₈H₉NO₂",
  },
  {
    id: "6",
    code: "MED-006",
    sapId: "SAPLID24681357",
    name: "Metformin",
    category: "Diabetes",
    skuCount: 18,
    image: "/medicine.jpg",
    formula: "C₄H₁₁N₅",
  },
];

export default function MedicineTable() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="">
      <div className="">
        <div className="space-y-3">
          {medicinesData.map((med) => (
            <div key={med.id} className="rounded-2xl shadow-sm border border-gray-200">
              <div className="grid grid-cols-12 gap-4 px-8 py-3 items-center">
                {/* New Code Field */}

                <div className="col-span-1">
                  <span className="font-mono text-sm text-gray-600">{med.code}</span>
                </div>

                {/* SAP ID */}
                <div className="col-span-2">
                  <span className="font-mono text-sm text-gray-600">{med.sapId}</span>
                </div>

                {/* Name */}
                <div className="col-span-2">
                  <span className="font-semibold text-gray-900">{med.name}</span>
                </div>

                {/* Category */}
                <div className="col-span-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {med.category}
                  </span>
                </div>

                {/* SKU Count */}
                <div className="col-span-1 text-center">
                  <span className="text-lg font-bold text-gray-900">{med.skuCount}</span>
                </div>

                {/* Image */}
                <div className="col-span-1 flex justify-center">
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-gray-200">
                    <Image
                      src={med.image}
                      alt={med.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Formula */}
                <div className="col-span-2">
                  <span className="font-mono text-sm text-gray-700">{med.formula}</span>
                </div>

                {/* Actions */}
                <div className="col-span-1 relative text-right">
                  <button
                    onClick={() => setOpenId(openId === med.id ? null : med.id)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {openId === med.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                      <div className="absolute right-0 top-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Edit Medicine
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            View Details
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
