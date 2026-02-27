"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const ROLE_RESPONSIBILITIES = [
  "Administrator",
  "C-Suite",
  "Manager",
  "Sales Representative",
] as const;

export type RoleResponsibility = (typeof ROLE_RESPONSIBILITIES)[number];

interface RoleResponsibilitiesDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const getResponsibilityStyles = (val: string) => {
  switch (val) {
    case "Administrator":
      return "bg-[#E0CCFF] text-[#6B21A8] border-[#D8B4FE]"; // Purple
    case "C-Suite":
      return "bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]"; // Green
    case "Manager":
      return "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]"; // Red/Pink
    case "Sales Representative":
      return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]"; // Yellow
    default:
      return "bg-[var(--background)] border-[var(--gray-2)] text-[var(--gray-9)]";
  }
};

const RoleResponsibilitiesDropdown: React.FC<RoleResponsibilitiesDropdownProps> = ({
  value,
  onChange,
  placeholder = "Choses Role Responsibilities",
  disabled = false,
  readOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const updatePos = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        portalRef.current &&
        !portalRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on scroll to avoid stale position
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsOpen(false);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled || readOnly) return;
    updatePos();
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (role: string) => {
    onChange(role);
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "flex items-center gap-2 px-4 py-2 border rounded-8 transition-all min-w-[220px] justify-between",
          getResponsibilityStyles(value),
          disabled || readOnly ? "opacity-70 cursor-default" : "cursor-pointer"
        )}
      >
        <span className={cn("text-sm truncate font-medium")}>{value || placeholder}</span>
        {!readOnly && (
          <ChevronDown
            className={cn(
              "w-4 h-4 flex-shrink-0 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={portalRef}
            className="bg-[var(--background)] border border-[var(--gray-2)] rounded-8 py-1"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: pos.width,
              zIndex: 99999,
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            }}
          >
            {ROLE_RESPONSIBILITIES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleSelect(role)}
                className={cn(
                  "w-full px-4 py-2.5 text-sm text-left transition-colors cursor-pointer",
                  value === role
                    ? "bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                    : "text-[var(--gray-7)] hover:bg-[var(--gray-1)]"
                )}
              >
                {role}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default RoleResponsibilitiesDropdown;
