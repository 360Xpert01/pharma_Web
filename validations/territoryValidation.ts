import { z } from "zod";

export const territorySchema = z.object({
  pulseCode: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  bricks: z.array(z.string()).min(1, "At least one brick is required"),
});

export type TerritorySchema = z.infer<typeof territorySchema>;
