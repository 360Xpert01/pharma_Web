"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Plus, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import RoleSvg from "@/components/svgs/role-svg";

type RoleLevel = "company" | "department" | "position" | "role";

interface RoleItem {
  id: string;
  name: string;
  subtitle?: string;
  type: RoleLevel;
  responsibilities?: string;
  children?: RoleItem[];
}

// Define the hierarchy: what can be added under each type
const CHILD_TYPE_MAP: Record<RoleLevel, RoleLevel | null> = {
  company: "department",
  department: "position",
  position: "role",
  role: null, // Roles cannot have children
};

interface BrickNodeProps {
  item: RoleItem;
  level: number;
  onAddChild?: (parentId: string, childType: RoleLevel) => void;
  onMoreOptions?: (itemId: string, itemType: RoleLevel) => void;
}

const BrickNode: React.FC<BrickNodeProps> = ({ item, level, onAddChild, onMoreOptions }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasChildren = item.children && item.children.length > 0;
  const canHaveChildren = CHILD_TYPE_MAP[item.type] !== null;
  const childType = CHILD_TYPE_MAP[item.type];

  // Determine colors based on type
  const getTypeStyles = (type: RoleLevel) => {
    switch (type) {
      case "company":
        return "bg-blue-600 text-white";
      case "department":
        return "bg-blue-600 text-white";
      case "position":
        return "bg-blue-600 text-white";
      case "role":
        return "bg-blue-600 text-white";
      default:
        return "bg-blue-600 text-white";
    }
  };

  const getTypeLabel = (type: RoleLevel) => {
    switch (type) {
      case "company":
        return "Company";
      case "department":
        return "Department";
      case "position":
        return "Position";
      case "role":
        return "Role";
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

      <div className="flex items-center gap-3 group border border-gray-200 rounded-lg p-3 sm:p-4 bg-(--background) hover:bg-gray-50 transition-colors">
        {/* Expand/Collapse Button */}
        <div className="flex items-center flex-shrink-0">
          {hasChildren ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition-colors z-10 cursor-pointer"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          ) : (
            <div className="w-6" />
          )}
        </div>

        {/* Avatar Badge - Always use Role SVG */}
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            getTypeStyles(item.type)
          )}
        >
          <RoleSvg width={20} height={20} className="text-white" />
        </div>

        {/* Name and Type / Input and Dropdown - Responsive */}
        <div className="flex-1 min-w-0">
          {item.type === "role" ? (
            // For role type: show input field and dropdown with inline buttons
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 w-full">
              <input
                type="text"
                placeholder="Enter Tree Name"
                defaultValue={item.name}
                className="px-3 py-4 border border-gray-200 rounded-xl text-sm bg-(--background) text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-400 w-full sm:w-80"
              />
              <div className="relative w-full sm:w-auto">
                <select
                  defaultValue={item.responsibilities || ""}
                  className="px-3 py-4 pr-8 border border-gray-200 rounded-xl text-sm bg-(--background) text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-400 w-full sm:w-auto appearance-none"
                >
                  <option value="">Choose Role Responsibilities</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          ) : (
            // For company, department, position: show standard display (NO INPUTS)
            <>
              <div className="font-semibold text-gray-900 text-sm sm:text-base">{item.name}</div>
              <div className="text-xs text-gray-400">
                {item.subtitle || getTypeLabel(item.type)}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons - Always Visible */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {canHaveChildren && (
            <Button
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-md bg-blue-500 hover:bg-blue-600 text-white border-none shadow-soft flex items-center justify-center flex-shrink-0"
              onClick={() => childType && onAddChild?.(item.id, childType)}
              title={`Add ${childType}`}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          )}

          <button
            className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors text-gray-500 flex-shrink-0 cursor-pointer"
            onClick={() => onMoreOptions?.(item.id, item.type)}
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
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
  data: RoleItem[];
  onAddChild?: (parentId: string, childType: RoleLevel) => void;
  onMoreOptions?: (itemId: string, itemType: RoleLevel) => void;
}

export const BricksHierarchy: React.FC<BricksHierarchyProps> = ({
  data,
  onAddChild,
  onMoreOptions,
}) => {
  return (
    <div className="w-full bg-(--background) rounded-lg border border-gray-200 shadow-soft">
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
