import { Globe, Building2, Users, User } from "lucide-react";
import { RoleLevel } from "@/lib/role-utils";
import { RoleItem } from "./types";

export const getTypeIcon = (type: RoleLevel) => {
  switch (type) {
    case "company":
      return Globe;
    case "department":
      return Building2;
    case "position":
      return Users;
    case "role":
      return User;
    default:
      return User;
  }
};

export const getTypeStyles = (type: RoleLevel) => {
  switch (type) {
    case "company":
      return "bg-[var(--chart-4)] text-[var(--light)]";
    case "department":
      return "bg-[var(--primary)] text-[var(--light)]";
    case "position":
      return "bg-[var(--warning)] text-[var(--light)]";
    case "role":
      return "bg-[var(--success)] text-[var(--light)]";
    default:
      return "bg-[var(--primary)] text-[var(--light)]";
  }
};

// Helper function to build hierarchy from flat role list
export const buildRoleHierarchy = (roles: any[]): RoleItem[] => {
  const roleMap = new Map<string, RoleItem>();
  const rootRoles: RoleItem[] = [];

  const getRoleType = (role: any, roleMap: Map<string, RoleItem>): RoleLevel => {
    let level = 0;
    let currentRole = role;
    while (currentRole.parentRoleId) {
      level++;
      currentRole = roleMap.get(currentRole.parentRoleId);
      if (!currentRole) break;
    }
    if (level === 0) return "company";
    if (level === 1) return "department";
    if (level === 2) return "position";
    return "role";
  };

  roles.forEach((role) => {
    roleMap.set(role.id, {
      ...role,
      id: role.id,
      name: role.roleName,
      subtitle: role.pulseCode,
      pulseCode: role.pulseCode,
      permissionGroupId: role.permissionGroupId,
      userCount: role.userCount,
      children: [],
    });
  });

  roles.forEach((role) => {
    const roleNode = roleMap.get(role.id);
    if (!roleNode) return;

    roleNode.type = getRoleType(role, roleMap);
    if (role.parentRoleId && roleMap.has(role.parentRoleId)) {
      const parentNode = roleMap.get(role.parentRoleId);
      if (parentNode && parentNode.children) {
        parentNode.children.push(roleNode);
      }
    } else {
      rootRoles.push(roleNode);
    }
  });

  return rootRoles;
};
