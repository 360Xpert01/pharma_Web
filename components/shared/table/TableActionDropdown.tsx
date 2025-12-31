"use client";

import React, { useEffect, useRef } from "react";
import { MoreVertical, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: LucideIcon;
  variant?: "default" | "danger";
  disabled?: boolean;
}

interface TableActionDropdownProps {
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
  position?: "left" | "right";
  triggerClassName?: string;
}

/**
 * Reusable action dropdown (three-dot menu) for tables
 * Handles click-outside, escape key, and z-index properly
 *
 * @example
 * const { openId, toggle, close } = useDropdownMenu();
 *
 * <TableActionDropdown
 *   isOpen={openId === item.id}
 *   onToggle={() => toggle(item.id)}
 *   items={[
 *     { label: 'Edit', onClick: () => handleEdit(item) },
 *     { label: 'Delete', onClick: () => handleDelete(item), variant: 'danger' }
 *   ]}
 * />
 */
export default function TableActionDropdown({
  items,
  isOpen,
  onToggle,
  onClose,
  position = "right",
  triggerClassName,
}: TableActionDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    item.onClick();
    onClose?.();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={cn(
          "p-2 rounded-full transition cursor-pointer text-(--gray-4) hover:text-(--gray-7) hover:bg-(--gray-1)",
          triggerClassName
        )}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden="true" />

          {/* Dropdown Menu */}
          <div
            className={cn(
              "absolute top-10 mt-2 w-48 rounded-lg shadow-lg z-50 bg-[var(--background)] border border-(--gray-2)",
              position === "right" ? "right-0" : "left-0"
            )}
            role="menu"
          >
            <div className="py-1">
              {items.map((item, index) => {
                const Icon = item.icon;
                const isDisabled = item.disabled;
                const isDanger = item.variant === "danger";

                return (
                  <button
                    key={index}
                    onClick={() => handleItemClick(item)}
                    disabled={isDisabled}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm cursor-pointer transition flex items-center gap-2",
                      isDisabled && "opacity-50 cursor-not-allowed",
                      !isDisabled && !isDanger && "text-(--gray-7) hover:bg-(--gray-1)",
                      !isDisabled && isDanger && "text-(--destructive) hover:bg-(--destructive-0)"
                    )}
                    role="menuitem"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
