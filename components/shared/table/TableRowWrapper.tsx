"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TableRowWrapperProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "card" | "compact";
  isHoverable?: boolean;
  isClickable?: boolean;
}

/**
 * Unified wrapper for table rows with consistent spacing and styling
 * Solves the background/spacing consistency issue across all tables
 *
 * @example
 * <TableRowWrapper variant="card">
 *   <div>Row content here</div>
 * </TableRowWrapper>
 *
 * @example
 * <TableRowWrapper variant="card" isClickable onClick={handleClick}>
 *   <div>Clickable row</div>
 * </TableRowWrapper>
 */
export default function TableRowWrapper({
  children,
  onClick,
  className,
  variant = "card",
  isHoverable = true,
  isClickable = false,
}: TableRowWrapperProps) {
  const baseClasses = "transition-colors";

  const variantClasses = {
    default: "px-3 py-1",
    card: "px-3 py-1",
    compact: "px-2 py-0.5",
  };

  const hoverClasses = isHoverable ? "hover:bg-(--gray-0)" : "";
  const cursorClasses = isClickable || onClick ? "cursor-pointer" : "";

  return (
    <div
      onClick={onClick}
      className={cn(baseClasses, variantClasses[variant], hoverClasses, cursorClasses, className)}
    >
      <div className="w-full bg-[var(--background)] rounded-8 p-4 border border-(--gray-2)">
        {children}
      </div>
    </div>
  );
}
