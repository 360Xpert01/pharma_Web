/**
 * Territory Types
 * Types for territory API responses and state management
 */

// Territory Item Interface
export interface TerritoryItem {
  id: string;
  pulseCode: string;
  name?: string;
  description: string;
  bricks?: Array<{
    id: string;
    name?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

// Pagination Interface
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API Response Interfaces
export interface TerritoryListResponse {
  success: boolean;
  data: TerritoryItem[];
  pagination: Pagination;
  message?: string;
}

export interface TerritoryDetailResponse {
  success: boolean;
  data: TerritoryItem;
  message?: string;
}

export interface TerritoryCreateUpdateResponse {
  success: boolean;
  data: TerritoryItem;
  message: string;
}

export interface TerritoryDeleteResponse {
  success: boolean;
  message: string;
}

// Create/Update Payload
export interface CreateTerritoryPayload {
  pulseCode: string;
  name?: string;
  description: string;
  bricks: string[]; // Array of brick IDs
}

export interface UpdateTerritoryPayload {
  id: string;
  name?: string;
  description: string;
  bricks: string[]; // Array of brick IDs
}

// API Request Params
export interface GetTerritoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  notassigned?: boolean;
}
