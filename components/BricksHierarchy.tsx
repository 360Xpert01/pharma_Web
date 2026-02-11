"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  MoreVertical,
  MapPin,
  Globe,
  Building2,
  Building,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrickItem } from "@/store/slices/brick/getBrickListSlice";

type GeoUnitType = "zone" | "region" | "territory" | "brick";

interface HierarchyNode {
  id: string;
  name: string;
  type: GeoUnitType;
  latitude?: number;
  longitude?: number;
  brickCode?: string;
  children?: HierarchyNode[];
}

const CHILD_TYPE_MAP: Record<GeoUnitType, GeoUnitType | null> = {
  zone: "region",
  region: "territory",
  territory: "brick",
  brick: null,
};

interface BrickNodeProps {
  item: HierarchyNode;
  level: number;
  onAddChild?: (parentId: string, childType: GeoUnitType) => void;
  onMoreOptions?: (itemId: string, itemType: GeoUnitType) => void;
}

const BrickNode: React.FC<BrickNodeProps> = ({ item, level, onAddChild, onMoreOptions }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasChildren = item.children && item.children.length > 0;

  // For dynamic type support, we determine next type based on CHILD_TYPE_MAP
  const childType = CHILD_TYPE_MAP[item.type];
  const canHaveChildren = childType !== null;

  const getTypeIcon = (type: GeoUnitType) => {
    switch (type) {
      case "zone":
        return Globe;
      case "region":
        return Building2;
      case "territory":
        return Building;
      case "brick":
        return MapPin;
      default:
        return MapPin;
    }
  };

  const getTypeStyles = (type: GeoUnitType) => {
    switch (type) {
      case "zone":
        return "bg-[var(--chart-4)] text-[var(--light)]";
      case "region":
        return "bg-[var(--primary)] text-[var(--light)]";
      case "territory":
        return "bg-[var(--primary)]/80 text-[var(--light)]";
      case "brick":
        return "bg-[var(--warning)] text-[var(--light)]";
      default:
        return "bg-[var(--primary)] text-[var(--light)]";
    }
  };

  const Icon = getTypeIcon(item.type);

  return (
    <div className="relative" style={{ marginLeft: level > 0 ? "48px" : "0" }}>
      {level > 0 && (
        <>
          <div
            className="absolute border-l-2 border-dashed border-[var(--gray-3)]"
            style={{ left: "-24px", top: "0", height: "36px" }}
          />
          <div
            className="absolute border-t-2 border-dashed border-[var(--gray-3)]"
            style={{ left: "-24px", top: "36px", width: "24px" }}
          />
        </>
      )}

      {hasChildren && isExpanded && (
        <div
          className="absolute border-l-2 border-dashed border-[var(--gray-3)]"
          style={{
            left: level === 0 ? "24px" : "-24px",
            top: level === 0 ? "72px" : "36px",
            bottom: "0",
          }}
        />
      )}

      <div className="flex items-center gap-3 group border border-[var(--gray-2)] rounded-8 p-4 bg-[var(--background)] hover:bg-[var(--gray-0)] transition-colors">
        <div className="flex items-center">
          {hasChildren ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-6 h-6 flex items-center justify-center hover:bg-[var(--gray-2)] rounded transition-colors z-10 mr-2 cursor-pointer"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-[var(--gray-6)]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[var(--gray-6)]" />
              )}
            </button>
          ) : (
            <div className="w-6 mr-2" />
          )}
        </div>

        <div
          className={cn(
            "w-10 h-10 rounded-8 flex items-center justify-center",
            getTypeStyles(item.type)
          )}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[var(--gray-9)]">{item.name}</div>
        </div>

        <div className="flex items-center gap-2">
          {canHaveChildren && (
            <button
              className="h-10 w-10 rounded-8 bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-[var(--light)] border-none shadow-soft cursor-pointer flex items-center justify-center transition-colors"
              onClick={() => childType && onAddChild?.(item.id, childType)}
              title={`Add child`}
            >
              <Plus className="w-5 h-5" />
            </button>
          )}

          <button
            className="w-9 h-9 flex items-center justify-center hover:bg-[var(--gray-1)] rounded-8 transition-colors cursor-pointer"
            onClick={() => onMoreOptions?.(item.id, item.type)}
          >
            <MoreVertical className="w-4 h-4 text-[var(--gray-6)]" />
          </button>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="relative mt-4 space-y-4">
          {item.children!.map((child) => (
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
  zones: BrickItem[];
  regions: BrickItem[];
  territories?: BrickItem[];
  bricks: BrickItem[];
  loading?: boolean;
  error?: string | null;
  onAddChild?: (parentId: string, childType: GeoUnitType) => void;
  onMoreOptions?: (itemId: string, itemType: GeoUnitType) => void;
}

export const BricksHierarchy: React.FC<BricksHierarchyProps> = ({
  zones,
  regions,
  territories = [],
  bricks,
  loading = false,
  error = null,
  onAddChild,
  onMoreOptions,
}) => {
  const hierarchyData = useMemo((): HierarchyNode[] => {
    // 1. Tag items with their type and put them in a flat map grouped by parentId
    const allItems = [
      ...zones.map((z) => ({ ...z, _type: "zone" as GeoUnitType })),
      ...regions.map((r) => ({ ...r, _type: "region" as GeoUnitType })),
      ...territories.map((t) => ({ ...t, _type: "territory" as GeoUnitType })),
      ...bricks.map((b) => ({ ...b, _type: "brick" as GeoUnitType })),
    ];

    const itemsByParentId = new Map<string, any[]>();
    allItems.forEach((item) => {
      if (item.parentId) {
        const existing = itemsByParentId.get(item.parentId) || [];
        existing.push(item);
        itemsByParentId.set(item.parentId, existing);
      }
    });

    // 2. Recursive function to build the tree
    const buildNode = (item: any): HierarchyNode => {
      const type = item._type as GeoUnitType;
      const childrenRaw = itemsByParentId.get(item.id) || [];

      return {
        id: item.id,
        name: item.name,
        type: type,
        latitude: item.latitude,
        longitude: item.longitude,
        brickCode: item.brickCode,
        children: childrenRaw.length > 0 ? childrenRaw.map((child) => buildNode(child)) : undefined,
      };
    };

    // 3. Build hierarchy starting from zones (roots)
    return zones.map((zone) => buildNode({ ...zone, _type: "zone" }));
  }, [zones, regions, territories, bricks]);

  if (loading) {
    return (
      <div className="w-full bg-[var(--background)] rounded-8">
        <div className="px-6 py-16 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin mb-4" />
          <p className="text-[var(--gray-5)]">Loading bricks hierarchy...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-[var(--background)] rounded-8">
        <div className="px-6 py-16 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-8 bg-[var(--destructive)]/10 flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-[var(--destructive)]" />
          </div>
          <p className="text-[var(--destructive)] font-medium mb-2">Failed to load hierarchy</p>
          <p className="text-[var(--gray-5)] text-sm text-center max-w-md">{error}</p>
        </div>
      </div>
    );
  }

  if (hierarchyData.length === 0) {
    return (
      <div className="w-full bg-[var(--background)] rounded-8">
        <div className="px-6 py-16 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-8 bg-[var(--gray-1)] flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-[var(--gray-4)]" />
          </div>
          <p className="text-[var(--gray-5)] font-medium mb-2">No zones found</p>
          <p className="text-[var(--gray-4)] text-sm text-center">
            Add a new zone to get started with your geographical hierarchy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--background)] rounded-8">
      <div className="px-6 py-8 space-y-6">
        {hierarchyData.map((item) => (
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
