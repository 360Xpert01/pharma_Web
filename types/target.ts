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
