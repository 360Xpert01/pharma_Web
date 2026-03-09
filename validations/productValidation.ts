import { z } from "zod";

export const productSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required")
      .max(255, "Product name cannot exceed 255 characters"),

    pulseCode: z.string().max(255, "Pulse code cannot exceed 255 characters").optional(),

    productCode: z
      .string()
      .min(1, "Product code is required")
      .max(255, "Product code cannot exceed 255 characters"),

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
          pulseCode: z
            .string()
            .min(1, "Pulse code is required")
            .max(255, "Pulse code cannot exceed 255 characters"),
          sku: z
            .string()
            .min(1, "SKU name is required")
            .max(100, "SKU name cannot exceed 100 characters"),
          productCode: z
            .string()
            .min(1, "Product code is required")
            .max(255, "Product code cannot exceed 255 characters"),
          mrp: z.coerce
            .number({ invalid_type_error: "MRP must be a number" })
            .positive("MRP must be greater than 0"),
          tp: z.coerce
            .number({ invalid_type_error: "TP must be a number" })
            .positive("TP must be greater than 0"),
          nsp: z.coerce
            .number({ invalid_type_error: "NSP must be a number" })
            .positive("NSP must be greater than 0"),
        })
      )
      .min(1, "At least one SKU is required"),
  })
  .strict();

export type ProductFormValues = z.infer<typeof productSchema>;
