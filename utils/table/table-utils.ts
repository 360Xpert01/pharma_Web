/**
 * Common utility functions for tables
 * Provides consistent formatting and data transformation
 */

/**
 * Format date for table display
 * @example formatTableDate("2024-12-31T10:00:00Z") => "Dec 31, 2024"
 */
export function formatTableDate(date: string | Date | null | undefined): string {
  if (!date) return "N/A";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return "Invalid Date";

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format date and time for table display
 * @example formatTableDateTime("2024-12-31T10:30:00Z") => "Dec 31, 2024 10:30 AM"
 */
export function formatTableDateTime(date: string | Date | null | undefined): string {
  if (!date) return "N/A";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) return "Invalid Date";

  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get status badge className based on status value
 */
export function getStatusBadgeClass(status: string): string {
  const normalizedStatus = status.toLowerCase();

  const statusMap: Record<string, string> = {
    active: "px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-(--success)",
    inactive: "px-3 py-1 rounded-full text-sm font-medium bg-(--gray-1) text-(--gray-6)",
    pending: "px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700",
    approved: "px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-(--success)",
    rejected: "px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-(--destructive)",
  };

  return (
    statusMap[normalizedStatus] ||
    "px-3 py-1 rounded-full text-sm font-medium bg-(--gray-1) text-(--gray-6)"
  );
}

/**
 * Truncate text with ellipsis
 * @example truncateText("Long text here", 10) => "Long text..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Generate avatar URL using UI Avatars service
 * @example generateAvatarUrl("John Doe") => "https://ui-avatars.com/api/?name=John+Doe..."
 */
export function generateAvatarUrl(
  name: string,
  options?: {
    size?: number;
    background?: string;
    color?: string;
  }
): string {
  const { size = 40, background = "0EA5E9", color = "FFFFFF" } = options || {};

  const params = new URLSearchParams({
    name: name || "User",
    size: size.toString(),
    background,
    color,
    bold: "true",
  });

  return `https://ui-avatars.com/api/?${params.toString()}`;
}

/**
 * Format phone number for display
 * @example formatPhoneNumber("+923001234567") => "+92 300 123 4567"
 */
export function formatPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return "N/A";

  // Simple formatting - can be customized based on your needs
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 0) return "N/A";

  // Format: +XX XXX XXX XXXX
  if (cleaned.startsWith("92")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }

  return phone;
}

/**
 * Format currency for display
 * @example formatCurrency(1500) => "PKR 1,500"
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency: string = "PKR"
): string {
  if (amount == null) return "N/A";

  return `${currency} ${amount.toLocaleString()}`;
}

/**
 * Get initials from name
 * @example getInitials("John Doe") => "JD"
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return "??";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Safely get nested object value
 * @example getNestedValue({ user: { name: "John" }}, "user.name") => "John"
 */
export function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * Safe display of value with fallback
 */
export function displayValue(value: any, fallback: string = "N/A"): string {
  return isEmpty(value) ? fallback : String(value);
}
