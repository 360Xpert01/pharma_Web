"use client";

import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import RoleResponsibilitiesDropdown from "@/components/RoleResponsibilitiesDropdown";
import { ConfirmModal } from "../shared/confirm-modal";
import { RootAddRowProps } from "./types";

export const RootAddRow: React.FC<RootAddRowProps> = ({
  onCreateChild,
  onCancelAdd,
  permissionGroups,
}) => {
  const [rootName, setRootName] = useState("");
  const [rootPermissionGroupId, setRootPermissionGroupId] = useState("");
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);

  useEffect(() => {
    setRootPermissionGroupId("");
  }, [permissionGroups]);

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
                rootPermissionGroupId || undefined
              );
            }
            if (e.key === "Escape") {
              setIsDiscardModalOpen(true);
            }
          }}
        />
      </div>
      <div className="flex-shrink-0">
        <RoleResponsibilitiesDropdown
          value={rootPermissionGroupId}
          onChange={setRootPermissionGroupId}
          options={permissionGroups}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsDiscardModalOpen(true)}
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
                rootPermissionGroupId || undefined
              );
            }
          }}
          disabled={!rootName.trim()}
          className="px-4 py-1.5 text-sm bg-[var(--primary)] text-[var(--light)] rounded-8 font-medium hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Create
        </button>
      </div>

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
