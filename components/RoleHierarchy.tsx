"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  MoreVertical,
  Globe,
  Building2,
  Users,
  User,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import RoleResponsibilitiesDropdown from "@/components/RoleResponsibilitiesDropdown";

export type RoleLevel = "company" | "department" | "position" | "role";

export interface RoleItem {
  id: string;
  name: string;
  subtitle?: string;
  type: RoleLevel;
  responsibilities?: string;
  pulseCode?: string;
  children?: RoleItem[];
}

const CHILD_TYPE_MAP: Record<RoleLevel, RoleLevel | null> = {
  company: "department",
  department: "position",
  position: "role",
  role: null,
};

// Maps hierarchy depth/type to the default role responsibility
const ROLE_LEVEL_TO_RESPONSIBILITY: Record<RoleLevel, string> = {
  company: "Administrator",
  department: "C-Suite",
  position: "Manager",
  role: "Sales Representative",
};

// Helper to determine responsibility based on role name
const getResponsibilityByName = (name: string, level: RoleLevel): string => {
  const upperName = name.toUpperCase();
  if (upperName.includes("ADMIN")) return "Administrator";
  if (upperName.includes("CEO") || upperName.includes("CCO") || upperName.includes("CHIEF"))
    return "C-Suite";
  if (upperName.includes("REPRESENTATIVE") || upperName.includes("REP"))
    return "Sales Representative";
  if (upperName.includes("MANAGER") || upperName.includes("HEAD") || upperName.includes("DIRECTOR"))
    return "Manager";

  return ROLE_LEVEL_TO_RESPONSIBILITY[level];
};

interface RoleNodeProps {
  item: RoleItem;
  level: number;
  addingId: string | null;
  isExpanded: boolean;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onAddChild?: (parentId: string, childType: RoleLevel) => void;
  onCancelAdd?: () => void;
  onCreateChild?: (
    parentId: string,
    type: RoleLevel,
    name: string,
    pulseCode: string,
    responsibilities?: string
  ) => void;
  onMoreOptions?: (itemId: string, itemType: RoleLevel) => void;
}

const getTypeIcon = (type: RoleLevel) => {
  switch (type) {
    case "company":
      return Globe;
    case "department":
      return Building2;
    case "position":
      return Users;
    case "role":
      return User;
    default:
      return User;
  }
};

const getTypeStyles = (type: RoleLevel) => {
  switch (type) {
    case "company":
      return "bg-[var(--chart-4)] text-[var(--light)]";
    case "department":
      return "bg-[var(--primary)] text-[var(--light)]";
    case "position":
      return "bg-[var(--warning)] text-[var(--light)]";
    case "role":
      return "bg-[var(--success)] text-[var(--light)]";
    default:
      return "bg-[var(--primary)] text-[var(--light)]";
  }
};

