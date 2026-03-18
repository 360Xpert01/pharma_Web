import { z } from "zod";

// Role Creation Schema
export const roleCreationSchema = z.object({
  // Required fields
  roleName: z
    .string()
    .min(1, { message: "Role name is required" })
    .min(2, { message: "Role name must be at least 2 characters long" })
    .max(100, { message: "Role name cannot exceed 100 characters" })
    .transform((val) => val.trim()),

  pulseCode: z.string().max(100, { message: "Pulse code cannot exceed 100 characters" }).optional(),
});

export type RoleCreationFormValues = z.infer<typeof roleCreationSchema>;
