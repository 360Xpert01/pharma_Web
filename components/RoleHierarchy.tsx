"use client";

import React, { useState } from "react";
import { ChevronUp, Plus, MoreVertical } from "lucide-react";
import RoleSvg from "@/components/svgs/role-svg";

type RoleLevel = "company" | "department" | "position" | "role";

interface RoleItem {
  id: string;
  name: string;
  subtitle?: string;
  type: RoleLevel;
  responsibilities?: string;
  children?: RoleItem[];
  isNew?: boolean;
}

const CHILD_TYPE_MAP: Record<RoleLevel, RoleLevel | null> = {
  company: "department",
  department: "position",
  position: "role",
  role: null,
};

interface RoleNodeProps {
  item: RoleItem;
  level: number;
  isLastChild?: boolean;
  onAddChild?: (parentId: string, childType: RoleLevel) => void;
  onMoreOptions?: (itemId: string, itemType: RoleLevel) => void;
}

const RoleNode: React.FC<RoleNodeProps> = ({
  item,
  level,
  isLastChild = false,
  onAddChild,
  onMoreOptions,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const hasChildren = item.children && item.children.length > 0;
  const canHaveChildren = CHILD_TYPE_MAP[item.type] !== null;
  const childType = CHILD_TYPE_MAP[item.type];

  // Calculate left offset for connector lines
  const connectorOffset = 24;
  const nodeIndent = level * 48;

  return (
    <div className="relative">
      {/* Connector lines for nested items */}
      {level > 0 && (
        <>
          {/* Vertical line from parent */}
          <div
            className="absolute border-l-2 border-dashed"
            style={{
              borderColor: "var(--gray-3)",
              left: `${nodeIndent - connectorOffset}px`,
              top: 0,
              height: isLastChild ? "28px" : "100%",
            }}
          />
          {/* Horizontal line to node */}
          <div
            className="absolute border-t-2 border-dashed"
            style={{
              borderColor: "var(--gray-3)",
              left: `${nodeIndent - connectorOffset}px`,
              top: "28px",
              width: `${connectorOffset - 4}px`,
            }}
          />
        </>
      )}

      {/* Main node card */}
      <div
        className="relative flex items-center gap-3 shadow-soft bg-[var(--background)] rounded-xl py-3 px-4"
        style={{ marginLeft: `${nodeIndent}px` }}
      >
        {/* Expand/Collapse Button */}
        <button
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
          className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors flex-shrink-0 ${
            hasChildren
              ? "hover:bg-[var(--gray-1)] cursor-pointer text-[var(--gray-6)]"
              : "text-transparent cursor-default"
          }`}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <ChevronUp
            className={`w-5 h-5 transition-transform duration-200 ${
              !isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Role Icon Badge */}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[var(--primary)]">
          <RoleSvg width={18} height={18} className="text-white" />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {item.isNew ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter Tree Name"
                defaultValue={item.name}
                className="px-3 py-2 border border-[var(--gray-3)] rounded-lg text-sm bg-[var(--background)] text-[var(--gray-7)] placeholder-[var(--gray-4)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] w-40"
              />
              <div className="relative">
                <select
                  defaultValue={item.responsibilities || ""}
                  className="px-3 py-2 pr-8 border border-[var(--gray-3)] rounded-lg text-sm bg-[var(--background)] text-[var(--gray-5)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] appearance-none cursor-pointer min-w-[200px]"
                >
                  <option value="">Choose Role Responsibilities</option>
                  <option value="sales">Sales & Marketing</option>
                  <option value="operations">Operations</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Human Resources</option>
                </select>
                <ChevronUp className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--gray-5)] pointer-events-none rotate-180" />
              </div>
            </div>
          ) : (
            <>
              <div className="font-semibold text-[var(--gray-9)] text-sm leading-tight">
                {item.name}
              </div>
              {item.subtitle && (
                <div className="text-xs text-[var(--gray-5)] mt-0.5">{item.subtitle}</div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="w-9 h-9 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center cursor-pointer"
            onClick={() => childType && onAddChild?.(item.id, childType)}
            title={childType ? `Add ${childType}` : "Add"}
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center hover:bg-[var(--gray-1)] rounded-lg transition-colors text-[var(--gray-5)] cursor-pointer"
            onClick={() => onMoreOptions?.(item.id, item.type)}
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Child nodes */}
      {hasChildren && isExpanded && (
        <div className="mt-3 space-y-3">
          {item.children!.map((child, index) => (
            <RoleNode
              key={child.id}
              item={child}
              level={level + 1}
              isLastChild={index === item.children!.length - 1}
              onAddChild={onAddChild}
              onMoreOptions={onMoreOptions}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface RoleHierarchyProps {
  data: RoleItem[];
  onAddChild?: (parentId: string, childType: RoleLevel) => void;
  onMoreOptions?: (itemId: string, itemType: RoleLevel) => void;
}

export const RoleHierarchy: React.FC<RoleHierarchyProps> = ({
  data,
  onAddChild,
  onMoreOptions,
}) => {
  return (
    <div className="w-full bg-[var(--background)] rounded-xl p-6">
      <div className="space-y-3">
        {data.map((item, index) => (
          <RoleNode
            key={item.id}
            item={item}
            level={0}
            isLastChild={index === data.length - 1}
            onAddChild={onAddChild}
            onMoreOptions={onMoreOptions}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleHierarchy;
