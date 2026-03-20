import { z } from "zod";

// Team Creation Schema
export const teamCreationSchema = z
  .object({
    pulseCode: z
      .string()
      .max(100, { message: "Pulse code cannot exceed 100 characters" })
      .optional(),
    name: z
      .string()
      .min(1, { message: "Team name is required" })
      .max(100, { message: "Team name cannot exceed 100 characters" }),
    status: z.enum(["active", "inactive"], { message: "Status is required" }),
    callPointIds: z
      .array(z.string().min(1))
      .min(1, { message: "At least one call point is required" }),
    channelId: z.string().min(1, { message: "Channel is required" }),
    productIds: z.array(z.string().min(1)).min(1, { message: "At least one product is required" }),
    saleRepIds: z.array(
      z.object({
        id: z.string().min(1, { message: "Sales rep id is required" }),
        territoryId: z.string().nullable().optional(),
      })
    ),
    assProductManagerId: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.saleRepIds && data.saleRepIds.length > 0) ||
      (data.assProductManagerId && data.assProductManagerId.length > 0),
    {
      message: "At least one member is required",
      path: ["saleRepIds"],
    }
  );

export type TeamCreationFormValues = z.infer<typeof teamCreationSchema>;
