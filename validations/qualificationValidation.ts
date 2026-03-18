import { z } from "zod";

// Qualification Creation Schema
export const qualificationCreationSchema = z.object({
  // Required fields
  name: z
    .string()
    .min(1, { message: "Qualification name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must not exceed 100 characters" })
    .transform((val) => val.trim()),

  pulseCode: z
    .string()
    .max(50, { message: "Pulse code must not exceed 50 characters" })
    .optional()
    .or(z.literal("")),

  status: z.enum(["active", "inactive"], {
    errorMap: () => ({ message: "Status must be either 'active' or 'inactive'" }),
  }),
});

export type QualificationCreationFormValues = z.infer<typeof qualificationCreationSchema>;
