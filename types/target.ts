// Target-related type definitions

export interface ProductTarget {
  id: string;
  productName: string;
  targetPackets: number;
  achievedPackets: number;
  achievementPercentage: number;
  status: "pending" | "in-progress" | "completed";
}

export interface EmployeeTarget {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeRole: string;
  profilePicture?: string;
  teamName: string;
  channelName: string;
  lineManager: string;
  month: string; // e.g., "January", "February"
  year: number;
  products: ProductTarget[];
  tags?: string[]; // e.g., ["L43", "L02", "E74"]
}

export interface TargetListResponse {
  success: boolean;
  message?: string;
  data: EmployeeTarget[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GroupedTargets {
  [month: string]: EmployeeTarget[];
}

// Target Creation API Types
export interface ProductTargetInput {
  productSkuId: string;
  targetValue: number;
}

export interface UserTargetInput {
  userId: string;
  productTargets: ProductTargetInput[];
}

export interface CreateTargetPayload {
  teamId: string;
  month: number;
  year: number;
  targets: UserTargetInput[];
}

export interface CreateTargetResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Target Detail API Types
export interface TargetDetailData {
  id?: string;
  targetId?: string;
  teamId?: string;
  team?: {
    id: string;
    name: string;
  };
  teamName?: string;
  month?: number;
  targetMonth?: number;
  year?: number;
  targetYear?: number;
  targets?: UserTargetInput[];
  products?: Array<{
    productSkuId?: string;
    id?: string;
    skuId?: string;
    targetValue?: number;
    targetPackets?: number;
  }>;
}

export interface TargetDetailResponse {
  success: boolean;
  message?: string;
  data: TargetDetailData;
}

// Update Target API Types
export interface UpdateTargetPayload {
  targets: UserTargetInput[];
}

export interface UpdateTargetResponse {
  success: boolean;
  message: string;
  data?: any;
}
