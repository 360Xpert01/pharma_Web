import { z } from "zod";

// Segment Creation Schema
export const segmentCreationSchema = z.object({
  // Required fields
  name: z
    .string()
    .min(1, { message: "Segment name is required" })
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

  // Optional fields
  legacyCode: z
    .string()
    .max(100, { message: "Legacy code cannot exceed 100 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),
});

export type SegmentCreationFormValues = z.infer<typeof segmentCreationSchema>;
