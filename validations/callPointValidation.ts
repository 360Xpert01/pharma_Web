import { z } from "zod";

// Call Point Creation Schema
export const callPointCreationSchema = z.object({
  // Required fields
  name: z
    .string()
    .min(1, { message: "Call point name is required" })
    .min(2, { message: "Call point name must be at least 2 characters long" })
    .max(100, { message: "Call point name cannot exceed 100 characters" })
    .transform((val) => val.trim()),

  pulseCode: z
    .string()
    .min(1, { message: "Pulse code is required" })
    .max(100, { message: "Pulse code cannot exceed 100 characters" }),

  latitude: z
    .number()
    .min(-90, { message: "Latitude must be between -90 and 90" })
    .max(90, { message: "Latitude must be between -90 and 90" })
    .refine((val) => !isNaN(val), { message: "Latitude must be a valid number" }),

  longitude: z
    .number()
    .min(-180, { message: "Longitude must be between -180 and 180" })
    .max(180, { message: "Longitude must be between -180 and 180" })
    .refine((val) => !isNaN(val), { message: "Longitude must be a valid number" }),

  isActive: z.boolean().default(true),

  // Optional fields
  legacyCode: z
    .string()
    .max(100, { message: "Legacy code cannot exceed 100 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),
});

export type CallPointCreationFormValues = z.infer<typeof callPointCreationSchema>;
