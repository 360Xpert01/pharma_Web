"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import EditIcon from "@/components/svgs/edit-icon";
import DeleteIcon from "@/components/svgs/delete-icon";

interface GiveawayItem {
  id: string;
  name: string;
  quantity: number;
}

interface GiveawayAllocationProps {
  allGiveaways: any[];
  selectedGiveaways: GiveawayItem[];
  onAddGiveaway: (giveaway: any) => void;
  onRemoveGiveaway: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  loading?: boolean;
}

export default function GiveawayAllocation({
  allGiveaways,
  selectedGiveaways,
  onAddGiveaway,
  onRemoveGiveaway,
  onUpdateQuantity,
  loading = false,
}: GiveawayAllocationProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter items based on search query
  const availableItems = allGiveaways.filter((g) => {
    if (!searchQuery.trim()) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      String(g.name || "")
        .toLowerCase()
        .includes(searchLower) ||
      String(g.category || "")
        .toLowerCase()
        .includes(searchLower) ||
      String(g.description || "")
        .toLowerCase()
        .includes(searchLower)
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
    onAddGiveaway(item);
    setSearchQuery("");
    setShowDropdown(false);
    setEditingId(String(item.id));
  };

  // Auto-focus the quantity input when editingId changes
  useEffect(() => {
    if (editingId) {
      setTimeout(() => {
        const input = document.getElementById(`qty-input-${editingId}`);
        if (input) {
          (input as HTMLInputElement).focus();
          (input as HTMLInputElement).select();
        }
      }, 50);
    }
  }, [editingId]);

  const handleKeyDown = (e: React.KeyboardEvent, currentId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentIndex = selectedGiveaways.findIndex((g) => g.id === currentId);
      if (currentIndex < selectedGiveaways.length - 1) {
        // Switch next item to edit mode
        setEditingId(selectedGiveaways[currentIndex + 1].id);
      } else {
        // Exit edit mode if it's the last item
        setEditingId(null);
        // Optionally focus the search input
        const searchInput = dropdownRef.current?.querySelector("input");
        if (searchInput) (searchInput as HTMLInputElement).focus();
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-(--gray-9)">Select Giveaway</h2>

      {/* Search & Add Row */}
      <div className="flex gap-3 w-1/3">
        <div className="flex-1 relative" ref={dropdownRef}>
          <label className="block text-xs font-medium text-(--gray-6) mb-2">
            Search Giveaway Name<span className="text-(--destructive)">*</span>
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--gray-4)" />
            <input
              type="text"
              placeholder="Search Product Name"
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

          {/* Giveaway Dropdown */}
          {showDropdown && (searchQuery.trim() || availableItems.length > 0) && (
            <div className="absolute z-50 w-full mt-2 bg-(--background) border border-(--gray-2) rounded-8 shadow-soft max-h-48 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                </div>
              ) : availableItems.length === 0 ? (
                <div className="p-4 text-center text-sm text-(--gray-5)">
                  No giveaways found matching "{searchQuery}"
                </div>
              ) : (
                availableItems.map((giveaway) => (
                  <div
                    key={giveaway.id}
                    onClick={() => handleSelectFromDropdown(giveaway)}
                    className="px-4 py-3 hover:bg-(--gray-0) cursor-pointer border-b border-(--gray-1) last:border-b-0"
                  >
                    <p className="text-sm font-medium text-(--gray-9)">{giveaway.name}</p>
                    <p className="text-xs text-(--gray-6)">{giveaway.description}</p>
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
            Add Giveaway
          </button>
        </div>
      </div>

      {/* Giveaway Cards Grid */}
      {selectedGiveaways.length > 0 && (
        <div className="bg-(--gray-0) rounded-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedGiveaways.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 px-4 py-3 bg-(--background) border border-(--gray-2) rounded-8 hover:shadow-sm transition-all"
              >
                <p
                  className="text-base font-semibold text-(--gray-9) flex-1 truncate"
                  title={item.name}
                >
                  {item.name}
                </p>

                <div className="flex items-center gap-2">
                  {editingId === item.id ? (
                    <div className="relative flex items-center w-28 h-9 border border-(--gray-2) rounded-8 bg-(--background) overflow-hidden focus-within:ring-2 focus-within:ring-(--primary)">
                      <span className="pl-3 text-[10px] font-bold text-(--gray-4) uppercase pointer-events-none whitespace-nowrap">
                        Qty
                      </span>
                      <input
                        id={`qty-input-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                        onKeyDown={(e) => handleKeyDown(e, item.id)}
                        className="w-full h-full pl-1.5 pr-2 bg-transparent outline-none text-sm font-semibold text-(--gray-9)"
                        onFocus={(e) => e.target.select()}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-6">
                        <span className="text-xs font-medium text-(--gray-5)">QTY:</span>
                        <span className="text-sm font-bold text-(--gray-9)">{item.quantity}</span>
                      </div>
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="p-1 px-2 text-(--primary) rounded-4 transition cursor-pointer"
                        title="Edit quantity"
                      >
                        <EditIcon />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => onRemoveGiveaway(item.id)}
                    className="flex items-center justify-center w-9 h-9 text-(--destructive) rounded-8 transition cursor-pointer shrink-0"
                    title="Delete"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
