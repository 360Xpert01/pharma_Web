import { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pageSizeOptions?: number[];
  emptyMessage?: string;
  loading?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  className?: string;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface DataTableSearchParams {
  page: string;
  limit: string;
  search?: string;
  sort?: string;
  filter?: string;
}
export interface BreadcrumbItemProps {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItemProps[];
  className?: string;
  showHome?: boolean;
  homeLabel?: string;
  separator?: React.ReactNode;
  maxItems?: number;
  autoGenerate?: boolean;
}
