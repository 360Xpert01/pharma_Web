import { z } from "zod";

// Prefix Creation Schema
export const prefixCreationSchema = z.object({
  // Required fields
  code: z
    .string()
    .min(1, { message: "Prefix code is required" })
    .min(2, { message: "Prefix code must be at least 2 characters long" })
    .max(5, { message: "Prefix code cannot exceed 5 characters" })
    .regex(/^[a-z0-9_-]+$/, {
      message: "Only lowercase letters, numbers, hyphens, and underscores are allowed",
    })
    .refine((val) => !val.includes(" "), { message: "Spaces are not allowed in prefix code" })
    .transform((val) => val.toLowerCase()),

  entity: z.string().min(1, { message: "Please select a table" }),
});

export type PrefixCreationFormValues = z.infer<typeof prefixCreationSchema>;
