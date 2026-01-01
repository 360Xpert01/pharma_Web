"use client";

import React, { useState } from "react";
import { X, ChevronDown, ChevronUp, Plus } from "lucide-react";
import Image from "next/image";

interface ConflictRep {
  id: string;
  name: string;
  avatar: string;
}

interface ConflictProduct {
  id: string;
  name: string;
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
      name: "Amoxicillin",
      reps: [
        { id: "r1", name: "Rep 1", avatar: "/placeholder-user.jpg" },
        { id: "r2", name: "Rep 2", avatar: "/placeholder-user.jpg" },
        { id: "r3", name: "Rep 3", avatar: "/placeholder-user.jpg" },
      ],
      isExpanded: false,
    },
    {
      id: "2",
      name: "Capsule 500Mg",
      reps: [
        { id: "r1", name: "Rep 1", avatar: "/placeholder-user.jpg" },
        { id: "r2", name: "Rep 2", avatar: "/placeholder-user.jpg" },
        { id: "r3", name: "Rep 3", avatar: "/placeholder-user.jpg" },
      ],
      isExpanded: true,
    },
    {
      id: "3",
      name: "Capsule 500Mg",
      reps: [
        { id: "r1", name: "Rep 1", avatar: "/placeholder-user.jpg" },
        { id: "r2", name: "Rep 2", avatar: "/placeholder-user.jpg" },
      ],
      isExpanded: true,
    },
    {
      id: "4",
      name: "Amoxicillin",
      reps: [
        { id: "r1", name: "Rep 1", avatar: "/placeholder-user.jpg" },
        { id: "r2", name: "Rep 2", avatar: "/placeholder-user.jpg" },
        { id: "r3", name: "Rep 3", avatar: "/placeholder-user.jpg" },
      ],
      isExpanded: false,
    },
    {
      id: "5",
      name: "Ibuprofen",
      reps: [
        { id: "r1", name: "Rep 1", avatar: "/placeholder-user.jpg" },
        { id: "r2", name: "Rep 2", avatar: "/placeholder-user.jpg" },
        { id: "r3", name: "Rep 3", avatar: "/placeholder-user.jpg" },
        { id: "r4", name: "Rep 4", avatar: "/placeholder-user.jpg" },
        { id: "r5", name: "Rep 5", avatar: "/placeholder-user.jpg" },
      ],
      isExpanded: false,
    },
    {
      id: "6",
      name: "Aspirin",
      reps: [
        { id: "r1", name: "Rep 1", avatar: "/placeholder-user.jpg" },
        { id: "r2", name: "Rep 2", avatar: "/placeholder-user.jpg" },
      ],
      isExpanded: false,
    },
  ]);

  if (!isOpen) return null;

  const toggleExpand = (id: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, isExpanded: !p.isExpanded } : p)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-(--background) rounded-3xl w-full max-w-4xl overflow-hidden shadow-soft animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-3xl font-bold text-(--gray-9)">Conflicts in sales</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-(--gray-1) rounded-full transition cursor-pointer"
            >
              <X className="w-6 h-6 text-(--gray-4)" />
            </button>
          </div>
          <p className="text-(--gray-5) text-lg">
            Please review and confirm this expense before approval or rejection
          </p>
        </div>

        {/* Content */}
        <div className="p-8 pt-0 max-h-[60vh] overflow-y-auto space-y-4 hide-scrollbar">
          {products.map((product) => (
            <div
              key={product.id}
              className={`border border-(--gray-1) rounded-2xl transition-all duration-200 ${
                product.isExpanded ? "bg-(--gray-0)" : "bg-(--light)"
              }`}
            >
              {/* Product Header */}
              <div
                className="flex items-center justify-between p-5 cursor-pointer"
                onClick={() => toggleExpand(product.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-(--gray-9) text-lg">{product.name}</span>
                  <div className="flex items-center gap-2">
                    {product.isExpanded && (
                      <div className="flex -space-x-2">
                        {product.reps.slice(0, 3).map((rep) => (
                          <div
                            key={rep.id}
                            className="w-8 h-8 rounded-full border-2 border-(--light) overflow-hidden bg-(--gray-2)"
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
                      </div>
                    )}
                    <span className="text-(--gray-4) text-sm">
                      Conflicts with{" "}
                      <span className="text-(--destructive) font-medium">
                        {product.reps.length} Reps
                      </span>
                    </span>
                  </div>
                </div>
                {product.isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-(--gray-9)" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-(--gray-9)" />
                )}
              </div>

              {/* Expanded Content */}
              {product.isExpanded && (
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-3 gap-3">
                    {product.reps.map((rep) => (
                      <input
                        key={rep.id}
                        type="text"
                        placeholder="Adjust Share (%)"
                        className="px-4 py-3 bg-(--light) border border-(--gray-2) rounded-xl text-sm focus:ring-2 focus:ring-(--primary) focus:border-(--primary) outline-none transition-all"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-8 pt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-8 py-3.5 border border-(--primary) text-(--primary) rounded-full font-bold hover:bg-(--primary-0) transition cursor-pointer"
          >
            Discard
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3.5 bg-(--primary) text-(--light) rounded-full font-bold hover:bg-(--primary-2) transition shadow-soft shadow-(--primary-1) flex items-center gap-2 cursor-pointer"
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
