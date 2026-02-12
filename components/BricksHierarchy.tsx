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
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrickItem } from "@/store/slices/brick/getBrickListSlice";

type GeoUnitType = "zone" | "region" | "brick";

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
  region: "brick",
  brick: null,
};

interface BrickNodeProps {
  item: HierarchyNode;
  level: number;
  addingId: string | null;
  onAddChild?: (parentId: string, childType: GeoUnitType) => void;
  onCancelAdd?: () => void;
  onCreateChild?: (parentId: string, type: GeoUnitType, name: string) => void;
  onMoreOptions?: (itemId: string, itemType: GeoUnitType) => void;
}

const BrickNode: React.FC<BrickNodeProps> = ({
  item,
  level,
  addingId,
  onAddChild,
  onCancelAdd,
  onCreateChild,
  onMoreOptions,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newName, setNewName] = useState("");

  const hasChildren = item.children && item.children.length > 0;
  const isAddingToThis = addingId === item.id;

  // For dynamic type support, we determine next type based on CHILD_TYPE_MAP
  const childType = CHILD_TYPE_MAP[item.type];
  const canHaveChildren = childType !== null;

  const handleCreate = () => {
    if (newName.trim() && childType) {
      onCreateChild?.(item.id, childType, newName.trim());
      setNewName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") onCancelAdd?.();
  };

  const getTypeIcon = (type: GeoUnitType) => {
    switch (type) {
      case "zone":
        return Globe;
      case "region":
        return Building2;
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

      {(hasChildren || isAddingToThis) && isExpanded && (
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

        <div className="flex-1 min-w-0 flex flex-col">
          <span className="font-bold text-(--gray-9) truncate" title={item.name}>
            {item.name}
          </span>
          <span className="text-xs text-(--gray-5) capitalize">{item.type}</span>
        </div>

        <div className="flex items-center gap-2">
          {canHaveChildren && (
            <button
              className="h-10 w-10 rounded-8 bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-[var(--light)] border-none shadow-soft cursor-pointer flex items-center justify-center transition-colors"
              onClick={() => {
                setIsExpanded(true);
                childType && onAddChild?.(item.id, childType);
              }}
              title={`Add child`}
            >
              <Plus className="w-5 h-5 animate-pulse" />
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

      {isExpanded && (
        <div className="relative mt-4 space-y-4">
          {isAddingToThis && (
            <div className="relative" style={{ marginLeft: "48px" }}>
              <div
                className="absolute border-l-2 border-dashed border-[var(--gray-3)]"
                style={{ left: "-24px", top: "0", height: "36px" }}
              />
              <div
                className="absolute border-t-2 border-dashed border-[var(--gray-3)]"
                style={{ left: "-24px", top: "36px", width: "24px" }}
              />
              <div className="flex items-center gap-3 border border-[var(--primary)] rounded-8 p-4 bg-[var(--background)] shadow-soft animate-in slide-in-from-left-2 duration-200">
                <div
                  className={cn(
                    "w-10 h-10 rounded-8 flex items-center justify-center",
                    childType ? getTypeStyles(childType) : "bg-[var(--gray-2)]"
                  )}
                >
                  {childType &&
                    React.createElement(getTypeIcon(childType), { className: "w-5 h-5" })}
                </div>
                <div className="flex-1">
                  <input
                    autoFocus
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter Tree Name"
                    className="w-full bg-transparent border-none outline-none text-[var(--gray-9)] font-semibold placeholder:text-[var(--gray-4)]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onCancelAdd}
                    className="px-3 py-1.5 text-sm text-[var(--gray-5)] hover:text-[var(--gray-7)] font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={!newName.trim()}
                    className="px-4 py-1.5 text-sm bg-[var(--primary)] text-[var(--light)] rounded-8 font-medium hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {hasChildren &&
            item.children!.map((child) => (
              <BrickNode
                key={child.id}
                item={child}
                level={level + 1}
                addingId={addingId}
                onAddChild={onAddChild}
                onCancelAdd={onCancelAdd}
                onCreateChild={onCreateChild}
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
  bricks: BrickItem[];
  loading?: boolean;
  error?: string | null;
  onAddChild?: (parentId: string, childType: GeoUnitType) => void;
  onCancelAdd?: () => void;
  onCreateChild?: (parentId: string, type: GeoUnitType, name: string) => void;
  onMoreOptions?: (itemId: string, itemType: GeoUnitType) => void;
  addingId?: string | null;
}

export const BricksHierarchy: React.FC<BricksHierarchyProps> = ({
  zones,
  regions,
  bricks,
  loading = false,
  error = null,
  onAddChild,
  onCancelAdd,
  onCreateChild,
  onMoreOptions,
  addingId = null,
}) => {
  const hierarchyData = useMemo((): HierarchyNode[] => {
    // 1. Tag items and normalize they IDs/parentIds
    const allItems = [
      ...zones.map((z) => ({ ...z, _type: "zone" as GeoUnitType })),
      ...regions.map((r) => ({ ...r, _type: "region" as GeoUnitType })),
      ...bricks.map((b) => ({ ...b, _type: "brick" as GeoUnitType })),
    ];

    const itemsByParentId = new Map<string, any[]>();
    const allItemsMap = new Map<string, any>();

    allItems.forEach((item) => {
      const id = String(item.id).trim();
      allItemsMap.set(id, item);

      // Try to find parent link in any of these common fields
      const anyItem = item as any;
      const pId = anyItem.parentId || anyItem.zoneId || anyItem.regionId || anyItem.parent_id;

      if (pId) {
        const normalizedPId = String(pId).trim();
        const existing = itemsByParentId.get(normalizedPId) || [];
        existing.push(item);
        itemsByParentId.set(normalizedPId, existing);
      }
    });

    const visitedIds = new Set<string>();

    // 2. Recursive function to build the tree
    const buildNode = (item: any): HierarchyNode => {
      const id = String(item.id).trim();
      visitedIds.add(id);

      const type = item._type as GeoUnitType;
      const childrenRaw = (itemsByParentId.get(id) || []).sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA; // Newest on top
      });

      return {
        id: id,
        name: item.name,
        type: type,
        latitude: item.latitude,
        longitude: item.longitude,
        brickCode: item.brickCode,
        children: childrenRaw.length > 0 ? childrenRaw.map((child) => buildNode(child)) : undefined,
      };
    };

    // 3. Build hierarchy starting from zones (roots) - Sort roots as well
    const roots = zones
      .map((zone) => buildNode({ ...zone, _type: "zone" }))
      .sort((a, b) => {
        const originalA = allItemsMap.get(a.id);
        const originalB = allItemsMap.get(b.id);
        const dateA = new Date(originalA?.createdAt || 0).getTime();
        const dateB = new Date(originalB?.createdAt || 0).getTime();
        return dateB - dateA;
      });

    // 4. Handle Orphans: Items that were not reached by building from zones
    const orphans: HierarchyNode[] = [];
    allItems.forEach((item) => {
      const id = String(item.id).trim();
      if (!visitedIds.has(id)) {
        // This item is an orphan (not connected to a zone)
        // We add it as a top-level item so it's at least visible
        orphans.push(buildNode(item));
      }
    });

    return [
      ...roots,
      ...orphans.sort((a, b) => {
        const originalA = allItemsMap.get(a.id);
        const originalB = allItemsMap.get(b.id);
        const dateA = new Date(originalA?.createdAt || 0).getTime();
        const dateB = new Date(originalB?.createdAt || 0).getTime();
        return dateB - dateA;
      }),
    ];
  }, [zones, regions, bricks]);

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

  if (hierarchyData.length === 0 && !addingId) {
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
        {addingId === "root" && (
          <div className="relative">
            <div className="flex items-center gap-3 border border-[var(--primary)] rounded-8 p-4 bg-[var(--background)] shadow-soft animate-in slide-in-from-left-2 duration-200">
              <div className="w-10 h-10 rounded-8 flex items-center justify-center bg-[var(--chart-4)] text-[var(--light)]">
                <Globe className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <input
                  autoFocus
                  type="text"
                  placeholder="Enter Tree Name"
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      onCreateChild?.("root", "zone", (e.target as HTMLInputElement).value);
                    if (e.key === "Escape") onCancelAdd?.();
                  }}
                  className="w-full bg-transparent border-none outline-none text-[var(--gray-9)] font-semibold placeholder:text-[var(--gray-4)]"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onCancelAdd}
                  className="px-3 py-1.5 text-sm text-[var(--gray-5)] hover:text-[var(--gray-7)] font-medium cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {hierarchyData.map((item) => (
          <BrickNode
            key={item.id}
            item={item}
            level={0}
            addingId={addingId}
            onAddChild={onAddChild}
            onCancelAdd={onCancelAdd}
            onCreateChild={onCreateChild}
            onMoreOptions={onMoreOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default BricksHierarchy;
