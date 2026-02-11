"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import EditIcon from "@/components/svgs/edit-icon";
import DeleteIcon from "@/components/svgs/delete-icon";

interface SampleItem {
  id: string;
  name: string;
  quantity: number;
}

interface SampleAllocationProps {
  allSamples: any[];
  selectedSamples: SampleItem[];
  onAddSample: (sample: any) => void;
  onRemoveSample: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  loading?: boolean;
}

export default function SampleAllocation({
  allSamples,
  selectedSamples,
  onAddSample,
  onRemoveSample,
  onUpdateQuantity,
  loading = false,
}: SampleAllocationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<number>(0);

  // Filter items based on search query
  const availableItems = allSamples.filter((s: any) => {
    if (!searchQuery.trim()) return true;
    const searchLower = searchQuery.toLowerCase();
    const skuStr =
      s.sku && typeof s.sku === "object" ? String(s.sku.sku || "") : String(s.sku || "");
    return (
      String(s.productName || "")
        .toLowerCase()
        .includes(searchLower) || skuStr.toLowerCase().includes(searchLower)
    );
  });

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectFromDropdown = (item: any) => {
    onAddSample(item);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleEdit = (id: string) => {
    const item = selectedSamples.find((s) => s.id === id);
    if (item) {
      setEditingId(id);
      setEditQuantity(item.quantity);
    }
  };

  const handleSaveQuantity = () => {
    if (editingId) {
      onUpdateQuantity(editingId, Math.max(1, editQuantity));
      setEditingId(null);
      setEditQuantity(0);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-(--gray-9)">Select Sample</h2>

      {/* Search & Add Row */}
      <div className="flex gap-3 w-1/3">
        <div className="flex-1 relative" ref={dropdownRef}>
          <label className="block text-xs font-medium text-(--gray-6) mb-2">
            Search Sample Name<span className="text-(--destructive)">*</span>
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--gray-4)" />
            <input
              type="text"
              placeholder="Search Sample Name"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim()) {
                  setShowDropdown(true);
                }
              }}
              onFocus={() => {
                if (searchQuery.trim()) {
                  setShowDropdown(true);
                }
              }}
              className="w-full h-12 pl-10 pr-4 py-2.5 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) outline-none text-sm transition-all"
            />
          </div>

          {/* Sample Dropdown */}
          {showDropdown && (searchQuery.trim() || availableItems.length > 0) && (
            <div className="absolute z-50 w-full mt-2 bg-(--background) border border-(--gray-2) rounded-8 shadow-soft max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                </div>
              ) : availableItems.length === 0 ? (
                <div className="p-4 text-center text-sm text-(--gray-5)">
                  No samples found matching "{searchQuery}"
                </div>
              ) : (
                availableItems.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => handleSelectFromDropdown(sample)}
                    className="px-4 py-3 hover:bg-(--gray-0) cursor-pointer border-b border-(--gray-1) last:border-b-0"
                  >
                    <p className="text-sm font-medium text-(--gray-9)">{sample.productName}</p>
                    <p className="text-xs text-(--gray-6)">
                      SKU: {typeof sample.sku === "object" ? sample.sku?.sku : sample.sku}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <div className="flex items-end">
          <button
            onClick={() => {
              const input = dropdownRef.current?.querySelector("input");
              if (input) input.focus();
            }}
            className="h-12 px-5 bg-(--primary) text-(--light) rounded-8 hover:bg-(--primary-2) transition flex items-center gap-2 text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Sample
          </button>
        </div>
      </div>

      {/* Sample Cards Grid */}
      {selectedSamples.length > 0 && (
        <div className="bg-(--gray-0) rounded-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedSamples.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 px-4 py-4 bg-(--background) border border-(--gray-2) rounded-8 hover:shadow-sm transition-all min-h-[100px]"
              >
                <div className="flex items-start justify-between">
                  <p className="text-base font-bold text-(--gray-9) flex-1 line-clamp-2">
                    {item.name}
                  </p>
                </div>

                {editingId === item.id ? (
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center flex-1">
                      <span className="absolute left-3 text-xs font-bold text-(--gray-4) uppercase">
                        Qty
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(parseInt(e.target.value) || 1)}
                        className="w-full pl-12 pr-3 py-2 bg-(--gray-0) border border-(--gray-2) rounded-6 text-sm font-medium focus:ring-1 focus:ring-(--primary) outline-none"
                        autoFocus
                      />
                    </div>
                    <button
                      onClick={handleSaveQuantity}
                      className="p-2 bg-(--primary) text-(--light) rounded-6 hover:bg-(--primary-2) transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-(--gray-5)">
                      QTY:{" "}
                      <span className="font-bold text-(--gray-9) text-base">{item.quantity}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="group hover:opacity-80 transition cursor-pointer"
                        title="Edit quantity"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => onRemoveSample(item.id)}
                        className="group hover:opacity-80 transition cursor-pointer"
                        title="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
