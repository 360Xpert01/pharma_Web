import { z } from "zod";

// Specialization Creation Schema
export const specializationCreationSchema = z.object({
  // Required fields
  name: z
    .string()
    .min(1, { message: "Specialization name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must not exceed 100 characters" })
    .transform((val) => val.trim()),

  pulseCode: z
    .string()
    .min(1, { message: "Pulse code is required" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Pulse code can only contain letters, numbers, hyphens, and underscores",
    })
    .min(2, { message: "Pulse code must be at least 2 characters" })
    .max(50, { message: "Pulse code must not exceed 50 characters" }),

  isActive: z.boolean().default(true),

  // Optional fields
  legacyCode: z
    .string()
    .max(100, { message: "Legacy code cannot exceed 100 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),
});

export type SpecializationCreationFormValues = z.infer<typeof specializationCreationSchema>;
