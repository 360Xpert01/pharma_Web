export type User = {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
};
