"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Plus, MoreVertical, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";

type GeoUnitType = "country" | "province" | "city" | "brick";

interface BrickItem {
  id: string;
  name: string;
  type: GeoUnitType;
  children?: BrickItem[];
}

// Define the hierarchy: what can be added under each type
const CHILD_TYPE_MAP: Record<GeoUnitType, GeoUnitType | null> = {
  country: "province",
  province: "city",
  city: "brick",
  brick: null, // Bricks cannot have children
};

interface BrickNodeProps {
  item: BrickItem;
  level: number;
  onAddChild?: (parentId: string, childType: GeoUnitType) => void;
  onMoreOptions?: (itemId: string, itemType: GeoUnitType) => void;
}

const BrickNode: React.FC<BrickNodeProps> = ({ item, level, onAddChild, onMoreOptions }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasChildren = item.children && item.children.length > 0;
  const canHaveChildren = CHILD_TYPE_MAP[item.type] !== null;
  const childType = CHILD_TYPE_MAP[item.type];

  // Determine colors based on type
  const getTypeStyles = (type: GeoUnitType) => {
    switch (type) {
      case "country":
        return "bg-blue-600 text-white";
      case "province":
        return "bg-blue-600 text-white";
      case "city":
        return "bg-blue-600 text-white";
      case "brick":
        return "bg-blue-600 text-white";
      default:
        return "bg-blue-600 text-white";
    }
  };

  const getTypeLabel = (type: GeoUnitType) => {
    switch (type) {
      case "country":
        return "Country";
      case "province":
        return "Province";
      case "city":
        return "City";
      case "brick":
        return "Brick";
      default:
        return type;
    }
  };

  return (
    <div className="relative" style={{ marginLeft: level > 0 ? "48px" : "0" }}>
      {/* Vertical line from parent */}
      {level > 0 && (
        <>
          <div
            className="absolute border-l-2 border-dashed border-gray-300"
            style={{
              left: "-24px",
              top: "0",
              height: "36px",
            }}
          />
          {/* Horizontal line to node */}
          <div
            className="absolute border-t-2 border-dashed border-gray-300"
            style={{
              left: "-24px",
              top: "36px",
              width: "24px",
            }}
          />
        </>
      )}

      {/* Vertical line to children - extends to connect all children */}
      {hasChildren && isExpanded && (
        <div
          className="absolute border-l-2 border-dashed border-gray-300"
          style={{
            left: level === 0 ? "24px" : "-24px",
            top: level === 0 ? "72px" : "36px",
            bottom: "0",
          }}
        />
      )}

      <div className="flex items-center gap-3 group border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors">
        {/* Expand/Collapse Button */}
        <div className="flex items-center">
          {hasChildren ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition-colors z-10 mr-2"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          ) : (
            <div className="w-6 mr-2" />
          )}
        </div>

        {/* Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            getTypeStyles(item.type)
          )}
        >
          <MapPin className="w-5 h-5" />
        </div>

        {/* Name and Type */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900">{item.name}</div>
          <div className="text-sm text-gray-500">{getTypeLabel(item.type)}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 rounded-md bg-blue-500 hover:bg-blue-600 text-white border-none shadow-sm"
            onClick={() => childType && onAddChild?.(item.id, childType)}
            title={`Add ${childType}`}
            // disabled={!canHaveChildren}
          >
            <Plus className="w-5 h-5" />
          </Button>

          <button
            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
            onClick={() => onMoreOptions?.(item.id, item.type)}
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative mt-4 space-y-4">
          {item.children!.map((child, index) => (
            <BrickNode
              key={child.id}
              item={child}
              level={level + 1}
              onAddChild={onAddChild}
              onMoreOptions={onMoreOptions}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface BricksHierarchyProps {
  data: BrickItem[];
  onAddChild?: (parentId: string, childType: GeoUnitType) => void;
  onMoreOptions?: (itemId: string, itemType: GeoUnitType) => void;
}

export const BricksHierarchy: React.FC<BricksHierarchyProps> = ({
  data,
  onAddChild,
  onMoreOptions,
}) => {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Hierarchy Tree */}
      <div className="px-6 py-8 space-y-6">
        {data.map((item) => (
          <BrickNode
            key={item.id}
            item={item}
            level={0}
            onAddChild={onAddChild}
            onMoreOptions={onMoreOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default BricksHierarchy;
