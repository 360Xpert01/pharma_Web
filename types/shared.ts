// Shared types used across multiple modules - only truly common ones

// Sort and filter interfaces (used in dashboard and data tables)
export type SortDirection = "asc" | "desc" | null;

export interface FilterOption {
  label: string;
  value: any;
}

// Table/Data display interfaces (used in dashboard and shared components)
export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
