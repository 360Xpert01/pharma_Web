/**
 * Shared Table Components
 *
 * These components provide consistent UI/UX across all tables:
 * - Loading states
 * - Error states
 * - Empty states
 * - Row wrappers
 * - Action dropdowns
 *
 * Usage:
 * import { TableLoadingState, TableErrorState, TableEmptyState } from "@/components/shared/table"
 */

export { default as TableLoadingState } from "./TableLoadingState";
export { default as TableErrorState } from "./TableErrorState";
export { default as TableEmptyState } from "./TableEmptyState";
export { default as TableRowWrapper } from "./TableRowWrapper";
export { default as TableActionDropdown } from "./TableActionDropdown";
export type { DropdownItem } from "./TableActionDropdown";
