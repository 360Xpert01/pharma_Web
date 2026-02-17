/**
 * Territory Module - Index
 * Exports all territory-related slices and types
 */

// Export all slices
export { default as allTerritoriesReducer } from "./getAllTerritoriesSlice";
export { default as territoryByIdReducer } from "./getTerritoryByIdSlice";
export { default as createTerritoryReducer } from "./createTerritorySlice";
export { default as updateTerritoryReducer } from "./updateTerritorySlice";
export { default as deleteTerritoryReducer } from "./deleteTerritorySlice";

// Export actions
export { getAllTerritories, resetTerritoriesState } from "./getAllTerritoriesSlice";
export { getTerritoryById, resetTerritoryByIdState } from "./getTerritoryByIdSlice";
export { createTerritory, resetCreateTerritoryState } from "./createTerritorySlice";
export { updateTerritory, resetUpdateTerritoryState } from "./updateTerritorySlice";
export { deleteTerritory, resetDeleteTerritoryState } from "./deleteTerritorySlice";

// Export types
export type {
  TerritoryItem,
  Pagination,
  TerritoryListResponse,
  TerritoryDetailResponse,
  TerritoryCreateUpdateResponse,
  TerritoryDeleteResponse,
  CreateTerritoryPayload,
  UpdateTerritoryPayload,
  GetTerritoriesParams,
} from "./types";

export type { TerritoriesState } from "./getAllTerritoriesSlice";
export type { TerritoryByIdState } from "./getTerritoryByIdSlice";
export type { CreateTerritoryState } from "./createTerritorySlice";
export type { UpdateTerritoryState } from "./updateTerritorySlice";
export type { DeleteTerritoryState } from "./deleteTerritorySlice";