const RoleNode: React.FC<RoleNodeProps> = ({
  item,
  level,
  addingId,
  isExpanded,
  expandedIds,
  onToggleExpand,
  onAddChild,
  onCancelAdd,
  onCreateChild,
  onMoreOptions,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isAddingToThis = addingId === item.id;
  const childType = CHILD_TYPE_MAP[item.type];
  const canHaveChildren = childType !== null;

  const [newName, setNewName] = useState("");
  // Pre-fill from depth: the child being created gets a default responsibility
  const [newResponsibilities, setNewResponsibilities] = useState(
    childType ? ROLE_LEVEL_TO_RESPONSIBILITY[childType] : ""
  );

  // Update responsibilities when name changes
  useEffect(() => {
    if (isAddingToThis && childType && newName.trim()) {
      setNewResponsibilities(getResponsibilityByName(newName, childType));
    }
  }, [newName, isAddingToThis, childType]);

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateChild?.(item.id, childType!, newName.trim(), "", newResponsibilities || undefined);
      setNewName("");
      setNewResponsibilities("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onCancelAdd?.();
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

      {/* ── Existing Node View Row ── */}
      <div className="flex items-center gap-3 group border border-[var(--gray-2)] rounded-8 p-4 bg-[var(--background)] hover:bg-[var(--gray-0)] transition-colors">
        <div className="flex items-center">
          {hasChildren ? (
            <button
              type="button"
              onClick={() => onToggleExpand(item.id)}
              className="w-6 h-6 flex items-center justify-center hover:bg-[var(--gray-2)] rounded-8 transition-colors z-10 mr-2 cursor-pointer"
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
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-bold text-(--gray-9) truncate" title={item.name}>
              {item.name}
            </span>
            <span className="text-xs text-(--gray-5) capitalize flex-shrink-0">({item.type})</span>
          </div>
          {item.subtitle && (
            <span className="text-xs text-(--gray-4) truncate" title={item.subtitle}>
              {item.subtitle}
            </span>
          )}
        </div>

        {/* Dropdown shown on every existing node – defaults from depth */}
        <div className="flex-shrink-0">
          <RoleResponsibilitiesDropdown
            value={item.responsibilities || getResponsibilityByName(item.name, item.type)}
            onChange={() => {}}
            readOnly
          />
        </div>

        <div className="flex items-center gap-2">
          {canHaveChildren && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isExpanded) onToggleExpand(item.id);
                onAddChild?.(item.id, childType!);
              }}
              className="w-8 h-8 flex items-center justify-center bg-(--primary) text-white rounded-8 transition-colors cursor-pointer flex-shrink-0"
              title={`Add ${childType}`}
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center hover:bg-[var(--gray-1)] rounded-8 transition-colors cursor-pointer"
            onClick={() => onMoreOptions?.(item.id, item.type)}
          >
            <MoreVertical className="w-4 h-4 text-[var(--gray-6)]" />
          </button>
        </div>
      </div>

      {/* ── Children + Inline Create ── */}
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
                <div className="flex-1 min-w-0">
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
                <div className="flex-shrink-0">
                  <RoleResponsibilitiesDropdown
                    value={newResponsibilities}
                    onChange={setNewResponsibilities}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onCancelAdd}
                    className="px-3 py-1.5 text-sm text-[var(--gray-5)] hover:text-[var(--gray-7)] font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
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
              <RoleNode
                key={child.id}
                item={child}
                level={level + 1}
                addingId={addingId}
                isExpanded={expandedIds.has(child.id)}
                expandedIds={expandedIds}
                onToggleExpand={onToggleExpand}
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

// ── Root-level add row ──
const RootAddRow: React.FC<{
  onCreateChild?: (
    parentId: string,
    type: RoleLevel,
    name: string,
    pulseCode: string,
    responsibilities?: string
  ) => void;
  onCancelAdd?: () => void;
}> = ({ onCreateChild, onCancelAdd }) => {
  const [rootName, setRootName] = useState("");
  // Root level = company = Administrator by default
  const [rootResponsibilities, setRootResponsibilities] = useState("Administrator");

  // Update responsibilities when name changes
  useEffect(() => {
    if (rootName.trim()) {
      setRootResponsibilities(getResponsibilityByName(rootName, "company"));
    }
  }, [rootName]);

  return (
    <div className="flex items-center gap-3 border border-[var(--primary)] rounded-8 p-4 bg-[var(--background)] shadow-soft">
      <div className="w-10 h-10 rounded-8 flex items-center justify-center bg-[var(--chart-4)] text-[var(--light)]">
        <Globe className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <input
          autoFocus
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          placeholder="Enter Tree Name"
          className="w-full outline-none font-semibold bg-transparent placeholder:text-[var(--gray-4)]"
          onKeyDown={(e) => {
            if (e.key === "Enter" && rootName.trim()) {
              onCreateChild?.(
                "root",
                "company",
                rootName.trim(),
                "",
                rootResponsibilities || undefined
              );
            }
            if (e.key === "Escape") {
              onCancelAdd?.();
            }
          }}
        />
      </div>
      <div className="flex-shrink-0">
        <RoleResponsibilitiesDropdown
          value={rootResponsibilities}
          onChange={setRootResponsibilities}
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
          type="button"
          onClick={() => {
            if (rootName.trim()) {
              onCreateChild?.(
                "root",
                "company",
                rootName.trim(),
                "",
                rootResponsibilities || undefined
              );
            }
          }}
          disabled={!rootName.trim()}
          className="px-4 py-1.5 text-sm bg-[var(--primary)] text-[var(--light)] rounded-8 font-medium hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Create
        </button>
      </div>
    </div>
  );
};

// ── Main Hierarchy Component ──
interface RoleHierarchyProps {
  data: RoleItem[];
  loading?: boolean;
  error?: string | null;
  onAddChild?: (parentId: string, childType: RoleLevel) => void;
  onCancelAdd?: () => void;
  onCreateChild?: (
    parentId: string,
    type: RoleLevel,
    name: string,
    pulseCode: string,
    responsibilities?: string
  ) => void;
  onMoreOptions?: (itemId: string, itemType: RoleLevel) => void;
  addingId?: string | null;
}

export const RoleHierarchy: React.FC<RoleHierarchyProps> = ({
  data,
  loading = false,
  error = null,
  onAddChild,
  onCancelAdd,
  onCreateChild,
  onMoreOptions,
  addingId = null,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className="w-full bg-[var(--background)] rounded-8">
        <div className="py-16 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin mb-4" />
          <p className="text-[var(--gray-5)]">Loading roles hierarchy...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-[var(--background)] rounded-8">
        <div className="py-16 flex flex-col items-center justify-center">
          <p className="text-[var(--destructive)] font-medium mb-2">Failed to load hierarchy</p>
          <p className="text-[var(--gray-5)] text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0 && !addingId) {
    return (
      <div className="w-full bg-[var(--background)] rounded-8">
        <div className="py-16 flex flex-col items-center justify-center">
          <p className="text-[var(--gray-5)] font-medium mb-2">No roles found</p>
          <button
            onClick={() => onAddChild?.("root", "company")}
            className="text-[var(--primary)] hover:underline t-sm"
          >
            Add first company role
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[var(--background)] rounded-8">
      <div className="space-y-4">
        {addingId === "root" && (
          <RootAddRow onCreateChild={onCreateChild} onCancelAdd={onCancelAdd} />
        )}
        {data.map((item) => (
          <RoleNode
            key={item.id}
            item={item}
            level={0}
            addingId={addingId}
            isExpanded={expandedIds.has(item.id)}
            expandedIds={expandedIds}
            onToggleExpand={toggleExpand}
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

export default RoleHierarchy;
