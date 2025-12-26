import { z } from "zod";

// Channel Creation Schema
export const channelCreationSchema = z.object({
  // Required fields
  name: z
    .string()
    .min(1, { message: "Channel name is required" })
    .min(2, { message: "Channel name must be at least 2 characters long" })
    .max(100, { message: "Channel name cannot exceed 100 characters" })
    .transform((val) => val.trim()),

  pulseCode: z
    .string()
    .min(1, { message: "Pulse code is required" })
    .max(100, { message: "Pulse code cannot exceed 100 characters" }),

  isActive: z.boolean().default(true),

  // Optional fields
  legacyCode: z
    .string()
    .max(100, { message: "Legacy code cannot exceed 100 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),
});

export type ChannelCreationFormValues = z.infer<typeof channelCreationSchema>;
