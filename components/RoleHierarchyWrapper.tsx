"use client";

import { useState, useEffect } from "react";
import { RoleHierarchy } from "@/components/RoleHierarchy";
import type { RoleLevel } from "@/components/RoleHierarchy";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import { createRole, resetRoleState } from "@/store/slices/role/addRole";
import { updateRole, resetUpdateRoleState } from "@/store/slices/role/updateRoleSlice";
import { deleteRole, resetDeleteRoleState } from "@/store/slices/role/deleteRoleSlice";
import { getRoleById, resetRoleDetailState } from "@/store/slices/role/getRoleByIdSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import toast from "react-hot-toast";

// Helper function to build hierarchy from flat role list
const buildRoleHierarchy = (roles: any[]) => {
  const roleMap = new Map();
  const rootRoles: any[] = [];

  const getRoleType = (role: any, allRoles: any[]): RoleLevel => {
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

  roles.forEach((role) => {
    roleMap.set(role.id, {
      id: role.id,
      name: role.roleName,
      subtitle: role.pulseCode || role.legacyCode,
      type: getRoleType(role, roles),
      pulseCode: role.pulseCode,
      responsibilities: role.responsibilities,
      children: [],
    });
  });

  roles.forEach((role) => {
    const roleNode = roleMap.get(role.id);
    if (role.parentRoleId && roleMap.has(role.parentRoleId)) {
      roleMap.get(role.parentRoleId).children.push(roleNode);
    } else {
      rootRoles.push(roleNode);
    }
  });

  return rootRoles;
};

export default function RoleHierarchyWrapper() {
  const dispatch = useAppDispatch();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { loading, error, roles } = useAppSelector((state) => state.allRoles);
  const {
    loading: creating,
    success: createSuccess,
    message: createMessage,
    error: createError,
  } = useAppSelector((state) => state.addRole);
  const {
    loading: updating,
    success: updateSuccess,
    message: updateMessage,
    error: updateError,
  } = useAppSelector((state) => state.updateRole);
  const {
    loading: deleting,
    success: deleteSuccess,
    message: deleteMessage,
    error: deleteError,
  } = useAppSelector((state) => state.deleteRole);
  const { generatedPrefix } = useAppSelector((state) => state.generatePrefix);

  useEffect(() => {
    dispatch(getAllRoles({ pagination: false }));
  }, [dispatch]);

  useEffect(() => {
    const handleAddRoot = () => {
      setAddingId("root");
      dispatch(generatePrefix({ entity: "Role" }));
    };
    window.addEventListener("roles:add-root", handleAddRoot);
    return () => window.removeEventListener("roles:add-root", handleAddRoot);
  }, [dispatch]);

  useEffect(() => {
    if (createSuccess) {
      toast.success(createMessage || "Role created successfully!");
      dispatch(getAllRoles());
      dispatch(resetRoleState());
      setAddingId(null);
    }
    if (createError) {
      toast.error(createError);
      dispatch(resetRoleState());
    }
  }, [createSuccess, createMessage, createError, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success(updateMessage || "Role updated successfully!");
      dispatch(getAllRoles());
      dispatch(resetUpdateRoleState());
      setUpdatingId(null);
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(resetUpdateRoleState());
    }
  }, [updateSuccess, updateMessage, updateError, dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(deleteMessage || "Role deleted successfully!");
      dispatch(getAllRoles());
      dispatch(resetDeleteRoleState());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(resetDeleteRoleState());
    }
  }, [deleteSuccess, deleteMessage, deleteError, dispatch]);

  const handleAddChild = (parentId: string, childType: string) => {
    setAddingId(parentId);
    dispatch(generatePrefix({ entity: "Role" }));
  };

  const handleCancelAdd = () => {
    setAddingId(null);
    setUpdatingId(null);
    dispatch(resetGeneratePrefixState());
  };

  const handleCreateChild = async (
    parentId: string,
    type: RoleLevel,
    name: string,
    pulseCode: string,
    responsibilities?: string
  ) => {
    const finalPulseCode = pulseCode || generatedPrefix || "";
    await dispatch(
      createRole({
        roleName: name,
        pulseCode: finalPulseCode,
        parentRoleId: parentId === "root" ? undefined : parentId,
        responsibilities,
      })
    );
  };

  const handleUpdateChild = async (id: string, name: string, responsibilities?: string) => {
    await dispatch(
      updateRole({
        id,
        payload: {
          roleName: name,
        },
      })
    );
  };

  const handleStartUpdate = (id: string) => {
    setUpdatingId(id);
    setAddingId(null);
  };

  const handleDeleteChild = async (id: string) => {
    {
      await dispatch(deleteRole(id));
    }
  };

  const handleMoreOptions = (itemId: string, itemType: string) => {
    console.log("More options for:", itemId, "Type:", itemType);
    dispatch(getRoleById(itemId));
  };

  const hierarchyData = buildRoleHierarchy(roles);

  return (
    <div className="shadow-soft bg-[var(--background)] rounded-8 p-6">
      <RoleHierarchy
        data={hierarchyData}
        loading={loading || creating || updating || deleting}
        error={error}
        addingId={addingId}
        updatingId={updatingId}
        onAddChild={handleAddChild}
        onCancelAdd={handleCancelAdd}
        onCreateChild={handleCreateChild}
        onUpdateChild={handleUpdateChild}
        onDeleteChild={handleDeleteChild}
        onMoreOptions={handleMoreOptions}
        onStartUpdate={handleStartUpdate}
      />
    </div>
  );
}
