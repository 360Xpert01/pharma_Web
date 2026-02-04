import React, { useState } from "react";
import { ChevronDown, ChevronRight, X, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import type { BrickItem } from "@/store/slices/brick/getBrickListSlice";

export interface HierarchyNodeType {
  userId: string;
  email: string;
  fullName: string;
  roleId: string;
  roleName: string;
  supervisorId: string | null;
  hierarchyLevel: number;
  parentSalesRepId: string | null;
  isSalesRep: boolean;
  children: HierarchyNodeType[];
}

// Function to deep clone a hierarchy node
export function cloneHierarchyNode(node: HierarchyNodeType): HierarchyNodeType {
  return {
    ...node,
    children: node.children.map(cloneHierarchyNode),
  };
}

// Helper function to merge children arrays
function mergeHierarchyChildren(
  existingChildren: HierarchyNodeType[],
  newChildren: HierarchyNodeType[]
): HierarchyNodeType[] {
  const childMap = new Map<string, HierarchyNodeType>();

  // Add existing children to map
  for (const child of existingChildren) {
    childMap.set(child.userId, cloneHierarchyNode(child));
  }

  // Merge new children
  for (const child of newChildren) {
    if (childMap.has(child.userId)) {
      // Child exists, merge their children recursively
      const existingChild = childMap.get(child.userId)!;
      existingChild.children = mergeHierarchyChildren(existingChild.children, child.children);
    } else {
      // New child, add it
      childMap.set(child.userId, cloneHierarchyNode(child));
    }
  }

  return Array.from(childMap.values());
}

// Function to merge multiple hierarchies intelligently
// If two sales reps share the same manager, they will be placed under the same manager node
export function mergeHierarchies(hierarchies: HierarchyNodeType[]): HierarchyNodeType[] {
  if (hierarchies.length === 0) return [];
  if (hierarchies.length === 1) return hierarchies;

  const mergedMap = new Map<string, HierarchyNodeType>();

  for (const hierarchy of hierarchies) {
    const rootId = hierarchy.userId;

    if (mergedMap.has(rootId)) {
      // This root already exists, merge children
      const existingNode = mergedMap.get(rootId)!;
      existingNode.children = mergeHierarchyChildren(existingNode.children, hierarchy.children);
    } else {
      // Clone to avoid mutating original
      mergedMap.set(rootId, cloneHierarchyNode(hierarchy));
    }
  }

  return Array.from(mergedMap.values());
}

// Props for HierarchyNode with brick assignment
interface HierarchyNodeProps {
  node: HierarchyNodeType;
  level: number;
  availableBrickItems: BrickItem[];
  assignedBrickItems: Map<string, BrickItem[]>;
  onAssignBrickItem: (userId: string, brick: BrickItem) => void;
  onRemoveBrickItem: (userId: string, brickId: string) => void;
  brickSearchQuery: string;
  activeBrickItemSearchUserId: string | null;
  onBrickItemSearchChange: (query: string) => void;
  onToggleBrickItemSearch: (userId: string | null) => void;
}

// Recursive Hierarchy Node Component with BrickItem Assignment
export function HierarchyNode({
  node,
  level,
  availableBrickItems,
  assignedBrickItems,
  onAssignBrickItem,
  onRemoveBrickItem,
  brickSearchQuery,
  activeBrickItemSearchUserId,
  onBrickItemSearchChange,
  onToggleBrickItemSearch,
}: HierarchyNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSearchActive = activeBrickItemSearchUserId === node.userId;
  const userBrickItems = assignedBrickItems.get(node.userId) || [];

  // Filter bricks by search query (exclude already assigned)
  const filteredBrickItems = availableBrickItems.filter(
    (brick) =>
      !userBrickItems.find((b) => b.id === brick.id) &&
      brick.name.toLowerCase().includes(brickSearchQuery.toLowerCase())
  );

  const handleAssignBrickItemsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBrickItemSearch(isSearchActive ? null : node.userId);
    onBrickItemSearchChange("");
  };

  const handleBrickItemSelect = (brick: BrickItem) => {
    onAssignBrickItem(node.userId, brick);
    onBrickItemSearchChange("");
    // Close search after selecting a brick - button will reappear
    onToggleBrickItemSearch(null);
  };

  return (
    <div className="relative" style={{ marginLeft: level > 0 ? "64px" : "0" }}>
      {/* Connector line */}
      {level > 0 && (
        <div className="absolute left-[-24px] top-8 w-6 border-t-2 border-dotted border-[var(--gray-3)]" />
      )}

      {/* Node card */}
      <div
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`flex items-center gap-4 bg-[var(--light)] border border-[var(--gray-2)] rounded-8 p-6 hover:shadow-soft transition-all ${hasChildren ? "cursor-pointer" : ""} select-none`}
      >
        {hasChildren && (
          <Button size="icon" variant="ghost" className="flex-shrink-0 w-8 h-8">
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-[var(--gray-5)]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[var(--gray-5)]" />
            )}
          </Button>
        )}

        <div className="w-12 h-12 rounded-8 bg-[var(--gray-3)] overflow-hidden flex-shrink-0 flex items-center justify-center">
          <span className="text-[var(--gray-6)] font-bold text-lg">
            {node.fullName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>

        <div className="flex-1">
          <p className="t-td-b">{node.fullName}</p>
          <p className="t-md">{node.roleName}</p>
        </div>

        {node.isSalesRep && (
          <div className="flex items-center gap-2">
            {/* Assigned BrickItems Pills */}
            {userBrickItems.slice(0, 4).map((brick) => (
              <span
                key={brick.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium rounded-8 whitespace-nowrap"
              >
                {brick.name}
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBrickItem(node.userId, brick.id);
                  }}
                  className="w-4 h-4 hover:bg-[var(--primary-2)]"
                >
                  <X className="w-3 h-3" />
                </Button>
              </span>
            ))}
            {userBrickItems.length > 4 && (
              <span className="inline-flex items-center px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium rounded-8 whitespace-nowrap">
                +{userBrickItems.length - 4}
              </span>
            )}

            {/* Assign BrickItems Button OR Search Input */}
            {isSearchActive ? (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <input
                    type="text"
                    value={brickSearchQuery}
                    onChange={(e) => onBrickItemSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onToggleBrickItemSearch(null);
                      }
                    }}
                    placeholder="e.g: KL123, KL456, KL789"
                    className="w-64 px-4 py-3 pl-12 border border-[var(--gray-3)] rounded-8 focus:ring-2 focus:ring-[var(--primary)] outline-none"
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-4)]" />
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => onToggleBrickItemSearch(null)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-4)] hover:text-[var(--gray-6)]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </Button>
                </div>{" "}
                {/* BrickItem Dropdown */}
                {brickSearchQuery && (
                  <div className="absolute z-20 w-64 mt-2 bg-[var(--light)] border border-[var(--gray-2)] rounded-8 shadow-soft max-h-48 overflow-y-auto">
                    {filteredBrickItems.length > 0 ? (
                      filteredBrickItems.map((brick) => (
                        <div
                          key={brick.id}
                          onClick={() => handleBrickItemSelect(brick)}
                          className="p-3 hover:bg-[var(--muted)] cursor-pointer border-b border-[var(--gray-1)] last:border-0 transition-colors"
                        >
                          <p className="font-medium text-[var(--gray-9)]">{brick.name}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-[var(--gray-5)]">No bricks found</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={handleAssignBrickItemsClick}
                variant="primary"
                size="lg"
                icon={Plus}
                rounded="default"
                className="shadow-soft"
              >
                Assign Bricks
              </Button>
            )}
          </div>
        )}

        <Button
          size="icon"
          variant="ghost"
          className="text-[var(--gray-4)] hover:text-[var(--gray-5)]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </Button>
      </div>

      {/* Children */}
      {hasChildren && isOpen && (
        <div className="relative mt-4">
          {/* Vertical line for children */}
          {node.children.length > 1 && (
            <div
              className="absolute left-10 top-0 border-l-2 border-dotted border-[var(--gray-3)]"
              style={{ height: `calc(100% - 40px)` }}
            />
          )}
          <div className="space-y-4">
            {node.children.map((child) => (
              <HierarchyNode
                key={child.userId}
                node={child}
                level={level + 1}
                availableBrickItems={availableBrickItems}
                assignedBrickItems={assignedBrickItems}
                onAssignBrickItem={onAssignBrickItem}
                onRemoveBrickItem={onRemoveBrickItem}
                brickSearchQuery={brickSearchQuery}
                activeBrickItemSearchUserId={activeBrickItemSearchUserId}
                onBrickItemSearchChange={onBrickItemSearchChange}
                onToggleBrickItemSearch={onToggleBrickItemSearch}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
