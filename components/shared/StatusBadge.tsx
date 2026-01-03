import React from "react";

export type StatusType =
  | "active"
  | "inactive"
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "processing"
  | "cancelled"
  | "Under Review"
  | "Approved"
  | "Rejected";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
  variant?: "default" | "pill";
}

/**
 * StatusBadge Component
 * A reusable status badge component with rounded-full styling
 *
 * @param status - The status to display (active, inactive, pending, etc.)
 * @param className - Additional CSS classes to apply
 * @param variant - Badge variant: "default" (rounded-8) or "pill" (rounded-full)
 *
 * @example
 * <StatusBadge status="active" />
 * <StatusBadge status="inactive" variant="pill" />
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "", variant = "pill" }) => {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, "");

  // Define status color mappings with proper CSS variable syntax
  const statusColors: Record<string, string> = {
    active: "bg-[var(--success-0)] text-[var(--success)]",
    inactive: "bg-[var(--gray-1)] text-[var(--gray-6)]",
    pending: "bg-[var(--warning-0)] text-[var(--warning)]",
    underreview: "bg-[var(--warning-0)] text-[var(--warning)]",
    approved: "bg-[var(--success-0)] text-[var(--success)]",
    rejected: "bg-[var(--destructive-0)] text-[var(--destructive)]",
    completed: "bg-[var(--success-0)] text-[var(--success)]",
    processing: "bg-[var(--primary-0)] text-[var(--primary)]",
    cancelled: "bg-[var(--destructive-0)] text-[var(--destructive)]",
  };

  // Get color classes or use default
  const colorClass = statusColors[normalizedStatus] || "bg-[var(--gray-1)] text-[var(--gray-6)]";

  // Determine border radius - use numeric value for better compatibility
  const radiusClass = variant === "pill" ? "rounded-full" : "rounded-lg";

  // Capitalize first letter of each word for display
  const displayStatus = status
    .split(/(?=[A-Z])|[\s_-]/) // Split on capital letters or separators
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <span
      className={`px-5 py-2 t-sm font-medium ${radiusClass} ${colorClass} inline-flex items-center justify-center min-w-[100px] text-center ${className}`}
      style={{ borderRadius: variant === "pill" ? "9999px" : undefined }}
    >
      {displayStatus}
    </span>
  );
};

export default StatusBadge;
