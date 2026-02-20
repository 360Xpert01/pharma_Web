"use client";

import React, { useState } from "react";
import { X, ChevronDown, ChevronUp, Plus } from "lucide-react";
import Image from "next/image";

interface ConflictRep {
  id: string;
  name: string;
  avatar: string;
  share: number;
}

interface ConflictProduct {
  id: string;
  medicineName: string; // e.g., "Amoxicillin"
  productName: string; // e.g., "Capsule 500Mg"
  reps: ConflictRep[];
  isExpanded: boolean;
}

interface ConflictModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConflictModal({ isOpen, onClose }: ConflictModalProps) {
  const [products, setProducts] = useState<ConflictProduct[]>([
    {
      id: "1",
      medicineName: "Amoxicillin",
      productName: "Capsule 500Mg",
      reps: [
        { id: "r1", name: "Rep 1", avatar: "/girlPic.png", share: 33 },
        { id: "r2", name: "Rep 2", avatar: "/girlPic.png", share: 33 },
        { id: "r3", name: "Rep 3", avatar: "/girlPic.png", share: 34 },
      ],
      isExpanded: true,
    },
    {
      id: "2",
      medicineName: "Amoxicillin",
      productName: "Capsule 500Mg",
      reps: [
        { id: "r4", name: "Rep 4", avatar: "/girlPic.png", share: 50 },
        { id: "r5", name: "Rep 5", avatar: "/girlPic.png", share: 50 },
      ],
      isExpanded: true,
    },
    {
      id: "3",
      medicineName: "Amoxicillin",
      productName: "Capsule 250Mg",
      reps: [
        { id: "r6", name: "Rep 6", avatar: "/girlPic.png", share: 33 },
        { id: "r7", name: "Rep 7", avatar: "/girlPic.png", share: 33 },
        { id: "r8", name: "Rep 8", avatar: "/girlPic.png", share: 34 },
      ],
      isExpanded: false,
    },
    {
      id: "4",
      medicineName: "Ibuprofen",
      productName: "Tablet 200Mg",
      reps: [
        { id: "r9", name: "Rep 9", avatar: "/girlPic.png", share: 20 },
        { id: "r10", name: "Rep 10", avatar: "/girlPic.png", share: 20 },
        { id: "r11", name: "Rep 11", avatar: "/girlPic.png", share: 20 },
        { id: "r12", name: "Rep 12", avatar: "/girlPic.png", share: 20 },
        { id: "r13", name: "Rep 13", avatar: "/girlPic.png", share: 20 },
      ],
      isExpanded: false,
    },
    {
      id: "5",
      medicineName: "Aspirin",
      productName: "Tablet 100Mg",
      reps: [
        { id: "r14", name: "Rep 14", avatar: "/girlPic.png", share: 50 },
        { id: "r15", name: "Rep 15", avatar: "/girlPic.png", share: 50 },
      ],
      isExpanded: false,
    },
  ]);

  if (!isOpen) return null;

  const toggleExpand = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isExpanded: !p.isExpanded } : p)));
  };

  // Group products by medicine name
  const groupedProducts = products.reduce(
    (acc, product) => {
      if (!acc[product.medicineName]) {
        acc[product.medicineName] = [];
      }
      acc[product.medicineName].push(product);
      return acc;
    },
    {} as Record<string, ConflictProduct[]>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-(--background) rounded-8 w-full max-w-4xl overflow-hidden shadow-soft animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="t-h2 text-(--gray-9)">Conflicts in sales</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-(--gray-1) rounded-8 transition cursor-pointer"
            >
              <X className="w-6 h-6 text-(--gray-6)" />
            </button>
          </div>
          <p className="t-md text-(--gray-5)">
            Please review and confirm this expense before approval or rejection
          </p>
        </div>

        {/* Content */}
        <div className="px-8 pb-4 max-h-[60vh] overflow-y-auto space-y-6 hide-scrollbar">
          {Object.entries(groupedProducts).map(([medicineName, medicineProducts]) => {
            const totalReps = medicineProducts.reduce((sum, p) => sum + p.reps.length, 0);
            const anyExpanded = medicineProducts.some((p) => p.isExpanded);

            return (
              <div key={medicineName} className="space-y-3">
                {/* Medicine Name Header */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="t-h4 text-(--gray-9)">{medicineName}</span>
                    <span className="t-sm text-(--gray-5)">
                      Conflicts with{" "}
                      <span className="text-(--destructive) font-semibold">{totalReps} Reps</span>
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setProducts((prev) =>
                        prev.map((p) =>
                          p.medicineName === medicineName ? { ...p, isExpanded: !anyExpanded } : p
                        )
                      );
                    }}
                    className="p-1 cursor-pointer"
                  >
                    {anyExpanded ? (
                      <ChevronUp className="w-5 h-5 text-(--gray-9)" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-(--gray-9)" />
                    )}
                  </button>
                </div>

                {/* Product Cards */}
                {anyExpanded && (
                  <div className="space-y-3 pl-4">
                    {medicineProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-(--gray-0) border border-(--gray-2) rounded-8 p-4"
                      >
                        {/* Product Name & Avatars */}
                        <div className="flex items-center gap-4 mb-4">
                          <span className="t-label-b text-(--gray-9)">{product.productName}</span>
                          <div className="flex -space-x-2">
                            {product.reps.slice(0, 3).map((rep) => (
                              <div
                                key={rep.id}
                                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-(--gray-2)"
                              >
                                <Image
                                  src={rep.avatar}
                                  alt={rep.name}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              </div>
                            ))}
                            {product.reps.length > 3 && (
                              <div className="w-8 h-8 rounded-full border-2 border-white bg-(--gray-3) flex items-center justify-center">
                                <span className="t-cap text-(--gray-7) font-semibold">
                                  +{product.reps.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="t-sm text-(--gray-5)">
                            Conflicts with{" "}
                            <span className="text-(--destructive) font-semibold">
                              {product.reps.length} Reps
                            </span>
                          </span>
                        </div>

                        {/* Share Inputs */}
                        <div className="grid grid-cols-3 gap-3">
                          {product.reps.map((rep) => (
                            <input
                              key={rep.id}
                              type="text"
                              placeholder="Adjust Share (%)"
                              defaultValue={rep.share}
                              className="px-4 py-2.5 bg-(--background) border border-(--gray-2) rounded-8 t-sm text-(--gray-9) placeholder:text-(--gray-5) focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-8 pt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-8 py-3 border border-(--primary) text-(--primary) rounded-8 t-md font-semibold hover:bg-(--primary-0) transition cursor-pointer"
          >
            Discard
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-(--primary) text-white rounded-8 t-md font-semibold hover:bg-(--primary-2) transition shadow-soft flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Save Conflicts
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
