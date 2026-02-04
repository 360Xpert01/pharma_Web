"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getProductById, resetProductByIdState } from "@/store/slices/product/getProductByIdSlice";
import Image from "next/image";
import { ArrowLeft, Edit2 } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";

export default function ProductDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { product, loading, error } = useAppSelector((state) => state.productById);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }

    return () => {
      dispatch(resetProductByIdState());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--muted-foreground)]">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              Error Loading Product
            </h3>
            <p className="text-[var(--muted-foreground)] mb-4">{error}</p>
            <button
              onClick={() => router.push("/dashboard/product-Management")}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-8 hover:opacity-90 transition"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[var(--muted-foreground)]">Product not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back and Edit Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/product-Management")}
          className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        <button
          onClick={() => router.push(`/dashboard/UpdateProduct?id=${product.id}`)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-8 hover:opacity-90 transition"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit Product</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Image and Basic Info */}
        <div className="col-span-4 space-y-6">
          {/* Product Image */}
          <div className="bg-[var(--background)] rounded-12 p-6 shadow-soft border border-[var(--gray-2)]">
            <div className="aspect-square rounded-8 overflow-hidden ring-2 ring-[var(--gray-2)] bg-[var(--gray-1)]">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[var(--gray-5)] text-lg">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-[var(--background)] rounded-12 p-6 shadow-soft border border-[var(--gray-2)]">
            <h3 className="text-sm font-semibold text-[var(--muted-foreground)] mb-3">Status</h3>
            <StatusBadge status={product.status} />
          </div>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="col-span-8 space-y-6">
          {/* Basic Information */}
          <div className="bg-[var(--background)] rounded-12 p-6 shadow-soft border border-[var(--gray-2)]">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Product Information</h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                  Pulse Code
                </label>
                <p className="text-[var(--foreground)] font-medium">{product.pulseCode || "N/A"}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                  Product Code
                </label>
                <p className="text-[var(--foreground)] font-medium">
                  {product.productCode || "N/A"}
                </p>
              </div>

              <div className="col-span-2">
                <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                  Product Name
                </label>
                <p className="text-[var(--foreground)] font-medium text-lg">{product.name}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                  Category
                </label>
                <span className="inline-flex items-center px-3 py-1.5 rounded-8 text-xs bg-[var(--primary)]/10 text-[var(--primary)]">
                  {product.productCategory || "N/A"}
                </span>
              </div>

              <div>
                <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                  Formula
                </label>
                <p className="text-[var(--foreground)] font-medium">
                  {product.productFormula || "N/A"}
                </p>
              </div>

              {product.description && (
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                    Description
                  </label>
                  <p className="text-[var(--foreground)]">{product.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* SKU Information */}
          {product.productSkus && product.productSkus.length > 0 && (
            <div className="bg-[var(--background)] rounded-12 p-6 shadow-soft border border-[var(--gray-2)]">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">SKU Details</h3>

              <div className="space-y-3">
                {product.productSkus.map((sku, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-[var(--gray-1)] rounded-8"
                  >
                    <div>
                      <p className="text-sm text-[var(--muted-foreground)]">SKU</p>
                      <p className="font-medium text-[var(--foreground)]">{sku.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[var(--muted-foreground)]">Quantity</p>
                      <p className="font-medium text-[var(--foreground)]">{sku.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timestamps */}
          {(product.createdAt || product.updatedAt) && (
            <div className="bg-[var(--background)] rounded-12 p-6 shadow-soft border border-[var(--gray-2)]">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Timestamps</h3>

              <div className="grid grid-cols-2 gap-6">
                {product.createdAt && (
                  <div>
                    <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                      Created At
                    </label>
                    <p className="text-[var(--foreground)]">
                      {new Date(product.createdAt).toLocaleString()}
                    </p>
                  </div>
                )}

                {product.updatedAt && (
                  <div>
                    <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                      Updated At
                    </label>
                    <p className="text-[var(--foreground)]">
                      {new Date(product.updatedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
