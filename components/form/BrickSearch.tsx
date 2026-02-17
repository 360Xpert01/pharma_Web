"use client";

import React, { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button/button";

interface Brick {
  id: string;
  name: string;
  brickCode?: string;
}

interface BrickSearchProps {
  allBricks: any[]; // From Redux
  selectedBricks: Brick[];
  onBricksChange: (bricks: Brick[]) => void;
  loading?: boolean;
  className?: string;
  error?: string;
  onSearchChange?: (query: string) => void;
}

export default function BrickSearch({
  allBricks,
  selectedBricks,
  onBricksChange,
  loading = false,
  className = "",
  error = "",
  onSearchChange,
}: BrickSearchProps) {
  const hasError = !!error;
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Filter bricks by search query (exclude already selected)
  const filteredBricks = allBricks.filter(
    (b) =>
      !selectedBricks.find((sb) => sb.id === b.id) &&
      ((b.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.brickCode || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddBrick = (brick: any) => {
    const newBrick: Brick = {
      id: brick.id,
      name: brick.name,
      brickCode: brick.brickCode,
    };

    if (!selectedBricks.find((b) => b.id === newBrick.id)) {
      onBricksChange([...selectedBricks, newBrick]);
    }
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleRemoveBrick = (brickId: string) => {
    onBricksChange(selectedBricks.filter((b) => b.id !== brickId));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="t-label block">Assign Bricks</label>

      <div className="relative max-w-sm ml-0">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
                onSearchChange?.(e.target.value);
              }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => {
                // Delay to allow click on dropdown items
                setTimeout(() => setShowSearchResults(false), 200);
              }}
              placeholder={loading ? "Loading bricks..." : "Search Brick Code/Name"}
              disabled={loading}
              aria-invalid={hasError}
              className={`w-full h-12 px-4 py-3 pl-12 text-sm border rounded-8 outline-none transition-all disabled:bg-(--gray-1) disabled:cursor-not-allowed ${
                hasError
                  ? "border-(--destructive) focus:ring-2 focus:ring-(--destructive) focus:border-(--destructive)"
                  : "border-(--gray-3) focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
              }`}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--gray-4)" />
          </div>
          <div className="flex-shrink-0">
            <Button
              variant="primary"
              size="lg"
              icon={Plus}
              rounded="default"
              className="h-12 shadow-soft"
            >
              Add
            </Button>
          </div>
        </div>
        {hasError && <p className="mt-1 t-sm t-err">{error}</p>}
      </div>

      {/* Search Results Dropdown */}
      {showSearchResults && searchQuery && !loading && (
        <div className="absolute z-10 w-full max-w-sm mt-1 bg-(--light) border border-(--gray-2) rounded-8 shadow-large max-h-60 overflow-y-auto">
          {filteredBricks.length > 0 ? (
            filteredBricks.map((brick) => (
              <div
                key={brick.id}
                onClick={() => handleAddBrick(brick)}
                className="p-3 hover:bg-(--muted) cursor-pointer border-b border-(--gray-1) last:border-0 transition-colors"
              >
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-bold text-(--gray-9)">{brick.brickCode || brick.name}</p>
                    {brick.brickCode && <p className="text-xs text-(--gray-5)">{brick.name}</p>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-sm text-(--gray-5)">No bricks found</div>
          )}
        </div>
      )}

      {/* Selected Bricks Grid */}
      {selectedBricks.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {selectedBricks.map((brick) => (
            <div
              key={brick.id}
              className="group inline-flex items-center gap-2 bg-(--primary) text-white px-4 py-1.5 rounded-8 hover:shadow-md transition-all cursor-default"
            >
              <span className="text-sm font-bold leading-none">
                {brick.brickCode || brick.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveBrick(brick.id);
                }}
                className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
                title="Remove Brick"
              >
                <X className="w-3.5 h-3.5 cursor-pointer" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
