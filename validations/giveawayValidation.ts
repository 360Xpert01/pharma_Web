import { z } from "zod";

// Giveaway Creation Schema
export const giveawayCreationSchema = z.object({
  // Required fields
  name: z
    .string()
    .min(1, { message: "Item name is required" })
    .min(2, { message: "Item name must be at least 2 characters long" })
    .max(100, { message: "Item name cannot exceed 100 characters" })
    .transform((val) => val.trim()),

  category: z
    .string()
    .min(1, { message: "Item category is required" })
    .min(2, { message: "Category must be at least 2 characters long" })
    .max(100, { message: "Category cannot exceed 100 characters" })
    .transform((val) => val.trim()),

  units: z
    .number()
    .int({ message: "Units must be a whole number" })
    .positive({ message: "Units must be greater than 0" })
    .min(1, { message: "At least 1 unit is required" })
    .max(999999, { message: "Units cannot exceed 999,999" }),

  pulseCode: z
    .string()
    .min(1, { message: "Pulse code is required" })
    .max(100, { message: "Pulse code cannot exceed 100 characters" }),

  // Optional fields
  productName: z
    .string()
    .max(100, { message: "Product name cannot exceed 100 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),

  imageUrl: z
    .string()
    .url({ message: "Image URL must be a valid URL" })
    .optional()
    .or(z.literal("")),

  legacyCode: z
    .string()
    .max(100, { message: "Legacy code cannot exceed 100 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),
});

export type GiveawayCreationFormValues = z.infer<typeof giveawayCreationSchema>;
