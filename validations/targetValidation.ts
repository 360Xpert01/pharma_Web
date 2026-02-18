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

export const brickAllocationSchema = z
  .object({
    brickId: z.string().uuid("Invalid Brick ID format"),
    allocations: z
      .array(
        z.object({
          territoryId: z.string().uuid("Invalid Territory ID format"),
          percentage: z.number().min(0).max(100),
        })
      )
      .min(1, "At least one allocation is required"),
  })
  .refine(
    (data) => {
      const sum = data.allocations.reduce((acc, curr) => acc + curr.percentage, 0);
      return sum === 100;
    },
    {
      message: "Total percentage for this brick must be 100%",
      path: ["allocations"],
    }
  );

export const conflictResolutionSchema = z.object({
  teamId: z.string().uuid("Invalid Team ID format"),
  bricks: z.array(brickAllocationSchema).min(1, "At least one brick must be resolved"),
});

export type TargetValidationType = z.infer<typeof targetSchema>;
export type UpdateTargetValidationType = z.infer<typeof updateTargetSchema>;
export type ConflictResolutionValidationType = z.infer<typeof conflictResolutionSchema>;
