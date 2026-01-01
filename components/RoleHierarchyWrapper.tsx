"use client";

import { useEffect } from "react";
import { RoleHierarchy } from "@/components/RoleHierarchy";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";

// Helper function to build hierarchy from flat role list
const buildRoleHierarchy = (roles: any[]) => {
  // Transform roles into hierarchy structure
  const roleMap = new Map();
  const rootRoles: any[] = [];

  // Determine role type based on hierarchy level
  const getRoleType = (role: any, allRoles: any[]): any => {
    // Count levels: root -> company, level 1 -> department, level 2 -> position, level 3+ -> role
    let level = 0;
    let currentRole = role;

    while (currentRole.parentRoleId) {
      level++;
      currentRole = allRoles.find((r) => r.id === currentRole.parentRoleId);
      if (!currentRole) break;
    }

    if (level === 0) return "company";
    if (level === 1) return "department";
    if (level === 2) return "position";
    return "role";
  };

  // First pass: create map of all roles with proper types
  roles.forEach((role) => {
    const roleType = getRoleType(role, roles);
    roleMap.set(role.id, {
      id: role.id,
      name: role.roleName,
      subtitle: role.pulseCode || role.legacyCode,
      type: roleType,
      responsibilities: "",
      children: [],
    });
  });

  // Second pass: build hierarchy
  roles.forEach((role) => {
    const roleNode = roleMap.get(role.id);
    if (role.parentRoleId && roleMap.has(role.parentRoleId)) {
      const parent = roleMap.get(role.parentRoleId);
      parent.children.push(roleNode);
    } else {
      rootRoles.push(roleNode);
    }
  });

  return rootRoles;
};

export default function RoleHierarchyWrapper() {
  const dispatch = useAppDispatch();

  // Select state from Redux store
  const { loading, error, roles } = useAppSelector((state) => state.allRoles);

  // Fetch roles on mount
  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const handleAddChild = (parentId: string, childType: string) => {
    console.log("Add child to:", parentId, "Type:", childType);
    // TODO: Implement add child logic here
    // dispatch(addRole({ parentId, childType }));
  };

  const handleMoreOptions = (itemId: string, itemType: string) => {
    console.log("More options for:", itemId, "Type:", itemType);
    // TODO: Implement more options logic here
    // This could open a modal or dropdown with edit/delete options
  };

  // Build hierarchy from flat roles list
  const hierarchyData = buildRoleHierarchy(roles);

  return (
    <div className="shadow-soft">
      <RoleHierarchy
        data={hierarchyData}
        onAddChild={handleAddChild}
        onMoreOptions={handleMoreOptions}
      />
    </div>
  );
}
