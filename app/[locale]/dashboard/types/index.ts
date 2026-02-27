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
  description: string;
}

export interface DashboardProps {
  isLoading?: boolean;
  data?: {
    metrics?: MetricData;
    users?: User[];
    products?: Product[];
    orders?: Order[];
  };
  idForm?: string;
  sample: string;
  descrip: string;
  table?: string;
  hideHeader?: boolean;
  hideMetrics?: boolean;
  hideData?: boolean;
  btnAdd?: string;
  btnTrue?: boolean;
  proBar?: boolean;
  settingsRoute?: string;
  btntextReq?: string;
  btnReqquest?: boolean;
  settingsRouteRequest?: string;
  btnApprovel?: boolean;
  campTabel?: boolean;
  campHeading?: string;
  filterT?: boolean;
  dataCard?: {
    title: string;
    value: number;
    valueLabel: string;
    subtitle: string;
    detailValue: string;
    progress: number;
    colorVariant: "1" | "2" | "3" | "4";
    topHcps?: any[];
  };
  doctorTable?: boolean;
  prodTabel?: boolean;
  sampleTable?: boolean;
  giveawayTable?: boolean;
  OrderCap?: boolean;
  DCRTable?: boolean;
  PlanTable?: boolean;
  ExpansTable?: boolean;
  ReqTabel?: boolean;
  channalD?: boolean;
  sampleForm?: boolean;
  GivawayForm?: boolean;
  productForm?: boolean;
  doctorForm?: boolean;
  channalTrue?: boolean;
  employeeProfileBtn?: boolean;
  candidate?: {
    name: string;
    email: string;
    phone: string;
    reportingManager: string;
    campaign: string;
    requestedMonth: string;
    channel: string;
    status: string;
    totalCalls: string;
  };
  AddemployeeBtn?: boolean;
  UserRoleTable?: boolean;
  AddCallPointTrue?: boolean;
  teamFormTabel?: boolean;
  setTargetlist?: boolean;
  updateTargetlist?: boolean;
  ActiveOn?: boolean;
  UpdateEmp?: boolean;
  employeeId?: string | null;
  prefixPro?: boolean;
  targetListView?: boolean;
  showTabs?: boolean;
  allocateGiveaways?: boolean;
  AddAllocateGiveaway?: boolean;
  UpdateAllocation?: boolean;
  bricksHierarchy?: boolean;
  roleHierarchy?: boolean;
  allocatedGiveawaysTable?: boolean;
  productCategoriesD?: boolean;
  productCategoriesTrue?: boolean;
  specializationsD?: boolean;
  specializationsTrue?: boolean;
  doctorDetail?: boolean;
  csvIMP?: boolean;
  UpdateProduct?: boolean;
  productId?: string | null;
  doctorSegmentsD?: boolean;
  doctorSegmentsTrue?: boolean;
  qualificationsD?: boolean;
  qualificationsTrue?: boolean;
  distributorTypesD?: boolean;
  distributorTypesTrue?: boolean;
  specialitiesD?: boolean;
  specialitiesTrue?: boolean;
  UpdateGiveaway?: boolean;
  giveawayId?: string | null;
  id?: string | null;
  UpdateDoctor?: boolean;
  partyId?: string | null;
  channelId?: string | null;
  productDetailBtn?: boolean;
  giveawayDetail?: boolean;
  pulseAddBtn?: boolean;
  territoryConflicts?: boolean;
  territoryTable?: boolean;
  territoryForm?: boolean;
  onAddClick?: () => void;
}
