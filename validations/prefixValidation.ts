import { z } from "zod";

// Prefix Creation Schema
export const prefixCreationSchema = z.object({
  // Required fields
  code: z
    .string()
    .min(1, { message: "Prefix code is required" })
    .min(2, { message: "Prefix code must be at least 2 characters long" })
    .max(5, { message: "Prefix code cannot exceed 5 characters" })
    .regex(/^[A-Z0-9]+$/, {
      message: "Prefix code must contain only uppercase letters and numbers",
    })
    .refine((val) => !val.includes(" "), { message: "Spaces are not allowed in prefix code" })
    .transform((val) => val.toUpperCase()),

  entity: z.string().min(1, { message: "Please select a table" }),
});

export type PrefixCreationFormValues = z.infer<typeof prefixCreationSchema>;
