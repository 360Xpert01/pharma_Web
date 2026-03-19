"use client";

import { useState, useEffect } from "react";
import RoleHierarchy from "@/components/RoleHierarchy";
import { RoleLevel } from "@/lib/role-utils";
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
import { getAllPermissionGroups } from "@/store/slices/permissionGroup/getAllPermissionGroupsSlice";
import toast from "react-hot-toast";
import { ConfirmModal } from "@/components/shared/confirm-modal";

// Helper function to build hierarchy from flat role list
const buildRoleHierarchy = (roles: any[]) => {
  const roleMap = new Map();
  const rootRoles: any[] = [];

  const getRoleType = (role: any, roleMap: Map<string, any>): RoleLevel => {
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
      ...role, // Keep original data if needed
      id: role.id,
      name: role.roleName,
      subtitle: role.pulseCode,
      pulseCode: role.pulseCode,
      permissionGroupId: role.permissionGroupId,
      assignedUsersCount: role.assignedUsersCount,
      children: [],
    });
  });

  roles.forEach((role) => {
    const roleNode = roleMap.get(role.id);
    roleNode.type = getRoleType(role, roleMap);
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

  // Confirmation state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [updateConfirmData, setUpdateConfirmData] = useState<{
    id: string;
    name: string;
    permissionGroupId?: string;
  } | null>(null);

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
  const verifyOtp = useAppSelector((state: any) => state.verifyOtp);
  const {
    loading: groupsLoading,
    permissionGroups,
    error: groupsError,
  } = useAppSelector((state) => state.allPermissionGroups);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllRoles({ pagination: false }));
    dispatch(getAllPermissionGroups());
  }, [dispatch]);

  useEffect(() => {
    const handleAddRoot = () => {
      setAddingId("root");
      // dispatch(generatePrefix({ entity: "Role" })); // Removed as requested
    };
    window.addEventListener("roles:add-root", handleAddRoot);
    return () => window.removeEventListener("roles:add-root", handleAddRoot);
  }, [dispatch]);

  useEffect(() => {
    if (createSuccess) {
      toast.success(createMessage || "Role created successfully!");
      dispatch(getAllRoles({ pagination: false }));
      dispatch(resetRoleState());
      setAddingId(null);
    }
    if (createError) {
      dispatch(resetRoleState());
    }
  }, [createSuccess, createMessage, createError, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success(updateMessage || "Role updated successfully!");
      dispatch(getAllRoles({ pagination: false }));
      dispatch(resetUpdateRoleState());
      setUpdatingId(null);
    }
    if (updateError) {
      const friendlyError = updateError.replace(/permissionGroupId/gi, "permission");
      toast.error(friendlyError);
      dispatch(resetUpdateRoleState());
    }
  }, [updateSuccess, updateMessage, updateError, dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(deleteMessage || "Role deleted successfully!");
      dispatch(getAllRoles({ pagination: false }));
      dispatch(resetDeleteRoleState());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(resetDeleteRoleState());
    }
  }, [deleteSuccess, deleteMessage, deleteError, dispatch]);

  const handleAddChild = (parentId: string, childType: string) => {
    setAddingId(parentId);
    // dispatch(generatePrefix({ entity: "Role" })); // Removed as requested
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
    permissionGroupId?: string
  ) => {
    const finalPulseCode = pulseCode || undefined;
    await dispatch(
      createRole({
        roleName: name,
        pulseCode: finalPulseCode,
        parentRoleId: parentId === "root" ? undefined : parentId,
        permissionGroupId,
      })
    );
  };

  const handleUpdateChild = async (id: string, name: string, permissionGroupId?: string) => {
    // Show confirmation dialog instead of immediate update
    setUpdateConfirmData({ id, name, permissionGroupId });
  };

  const handleConfirmUpdate = async () => {
    if (!updateConfirmData) return;
    const { id, name, permissionGroupId } = updateConfirmData;
    await dispatch(
      updateRole({
        id,
        payload: {
          roleName: name,
          permissionGroupId,
        },
      })
    );
    setUpdateConfirmData(null);
  };

  const handleStartUpdate = (id: string) => {
    setUpdatingId(id);
    setAddingId(null);
  };

  const handleDeleteChild = async (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await dispatch(deleteRole(deleteConfirmId));
      setDeleteConfirmId(null);
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
        permissionGroups={permissionGroups}
        loading={loading || creating || updating || deleting || groupsLoading}
        error={error || groupsError}
        addingId={addingId}
        updatingId={updatingId}
        onAddChild={handleAddChild}
        onCancelAdd={handleCancelAdd}
        onCreateChild={handleCreateChild}
        onUpdateChild={handleUpdateChild}
        onDeleteChild={handleDeleteChild}
        onMoreOptions={handleMoreOptions}
        onStartUpdate={handleStartUpdate}
        currentUserRoleId={user?.roleId || verifyOtp?.user?.roleId}
        currentUserPermissionGroupId={user?.permissionGroupId || verifyOtp?.permissionGroupId}
      />

      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Role?"
        description={`This role is currently assigned to ${
          roles.find((r) => r.id === deleteConfirmId)?.assignedUsersCount || 0
        } users. Are you sure you want to delete it?`}
        confirmLabel="Delete"
        loading={deleting}
      />

      <ConfirmModal
        isOpen={!!updateConfirmData}
        onClose={() => setUpdateConfirmData(null)}
        onConfirm={handleConfirmUpdate}
        title="Update Role?"
        description={`Updating this role will impact ${
          roles.find((r) => r.id === updateConfirmData?.id)?.assignedUsersCount || 0
        } users currently assigned to it. Are you sure you want to proceed?`}
        confirmLabel="Update"
        loading={updating}
      />
    </div>
  );
}
