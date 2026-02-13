import { z } from "zod";

export const skuAllocationSchema = z.object({
  productSkuId: z.string().uuid("Invalid SKU ID format"),
  targetValue: z.number().min(0, "Target value must be a non-negative number"),
  percentage: z.number().min(0).max(100).default(100),
});

export const brickAllocationSchema = z.object({
  brickId: z.string().uuid("Invalid Brick ID format"),
  skuAllocations: z.array(skuAllocationSchema).min(1, "At least one SKU allocation is required"),
});

export const userAllocationSchema = z.object({
  userId: z.string().uuid("Invalid User ID format"),
  brickAllocations: z
    .array(brickAllocationSchema)
    .min(1, "At least one brick allocation is required"),
});

export const targetSchema = z.object({
  teamId: z.string().uuid("Invalid Team ID format"),
  month: z
    .number()
    .int()
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  year: z.number().int().min(2000, "Year must be at least 2000"),
  allocations: z.array(userAllocationSchema).min(1, "At least one user allocation is required"),
});

export type TargetValidationType = z.infer<typeof targetSchema>;
