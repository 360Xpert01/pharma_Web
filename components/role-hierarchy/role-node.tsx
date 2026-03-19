"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import RoleResponsibilitiesDropdown from "@/components/RoleResponsibilitiesDropdown";
import { ConfirmModal } from "../shared/confirm-modal";
import { RoleNodeProps, CHILD_TYPE_MAP } from "./types";
import { getTypeIcon, getTypeStyles } from "./utils";

export const RoleNode: React.FC<RoleNodeProps> = ({
  item,
  level,
  addingId,
  updatingId,
  isExpanded,
  expandedIds,
  onToggleExpand,
  onAddChild,
  onCancelAdd,
  onCreateChild,
  onUpdateChild,
  onDeleteChild,
  onMoreOptions,
  onStartUpdate,
  permissionGroups,
  currentUserRoleId,
  currentUserPermissionGroupId,
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isAddingToThis = addingId === item.id;
  const isUpdatingThis = updatingId === item.id;
  const childType = CHILD_TYPE_MAP[item.type];
  const canHaveChildren = childType !== null;

  const [newName, setNewName] = useState("");
  const [newPermissionGroupId, setNewPermissionGroupId] = useState("");
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  // Pre-fill for update or add
  useEffect(() => {
    if (isUpdatingThis) {
      setNewName(item.name);
      setNewPermissionGroupId(item.permissionGroupId || "");
    } else if (isAddingToThis && childType) {
      setNewName("");
      setNewPermissionGroupId("");
    }
  }, [isUpdatingThis, isAddingToThis, item.name, item.permissionGroupId, childType]);

  const handleResponsibilityChange = (id: string) => {
    setNewPermissionGroupId(id);
  };

  const handleAction = () => {
    if (newName.trim()) {
      if (isUpdatingThis) {
        onUpdateChild?.(item.id, newName.trim(), newPermissionGroupId || undefined);
      } else if (isAddingToThis && childType) {
        onCreateChild?.(item.id, childType, newName.trim(), "", newPermissionGroupId || undefined);
        setNewName("");
        setNewPermissionGroupId("");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAction();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setIsDiscardModalOpen(true);
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

      {/* Existing Node View Row OR Update Row */}
      {isUpdatingThis ? (
        <div className="flex items-center gap-3 border border-[var(--primary)] rounded-8 p-4 bg-[var(--background)] shadow-soft animate-in fade-in duration-200">
          <div
            className={cn(
              "w-10 h-10 rounded-8 flex items-center justify-center",
              getTypeStyles(item.type)
            )}
          >
            <Icon className="w-5 h-5" />
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
              value={newPermissionGroupId}
              onChange={handleResponsibilityChange}
              options={permissionGroups}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDiscardModalOpen(true)}
              className="px-3 py-1.5 text-sm text-[var(--gray-5)] hover:text-[var(--gray-7)] font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAction}
              disabled={!newName.trim()}
              className="px-4 py-1.5 text-sm bg-[var(--primary)] text-[var(--light)] rounded-8 font-medium hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Update
            </button>
          </div>
        </div>
      ) : (
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
            </div>
            {item.subtitle && (
              <span className="text-xs text-(--gray-4) truncate" title={item.subtitle}>
                {item.subtitle}
              </span>
            )}
          </div>

          <div className="flex-shrink-0">
            <RoleResponsibilitiesDropdown
              value={item.permissionGroupId || ""}
              onChange={() => {}}
              options={permissionGroups}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Add child button */}
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

            {item.id !== currentUserRoleId && (
              <>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center bg-(--primary) text-white rounded-8 transition-colors cursor-pointer flex-shrink-0"
                  onClick={() => onStartUpdate?.(item.id)}
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                {!hasChildren && (
                  <button
                    type="button"
                    onClick={() => onDeleteChild?.(item.id)}
                    className="w-8 h-8 flex items-center justify-center bg-destructive text-white rounded-8 transition-colors cursor-pointer flex-shrink-0"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Children + Inline Create */}
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
                    value={newPermissionGroupId}
                    onChange={setNewPermissionGroupId}
                    options={permissionGroups}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsDiscardModalOpen(true)}
                    className="px-3 py-1.5 text-sm text-[var(--gray-5)] hover:text-[var(--gray-7)] font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAction}
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
                updatingId={updatingId}
                isExpanded={expandedIds.has(child.id)}
                expandedIds={expandedIds}
                onToggleExpand={onToggleExpand}
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
      )}

      <ConfirmModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={() => {
          setIsDiscardModalOpen(false);
          onCancelAdd?.();
        }}
        title="Discard changes?"
        description="Are you sure you want to discard your changes to this role?"
        confirmLabel="Discard"
      />
    </div>
  );
};
