import { RoleLevel } from "@/lib/role-utils";
import { PermissionGroup } from "@/store/slices/permissionGroup/getAllPermissionGroupsSlice";

export interface RoleItem {
  id: string;
  name: string;
  subtitle?: string;
  type: RoleLevel;
  permissionGroupId?: string;
  pulseCode?: string;
  userCount?: number;
  children?: RoleItem[];
}

export const CHILD_TYPE_MAP: Record<RoleLevel, RoleLevel | null> = {
  company: "department",
  department: "position",
  position: "role",
  role: null,
};

export interface RoleNodeProps {
  item: RoleItem;
  level: number;
  addingId: string | null;
  updatingId: string | null;
  isExpanded: boolean;
  expandedIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onAddChild?: (parentId: string, childType: RoleLevel) => void;
  onCancelAdd?: () => void;
  onCreateChild?: (
    parentId: string,
    type: RoleLevel,
    name: string,
    pulseCode: string,
    permissionGroupId?: string
  ) => void;
  onUpdateChild?: (id: string, name: string, permissionGroupId?: string) => void;
  onDeleteChild?: (id: string) => void;
  onMoreOptions?: (itemId: string, itemType: RoleLevel) => void;
  onStartUpdate?: (id: string) => void;
  permissionGroups: PermissionGroup[];
  currentUserRoleId?: string;
  currentUserPermissionGroupId?: string;
}

export interface RootAddRowProps {
  onCreateChild?: (
    parentId: string,
    type: RoleLevel,
    name: string,
    pulseCode: string,
    permissionGroupId?: string
  ) => void;
  onCancelAdd?: () => void;
  permissionGroups: PermissionGroup[];
}

export interface RoleHierarchyProps {
  data: RoleItem[];
  loading?: boolean;
  error?: string | null;
  onAddChild?: (parentId: string, childType: RoleLevel) => void;
  onCancelAdd?: () => void;
  onCreateChild?: (
    parentId: string,
    type: RoleLevel,
    name: string,
    pulseCode: string,
    permissionGroupId?: string
  ) => void;
  onUpdateChild?: (id: string, name: string, permissionGroupId?: string) => void;
  onDeleteChild?: (id: string) => void;
  onMoreOptions?: (itemId: string, itemType: RoleLevel) => void;
  addingId?: string | null;
  updatingId?: string | null;
  onStartUpdate?: (id: string) => void;
  permissionGroups: PermissionGroup[];
  currentUserRoleId?: string;
  currentUserPermissionGroupId?: string;
}
