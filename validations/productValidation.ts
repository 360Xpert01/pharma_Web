import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  productCode: z.string().min(1, "Product code is required"),
  productCategoryId: z.string().uuid("Invalid category ID format"),
  productFormula: z.string().min(1, "Product formula is required"),
  description: z.string().min(1, "Product description is required"),
  pulseCode: z.string().min(1, "Pulse code is required"),
  imageUrl: z
    .string()
    .max(
      1000,
      "Image URL is too long (max 1000 characters). Please use a shorter URL or a smaller image data URI."
    )
    .optional()
    .or(z.literal("")),
  status: z.enum(["active", "inactive"]).default("active"),
  productSkus: z
    .array(
      z.object({
        sku: z.string().min(1, "SKU name is required"),
        quantity: z.number().min(0),
      })
    )
    .min(1, "At least one SKU is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
