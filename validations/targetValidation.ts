import { z } from "zod";

export const productTargetSchema = z.object({
  productSkuId: z.string().uuid("Invalid SKU ID format"),
  targetValue: z.number().min(0, "Target value must be a non-negative number"),
});

export const userTargetSchema = z.object({
  userId: z.string().uuid("Invalid User ID format"),
  productTargets: z.array(productTargetSchema).min(1, "At least one product target is required"),
});

export const targetSchema = z.object({
  teamId: z.string().uuid("Invalid Team ID format"),
  month: z
    .number()
    .int()
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  year: z.number().int().min(2000, "Year must be at least 2000"),
  targets: z.array(userTargetSchema).min(1, "At least one user target is required"),
});

// Update Target Schema - Only allows modifying targetValue
export const updateTargetSchema = z.object({
  targets: z.array(userTargetSchema).min(1, "At least one user target is required"),
});

export type TargetValidationType = z.infer<typeof targetSchema>;
export type UpdateTargetValidationType = z.infer<typeof updateTargetSchema>;
