import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { RoleNode } from "./role-hierarchy/role-node";
import { RootAddRow } from "./role-hierarchy/root-add-row";
import { RoleHierarchyProps } from "./role-hierarchy/types";

export const RoleHierarchy: React.FC<RoleHierarchyProps> = ({
  data,
  loading = false,
  error = null,
  onAddChild,
  onCancelAdd,
  onCreateChild,
  onUpdateChild,
  onDeleteChild,
  onMoreOptions,
  addingId = null,
  updatingId = null,
  onStartUpdate,
  permissionGroups,
  currentUserRoleId,
  currentUserPermissionGroupId,
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
          <RootAddRow
            onCreateChild={onCreateChild}
            onCancelAdd={onCancelAdd}
            permissionGroups={permissionGroups}
          />
        )}
        {data.map((item) => (
          <RoleNode
            key={item.id}
            item={item}
            level={0}
            addingId={addingId}
            updatingId={updatingId}
            isExpanded={expandedIds.has(item.id)}
            expandedIds={expandedIds}
            onToggleExpand={toggleExpand}
            onAddChild={onAddChild}
            onCancelAdd={onCancelAdd}
            onCreateChild={onCreateChild}
            onUpdateChild={onUpdateChild}
            onDeleteChild={onDeleteChild}
            onMoreOptions={onMoreOptions}
            onStartUpdate={onStartUpdate}
            permissionGroups={permissionGroups}
            currentUserRoleId={currentUserRoleId}
            currentUserPermissionGroupId={currentUserPermissionGroupId}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleHierarchy;
