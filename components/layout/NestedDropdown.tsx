// src/components/NestedDropdown.tsx
"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

type Props = {
  item: NavItem;
  depth?: number;
  openDropdown: string | null;
  setOpenDropdown: (v: string | null) => void;
};

export function NestedDropdown({ item, depth = 0, openDropdown, setOpenDropdown }: Props) {
  const hasChildren = !!item.children?.length;
  const isOpen = openDropdown === `${item.label}-${depth}`;

  const toggle = () => {
    setOpenDropdown(isOpen ? null : `${item.label}-${depth}`);
  };

  return (
    <div className="relative">
      {/* Trigger: Button (if has children) or Link */}
      {hasChildren ? (
        <button
          onClick={toggle}
          className={`
            flex w-full items-center justify-between px-3 py-2 text-sm font-medium
            text-(--gray-7) hover:bg-(--gray-0) rounded transition-colors
            ${depth > 0 ? "pl-8" : ""}
          `}
        >
          <span>{item.label}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      ) : (
        <Link
          href={item.href!}
          className={`
            block px-3 py-2 text-sm text-(--gray-7) hover:bg-(--gray-0) rounded transition-colors
            ${depth > 0 ? "pl-8" : ""}
          `}
        >
          {item.label}
        </Link>
      )}

      {/* Dropdown Menu */}
      {hasChildren && isOpen && (
        <div
          className={`
            ${depth === 0 ? "absolute top-full left-0 mt-1 w-56" : "left-full top-0 ml-1 w-56"}
            bg-(--background) rounded-8 shadow-soft border border-(--gray-2) py-1 z-50
          `}
        >
          {item.children!.map((child, idx) => (
            <NestedDropdown
              key={idx}
              item={child}
              depth={depth + 1}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
        </div>
      )}
    </div>
  );
}
