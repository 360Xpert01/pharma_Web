"use client";
import ProductForm from "./ProductForm";

interface UpdateProductFormProps {
  productId?: string | null;
}

export default function UpdateProductForm({ productId }: UpdateProductFormProps) {
  return <ProductForm mode="edit" productId={productId || undefined} />;
}
