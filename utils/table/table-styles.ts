/**
 * Centralized table styling constants
 *
 * IMPORTANT: Change these values to update ALL tables at once
 * This solves the issue you just experienced with bg-[var(--background)]
 *
 * Usage:
 * import { TABLE_STYLES } from "@/utils/table/table-styles"
 * <div className={TABLE_STYLES.ROW_WRAPPER}>...</div>
 */

export const TABLE_STYLES = {
  // Row wrapper styles
  ROW_WRAPPER: "px-3 py-1 hover:bg-(--gray-0) transition-colors",
  ROW_WRAPPER_COMPACT: "px-2 py-0.5 hover:bg-(--gray-0) transition-colors",

  // Card styles (the inner content)
  CARD: "w-full bg-[var(--background)] rounded-lg p-4 border border-(--gray-2)",
  CARD_COMPACT: "w-full bg-[var(--background)] rounded-lg p-2 border border-(--gray-2)",
  CARD_LARGE: "w-full bg-[var(--background)] rounded-2xl p-6 border border-(--gray-2)",

  // Dropdown menu
  DROPDOWN_TRIGGER:
    "p-2 rounded-full transition cursor-pointer text-(--gray-4) hover:text-(--gray-7) hover:bg-(--gray-1)",
  DROPDOWN_MENU:
    "absolute right-0 top-10 mt-2 w-48 rounded-lg shadow-lg z-50 bg-[var(--background)] border border-(--gray-2)",
  DROPDOWN_ITEM:
    "w-full text-left px-4 py-2 text-sm cursor-pointer transition text-(--gray-7) hover:bg-(--gray-1)",
  DROPDOWN_ITEM_DANGER:
    "w-full text-left px-4 py-2 text-sm cursor-pointer transition text-(--destructive) hover:bg-(--destructive-0)",

  // Container styles
  TABLE_CONTAINER: "w-full overflow-hidden bg-[var(--background)]",
  TABLE_WRAPPER: "rounded-md p-3 shadow-[0px_5px_10px_rgba(0,0,0,0.20)] bg-[var(--background)]",

  // Status badges
  STATUS_ACTIVE: "px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-(--success)",
  STATUS_INACTIVE: "px-3 py-1 rounded-full text-sm font-medium bg-(--gray-1) text-(--gray-6)",
  STATUS_PENDING: "px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700",

  // Loading states
  LOADING_SPINNER:
    "inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-(--primary) border-r-transparent",
  LOADING_TEXT: "mt-4 text-[var(--gray-6)]",

  // Empty/Error states
  EMPTY_ICON_WRAPPER:
    "mx-auto w-16 h-16 rounded-full bg-(--gray-1) flex items-center justify-center mb-4",
  ERROR_ICON_WRAPPER:
    "mx-auto w-12 h-12 rounded-full bg-(--destructive-0) flex items-center justify-center mb-4",

  // Action buttons
  PRIMARY_BUTTON:
    "px-4 py-2 bg-(--primary) text-[var(--light)] rounded-lg hover:bg-(--primary-2) transition cursor-pointer font-medium",
  SECONDARY_BUTTON:
    "px-4 py-2 bg-(--gray-1) text-(--gray-9) rounded-lg hover:bg-(--gray-2) transition cursor-pointer font-medium",
  DANGER_BUTTON:
    "px-4 py-2 bg-(--destructive) text-[var(--light)] rounded-lg hover:bg-(--destructive)/90 transition cursor-pointer font-medium",
} as const;

/**
 * Grid column configurations for different table layouts
 */
export const GRID_CONFIGS = {
  COLS_12: "grid grid-cols-12 gap-4",
  COLS_6: "grid grid-cols-6 gap-4",
  COLS_5: "grid grid-cols-5 gap-4",
  COLS_4: "grid grid-cols-4 gap-4",
  FLEX_ROW: "flex items-center gap-4",
} as const;

/**
 * Common text styles
 */
export const TEXT_STYLES = {
  LABEL: "text-sm font-medium text-(--gray-6)",
  VALUE: "text-sm font-semibold text-(--gray-9)",
  PULSE_CODE: "font-mono text-sm text-(--gray-6)",
  TITLE: "text-lg font-bold text-(--gray-9)",
} as const;
