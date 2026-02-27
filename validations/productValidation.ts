import { z } from "zod";

export const productSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required")
      .max(255, "Product name cannot exceed 255 characters"),

    pulseCode: z.string().max(255, "Pulse code cannot exceed 255 characters").optional(),

    productCode: z.string().max(255, "Product code cannot exceed 255 characters").optional(),

    productCategoryId: z.string().uuid("Invalid category ID format"),
    productFormula: z.string().max(255, "Product formula cannot exceed 255 characters").optional(),

    imageUrl: z
      .string()
      .url("Invalid image URL")
      .max(1000, "Image URL cannot exceed 1000 characters")
      .optional()
      .nullable(),

    description: z.string().max(2000, "Description cannot exceed 2000 characters").optional(),

    status: z.enum(["active", "inactive"]).default("active").optional(),

    productSkus: z
      .array(
        z.object({
          sku: z.string().max(100, "SKU name cannot exceed 100 characters"),
        })
      )
      .min(1, "At least one SKU is required")
      .optional(),
  })
  .strict();

export type ProductFormValues = z.infer<typeof productSchema>;
