/**
 * Permission constants for Role-Based Access Control (RBAC)
 * These keys should match the values returned by the backend in the PermissionGroup flags.
 */
export const PERMISSIONS = {
  // Employee Management
  EMPLOYEE: {
    VIEW: "employee_view",
    CREATE: "employee_create",
    UPDATE: "employee_update",
    DELETE: "employee_delete",
  },
  // Role & Permission Management
  ROLES: {
    VIEW: "roles_view",
    CREATE: "roles_create",
    UPDATE: "roles_update",
    DELETE: "roles_delete",
  },
  // Team Management
  TEAM: {
    VIEW: "team_view",
    CREATE: "team_create",
    UPDATE: "team_update",
    DELETE: "team_delete",
  },
  // Territory / Brick Management
  TERRITORY: {
    VIEW: "territory_view",
    CREATE: "territory_create",
    UPDATE: "territory_update",
    DELETE: "territory_delete",
  },
  // Product Management
  PRODUCT: {
    VIEW: "product_view",
    CREATE: "product_create",
    UPDATE: "product_update",
    DELETE: "product_delete",
  },
  // Doctor Management
  DOCTOR: {
    VIEW: "doctor_view",
    CREATE: "doctor_create",
    UPDATE: "doctor_update",
    DELETE: "doctor_delete",
  },
  // Campaign Management (Teams in header)
  CAMPAIGN: {
    VIEW: "campaign_view",
    CREATE: "campaign_create",
    UPDATE: "campaign_update",
    DELETE: "campaign_delete",
  },
} as const;

export type PermissionKey = string;
