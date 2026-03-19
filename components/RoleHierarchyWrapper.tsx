"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import { updateRole } from "@/store/slices/role/updateRoleSlice";
import { deleteRole } from "@/store/slices/role/deleteRoleSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { getAllPermissionGroups } from "@/store/slices/permissionGroup/getAllPermissionGroupsSlice";
import { usePermission } from "@/hooks/usePermission";
import toast from "react-hot-toast";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import { RoleHierarchy } from "./RoleHierarchy";
import { buildRoleHierarchy } from "./role-hierarchy/utils";
import { RoleLevel } from "@/lib/role-utils";
import { createRole } from "@/store/slices/role/addRole";

export const RoleHierarchyWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roles, loading, error } = useAppSelector((state) => state.allRoles);
  const {
    permissionGroups,
    loading: groupsLoading,
    error: groupsError,
  } = useAppSelector((state) => state.allPermissionGroups);
  const { loading: creating } = useAppSelector((state) => state.addRole);
  const { loading: updating } = useAppSelector((state) => state.updateRole);
  const { loading: deleting } = useAppSelector((state) => state.deleteRole);
  const { prefix } = useAppSelector((state) => state.generatePrefix);

  const [addingId, setAddingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [updateConfirmData, setUpdateConfirmData] = useState<{
    id: string;
    name: string;
    permissionGroupId?: string;
  } | null>(null);

  useEffect(() => {
    dispatch(getAllRoles({ pagination: false }));
    dispatch(getAllPermissionGroups());
  }, [dispatch]);

  useEffect(() => {
    const handleAddRoot = () => {
      setAddingId("root");
      dispatch(generatePrefix({ type: "company" }));
    };
    window.addEventListener("roles:add-root", handleAddRoot);
    return () => window.removeEventListener("roles:add-root", handleAddRoot);
  }, [dispatch]);

  const handleAddChild = (parentId: string, childType: RoleLevel) => {
    setAddingId(parentId);
    dispatch(generatePrefix({ type: childType }));
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
    try {
      const result = await dispatch(
        createRole({
          roleName: name,
          pulseCode: prefix || pulseCode,
          parentRoleId: parentId === "root" ? undefined : parentId,
          permissionGroupId,
          status: "active",
        })
      ).unwrap();

      if (result) {
        toast.success("Role created successfully");
        setAddingId(null);
        dispatch(resetGeneratePrefixState());
        dispatch(getAllRoles({ pagination: false }));
      }
    } catch (err: any) {
      toast.error(err || "Failed to create role");
    }
  };

  const handleStartUpdate = (id: string) => {
    setUpdatingId(id);
  };

  const handleUpdateChild = async (id: string, name: string, permissionGroupId?: string) => {
    // Check if the role is assigned to users and show warning
    const role = roles.find((r) => r.id === id);
    if (role && (role.userCount || 0) > 0) {
      setUpdateConfirmData({ id, name, permissionGroupId });
    } else {
      executeUpdate(id, name, permissionGroupId);
    }
  };

  const executeUpdate = async (id: string, name: string, permissionGroupId?: string) => {
    try {
      const result = await dispatch(
        updateRole({
          id,
          roleName: name,
          permissionGroupId,
        })
      ).unwrap();

      if (result) {
        toast.success("Role updated successfully");
        setUpdatingId(null);
        setUpdateConfirmData(null);
        dispatch(getAllRoles({ pagination: false }));
      }
    } catch (err: any) {
      const errorMessage = typeof err === "string" ? err : err?.message || "Failed to update role";
      const friendlyError = errorMessage.replace(/permissionGroupId/gi, "permission");
      toast.error(friendlyError);
    }
  };

  const handleDeleteChild = (id: string) => {
    setDeleteConfirmId(id);
  };

  const executeDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const result = await dispatch(deleteRole(deleteConfirmId)).unwrap();
      if (result) {
        toast.success("Role deleted successfully");
        setDeleteConfirmId(null);
        dispatch(getAllRoles({ pagination: false }));
      }
    } catch (err: any) {
      const errorMessage = typeof err === "string" ? err : err?.message || "Failed to delete role";
      toast.error(errorMessage);
    }
  };

  const handleMoreOptions = (id: string, type: string) => {
    console.log("More options for:", id, type);
  };

  const hierarchyData = buildRoleHierarchy(roles);

  const { roleId: currentUserRoleId, permissionGroupId: currentUserPermissionGroupId } =
    usePermission();

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
        currentUserRoleId={currentUserRoleId || undefined}
        currentUserPermissionGroupId={currentUserPermissionGroupId || undefined}
      />

      <ConfirmModal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={executeDelete}
        title="Delete Role"
        description={
          <span>
            This role is currently assigned to{" "}
            <strong className="text-(--gray-9)">
              {roles.find((r) => r.id === deleteConfirmId)?.userCount || 0}
            </strong>{" "}
            users. <br />
            <strong>Are you sure you want to delete it?</strong>
          </span>
        }
        confirmLabel="Delete"
        loading={deleting}
      />

      <ConfirmModal
        isOpen={!!updateConfirmData}
        onClose={() => setUpdateConfirmData(null)}
        onConfirm={() =>
          updateConfirmData &&
          executeUpdate(
            updateConfirmData.id,
            updateConfirmData.name,
            updateConfirmData.permissionGroupId
          )
        }
        title="Update Role"
        description={
          <span>
            Updating this role will impact{" "}
            <strong className="text-(--gray-9)">
              {roles.find((r) => r.id === updateConfirmData?.id)?.userCount || 0}
            </strong>{" "}
            users currently assigned to it. <br />
            <strong>Are you sure you want to proceed?</strong>
          </span>
        }
        confirmLabel="Update"
        loading={updating}
      />
    </div>
  );
};

export default RoleHierarchyWrapper;
