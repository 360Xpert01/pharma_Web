"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

interface MedicineRow {
  id: string;
  medicineName: string;
  product: {
    name: string;
    quantity: number;
  };
}

const medicineData: MedicineRow[] = [
  {
    id: "SAPLID12345678",
    medicineName: "Amoxicillin",
    product: { name: "Capsule 500Mg", quantity: 1 },
  },
  {
    id: "SAPLID45678901",
    medicineName: "Ibuprofen",
    product: { name: "Capsule 500Mg", quantity: 4 },
  },
  {
    id: "SAPLID12354798",
    medicineName: "Brufen 120Ml",
    product: { name: "Capsule 500Mg", quantity: 3 },
  },
  {
    id: "SAPLID13574246",
    medicineName: "Loratadine",
    product: { name: "Capsule 500Mg", quantity: 5 },
  },
  {
    id: "SAPLID13529246",
    medicineName: "Loratadine",
    product: { name: "Capsule 500Mg", quantity: 5 },
  },
  {
    id: "SAPLID13575246",
    medicineName: "Loratadine",
    product: { name: "Capsule 500Mg", quantity: 5 },
  },
  {
    id: "SAPLID98765432",
    medicineName: "Paracetamol",
    product: { name: "Capsule 500Mg", quantity: 2 },
  },
  {
    id: "SAPLID24681357",
    medicineName: "Metformin",
    product: { name: "Capsule 500Mg", quantity: 1 },
  },
  {
    id: "SAPLID87654321",
    medicineName: "Cetirizine",
    product: { name: "Capsule 500Mg", quantity: 2 },
  },
];

export default function MedicineTable() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="w-full">
      {medicineData.map((item) => (
        <div key={item.id} className=" hover:bg-gray-50 transition-colors duration-200">
          <div className="flex items-center justify-between px-4 py-1">
            {/* Left Content */}
            <div className="flex-1 border border-gray-200 p-2 px-5 rounded-lg flex flex-col sm:flex-row sm:items-center ">
              {/* SAP ID */}
              <div className="w-full sm:w-[15%]">
                <span className="font-mono text-sm font-bold text-gray-900">{item.id}</span>
              </div>

              {/* Medicine Name */}
              <div className="w-full sm:w-[15%]">
                <span className="font-semibold text-gray-900">{item.medicineName}</span>
              </div>

              {/* Products Area - 5 Fixed Columns */}
              <div className="w-full sm:w-[70%]">
                <div className="grid grid-cols-5 gap-4">
                  {Array.from({ length: 5 }, (_, idx) => (
                    <div key={idx} className="flex justify-center">
                      {idx < item.product.quantity && (
                        <span className="px-4 py-1.5  text-gray-400 rounded-full text-sm font-medium whitespace-nowrap">
                          {item.product.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
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

            {/* More Button */}
          </div>
        </div>
      ))}
    </div>
  );
}
