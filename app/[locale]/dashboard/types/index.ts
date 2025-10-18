export interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  role: string;
  createdAt: string;
  lastLogin: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  date: string;
  status: "completed" | "processing" | "cancelled";
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "completed" | "processing" | "pending" | "cancelled";
  date: string;
}

export interface MetricData {
  totalUsers: number;
  activeSessions: number;
  revenue: number;
  conversionRate: number;
  orders: number;
  growth: number;
  bounceRate: number;
  pageViews: number;
}

export interface ChartDataPoint {
  month?: string;
  revenue?: number;
  users?: number;
  orders?: number;
  product?: string;
  sales?: number;
  profit?: number;
  name?: string;
  value?: number;
  color?: string;
  time?: string;
  active?: number;
}

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface FilterOption {
  label: string;
  value: any;
}

export interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: TableColumn<T>[];
  icon?: React.ComponentType<any>;
  searchKey?: keyof T;
  filterOptions?: {
    key: keyof T;
    options: FilterOption[];
  };
  isLoading?: boolean;
}

export interface DashboardProps {
  isLoading?: boolean;
  data?: {
    metrics?: MetricData;
    users?: User[];
    products?: Product[];
    orders?: Order[];
  };
}
