export type User = {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: "user" | "admin";
  permissionGroupName?: string;
  permissionGroupId?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
};
