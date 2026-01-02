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
  LayoutGrid,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import type { Region, Province, City, Area, Brick } from "@/store/slices/brick/getBrickListSlice";

type GeoUnitType = "region" | "province" | "city" | "area" | "brick";

interface HierarchyNode {
  id: string;
  name: string;
  type: GeoUnitType;
  latitude?: number;
  longitude?: number;
  children?: HierarchyNode[];
}

// Define the hierarchy: what can be added under each type
const CHILD_TYPE_MAP: Record<GeoUnitType, GeoUnitType | null> = {
  region: "province",
  province: "city",
  city: "area",
  area: "brick",
  brick: null, // Bricks cannot have children
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
  const canHaveChildren = CHILD_TYPE_MAP[item.type] !== null;
  const childType = CHILD_TYPE_MAP[item.type];

  // Get icon based on type
  const getTypeIcon = (type: GeoUnitType) => {
    switch (type) {
      case "region":
        return Globe;
      case "province":
        return Building2;
      case "city":
        return Building;
      case "area":
        return LayoutGrid;
      case "brick":
        return MapPin;
      default:
        return MapPin;
    }
  };

  // Determine colors based on type - using theme variables
  const getTypeStyles = (type: GeoUnitType) => {
    switch (type) {
      case "region":
        return "bg-[var(--chart-4)] text-[var(--light)]"; // Using chart-4 for variety
      case "province":
        return "bg-[var(--primary)] text-[var(--light)]";
      case "city":
        return "bg-[var(--primary)]/80 text-[var(--light)]";
      case "area":
        return "bg-[var(--success)] text-[var(--light)]";
      case "brick":
        return "bg-[var(--warning)] text-[var(--light)]";
      default:
        return "bg-[var(--primary)] text-[var(--light)]";
    }
  };

  const getTypeLabel = (type: GeoUnitType) => {
    switch (type) {
      case "region":
        return "Region";
      case "province":
        return "Province";
      case "city":
        return "City";
      case "area":
        return "Area";
      case "brick":
        return "Brick";
      default:
        return type;
    }
  };

  const Icon = getTypeIcon(item.type);

  return (
    <div className="relative" style={{ marginLeft: level > 0 ? "48px" : "0" }}>
      {/* Vertical line from parent */}
      {level > 0 && (
        <>
          <div
            className="absolute border-l-2 border-dashed border-[var(--gray-3)]"
            style={{
              left: "-24px",
              top: "0",
              height: "36px",
            }}
          />
          {/* Horizontal line to node */}
          <div
            className="absolute border-t-2 border-dashed border-[var(--gray-3)]"
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
          className="absolute border-l-2 border-dashed border-[var(--gray-3)]"
          style={{
            left: level === 0 ? "24px" : "-24px",
            top: level === 0 ? "72px" : "36px",
            bottom: "0",
          }}
        />
      )}

      <div className="flex items-center gap-3 group border border-[var(--gray-2)] rounded-8 p-4 bg-[var(--background)] hover:bg-[var(--gray-0)] transition-colors">
        {/* Expand/Collapse Button */}
        <div className="flex items-center">
          {hasChildren ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-6 h-6 flex items-center justify-center hover:bg-[var(--gray-2)] rounded transition-colors z-10 mr-2 cursor-pointer"
              aria-label={isExpanded ? "Collapse" : "Expand"}
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

        {/* Icon */}
        <div
          className={cn(
            "w-10 h-10 rounded-8 flex items-center justify-center",
            getTypeStyles(item.type)
          )}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Name and Type */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[var(--gray-9)]">{item.name}</div>
          <div className="text-sm text-[var(--gray-5)]">
            {getTypeLabel(item.type)}
            {item.type === "brick" &&
              item.latitude !== undefined &&
              item.longitude !== undefined && (
                <span className="ml-2 text-xs text-[var(--gray-4)]">
                  ({item.latitude.toFixed(4)}, {item.longitude.toFixed(4)})
                </span>
              )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {canHaveChildren && (
            <button
              className="h-10 w-10 rounded-8 bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-[var(--light)] border-none shadow-soft cursor-pointer flex items-center justify-center transition-colors"
              onClick={() => childType && onAddChild?.(item.id, childType)}
              title={`Add ${childType}`}
            >
              <Plus className="w-5 h-5" />
            </button>
          )}

          <button
            className="w-9 h-9 flex items-center justify-center hover:bg-[var(--gray-1)] rounded-8 transition-colors cursor-pointer"
            onClick={() => onMoreOptions?.(item.id, item.type)}
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4 text-[var(--gray-6)]" />
          </button>
        </div>
      </div>

      {/* Children */}
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

// Props for the BricksHierarchy component
interface BricksHierarchyProps {
  regions: Region[];
  provinces: Province[];
  cities: City[];
  areas: Area[];
  bricks: Brick[];
  loading?: boolean;
  error?: string | null;
  onAddChild?: (parentId: string, childType: GeoUnitType) => void;
  onMoreOptions?: (itemId: string, itemType: GeoUnitType) => void;
}

export const BricksHierarchy: React.FC<BricksHierarchyProps> = ({
  regions,
  provinces,
  cities,
  areas,
  bricks,
  loading = false,
  error = null,
  onAddChild,
  onMoreOptions,
}) => {
  // Transform flat API data into hierarchical structure
  const hierarchyData = useMemo((): HierarchyNode[] => {
    // Create maps for efficient lookup
    const provincesByRegion = new Map<string, Province[]>();
    const citiesByProvince = new Map<string, City[]>();
    const areasByCity = new Map<string, Area[]>();
    const bricksByArea = new Map<string, Brick[]>();

    // Group provinces by region
    provinces.forEach((province) => {
      const existing = provincesByRegion.get(province.regionId) || [];
      existing.push(province);
      provincesByRegion.set(province.regionId, existing);
    });

    // Group cities by province
    cities.forEach((city) => {
      const existing = citiesByProvince.get(city.provinceId) || [];
      existing.push(city);
      citiesByProvince.set(city.provinceId, existing);
    });

    // Group areas by city
    areas.forEach((area) => {
      const existing = areasByCity.get(area.cityId) || [];
      existing.push(area);
      areasByCity.set(area.cityId, existing);
    });

    // Group bricks by area
    bricks.forEach((brick) => {
      const existing = bricksByArea.get(brick.areaId) || [];
      existing.push(brick);
      bricksByArea.set(brick.areaId, existing);
    });

    // Build hierarchy from top down
    return regions.map(
      (region): HierarchyNode => ({
        id: region.id,
        name: region.name,
        type: "region",
        children: (provincesByRegion.get(region.id) || []).map(
          (province): HierarchyNode => ({
            id: province.id,
            name: province.name,
            type: "province",
            children: (citiesByProvince.get(province.id) || []).map(
              (city): HierarchyNode => ({
                id: city.id,
                name: city.name,
                type: "city",
                children: (areasByCity.get(city.id) || []).map(
                  (area): HierarchyNode => ({
                    id: area.id,
                    name: area.name,
                    type: "area",
                    children: (bricksByArea.get(area.id) || []).map(
                      (brick): HierarchyNode => ({
                        id: brick.id,
                        name: brick.name,
                        type: "brick",
                        latitude: brick.latitude,
                        longitude: brick.longitude,
                      })
                    ),
                  })
                ),
              })
            ),
          })
        ),
      })
    );
  }, [regions, provinces, cities, areas, bricks]);

  // Loading state
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

  // Error state
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

  // Empty state
  if (hierarchyData.length === 0) {
    return (
      <div className="w-full bg-[var(--background)] rounded-8">
        <div className="px-6 py-16 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-8 bg-[var(--gray-1)] flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-[var(--gray-4)]" />
          </div>
          <p className="text-[var(--gray-5)] font-medium mb-2">No regions found</p>
          <p className="text-[var(--gray-4)] text-sm text-center">
            Add a new region to get started with your geographical hierarchy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--background)] rounded-8">
      {/* Hierarchy Tree */}
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
