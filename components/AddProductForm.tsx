"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Loader2, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { getProductCategories } from "@/store/slices/product/getProductCategoriesSlice";
import { createProduct, resetProductState } from "@/store/slices/product/createProductSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productSchema } from "@/validations";
import ConflictModal from "./ConflictModal";
import { uploadImageFile } from "@/utils/uploadImage";
import { ProfileImageUpload, FormInput, FormSelect, StatusToggle } from "@/components/form";
import { Button } from "@/components/ui/button/button";

export default function AddProductForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux state
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);
  const { categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.productCategories
  );
  const {
    loading: productLoading,
    success: productSuccess,
    error: productError,
    status: productStatus,
  } = useAppSelector((state) => state.createProduct);

  // Form state
  const [image, setImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [productName, setProductName] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [chemicalFormula, setChemicalFormula] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [skus, setSkus] = useState<string[]>(["500mg", "750mg", "1000mg"]);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch product categories and generate prefix on mount
  useEffect(() => {
    dispatch(generatePrefix({ entity: "Product" }));
    dispatch(getProductCategories());

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetProductState());
    };
  }, [dispatch]);

  // Handle success state
  useEffect(() => {
    if (productSuccess) {
      toast.success("Product created successfully!");
      // Reset form
      setProductName("");
      setLegacyCode("");
      setCategoryId("");
      setChemicalFormula("");
      setDescription("");
      setSkus(["Capsule 500mg"]);
      setImage(null);

      // Generate new prefix for next product
      dispatch(generatePrefix({ entity: "Product" }));
      dispatch(resetProductState());

      // Redirect to product management
      router.push("/dashboard/product-Management");
    }
  }, [productSuccess, dispatch, router]);

  // Handle error state
  useEffect(() => {
    if (productError) {
      if (productStatus === 409) {
        setIsConflictModalOpen(true);
      } else {
        toast.error(productError);
      }
    }
  }, [productError, productStatus]);

  const handleImageChange = async (imageData: string | null) => {
    setImage(imageData);

    // COMMENTED OUT: Cloudinary upload logic
    /*
    if (imageData && imageData.startsWith("data:image")) {
      try {
        setImageUploading(true);

        // Convert base64 to File
        const res = await fetch(imageData);
        const blob = await res.blob();
        const file = new File([blob], "product-image.png", { type: blob.type });

        // Upload to Cloudinary
        const uploadedUrl = await uploadImageFile(file);

        // Update image state with the Cloudinary URL
        setImage(uploadedUrl);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image to cloud. Please try again.");
        setImage(null);
      } finally {
        setImageUploading(false);
      }
    } else {
      setImage(null);
    }
    */
  };

  const addSkuField = () => setSkus([...skus, ""]);
  const updateSku = (index: number, value: string) => {
    const updated = [...skus];
    updated[index] = value;
    setSkus(updated);
  };
  const removeSku = (index: number) => setSkus(skus.filter((_, i) => i !== index));

  // Helper functions for validation
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";
  const hasError = (fieldName: string) => !!validationErrors[fieldName];
  const clearFieldError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const getInputClasses = (fieldName: string) => {
    const baseClasses =
      "w-full px-3 py-3 border rounded-8 focus:ring-2 outline-none text-sm transition-all";
    if (hasError(fieldName)) {
      return `${baseClasses} border-(--destructive) focus:ring-(--destructive)`;
    }
    return `${baseClasses} border-(--gray-3) focus:ring-(--primary)`;
  };

  // Form submission handler
  const handleSubmit = async () => {
    // Transform SKUs to match API structure
    const productSkus = skus
      .filter((sku) => sku.trim())
      .map((sku) => ({
        sku: sku.trim(),
        quantity: 0,
      }));

    // Prepare payload strictly matching the requested schema
    const formData = {
      pulseCode: generatedPrefix || "",
      productCode: legacyCode.trim(),
      name: productName.trim(),
      productCategoryId: categoryId,
      productFormula: chemicalFormula.trim(),
      // Hardcoded Cloudinary URL for testing
      imageUrl:
        "https://res.cloudinary.com/dm6hah42c/image/upload/v1737719876/product-image_q8z8z8.png",
      description: description.trim(),
      status: status.toLowerCase() as "active" | "inactive",
      productSkus,
    };

    // Validate using Zod schema
    const validation = productSchema.safeParse(formData);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const fieldName = err.path[0] as string;
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });

      setValidationErrors(errors);
      toast.error(validation.error.errors[0].message);
      return;
    }

    // Clear previous errors
    setValidationErrors({});

    // Dispatch create action
    dispatch(createProduct(validation.data));
  };

  return (
    <div className="">
      <div className="">
        <div className="p-10 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-12 pr-12">
            {/* Left: Image Upload */}
            <div className="space-y-4">
              <ProfileImageUpload
                imagePreview={image}
                onImageChange={handleImageChange}
                maxSizeMB={5}
              />

              {/* Image Upload Status */}
              {imageUploading && (
                <div className="flex items-center gap-2 t-sm text-(--primary)">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading image to cloud...</span>
                </div>
              )}
            </div>

            {/* Right: Form Fields */}
            <div className="space-y-6">
              {/* FIRST ROW: Pulse Code + Product code (2 columns) */}
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Pulse Code"
                  name="pulseCode"
                  type="text"
                  value={generatedPrefix || ""}
                  onChange={() => {}}
                  placeholder="PRD_001247"
                  required
                  readOnly
                  error={getErrorMessage("pulseCode")}
                />

                <FormInput
                  label="Product code"
                  name="productCode"
                  type="text"
                  value={legacyCode}
                  onChange={(value) => {
                    setLegacyCode(value);
                    clearFieldError("productCode");
                  }}
                  placeholder="001247"
                  required
                  error={getErrorMessage("productCode")}
                />
              </div>

              {/* SECOND ROW: Category + Name + Formula (3 columns) */}
              <div className="grid grid-cols-3 gap-4">
                <FormSelect
                  label="Product Category"
                  name="productCategoryId"
                  value={categoryId}
                  onChange={(value) => {
                    setCategoryId(value);
                    clearFieldError("productCategoryId");
                  }}
                  options={categories.map((cat) => ({
                    value: cat.id,
                    label: cat.productCategory,
                  }))}
                  placeholder="e.g. Antibiotics, Painkillers..."
                  required
                  loading={categoriesLoading}
                  error={getErrorMessage("productCategoryId")}
                />

                <FormInput
                  label="Product Name"
                  name="name"
                  type="text"
                  value={productName}
                  onChange={(value) => {
                    setProductName(value);
                    clearFieldError("name");
                  }}
                  placeholder="e.g. Panadol"
                  required
                  error={getErrorMessage("name")}
                />

                <FormInput
                  label="Product Formula"
                  name="productFormula"
                  type="text"
                  value={chemicalFormula}
                  onChange={(value) => {
                    setChemicalFormula(value);
                    clearFieldError("productFormula");
                  }}
                  placeholder="e.g. divalproex sodium"
                  required
                  error={getErrorMessage("productFormula")}
                />
              </div>

              {/* THIRD ROW: Product Description (full width) */}
              <FormInput
                label="Product Description"
                name="description"
                type="text"
                value={description}
                onChange={(value) => {
                  setDescription(value);
                  clearFieldError("description");
                }}
                placeholder="e.g. Panadol"
                required
                error={getErrorMessage("description")}
              />

              {/* Status Toggle */}
              <div className="flex flex-col gap-2">
                <label className="t-label">
                  Status <span className="text-(--destructive)">*</span>
                </label>
                <StatusToggle status={status} onChange={(newStatus) => setStatus(newStatus)} />
              </div>

              {/* SKU SECTION */}
              <div>
                <label className="block t-label mb-2">
                  Add Product SKU's<span className="text-(--destructive)">*</span>
                </label>

                {/* Input + Button side by side */}
                <div className="flex gap-3 w-[60%]">
                  <input
                    type="text"
                    id="sku-input"
                    placeholder="e.g. Capsule 500Mg"
                    className="flex-1 px-3 py-3 border border-[var(--gray-3)] rounded-8 focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        setSkus([...skus, e.currentTarget.value.trim()]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      const input = document.getElementById("sku-input") as HTMLInputElement;
                      if (input && input.value.trim()) {
                        setSkus([...skus, input.value.trim()]);
                        input.value = "";
                        clearFieldError("productSkus");
                      }
                    }}
                    variant="primary"
                    size="lg"
                    icon={Plus}
                    rounded="full"
                  >
                    Add Brand SKUs
                  </Button>
                </div>
                {hasError("productSkus") && (
                  <p className="mt-1 t-sm t-err">{getErrorMessage("productSkus")}</p>
                )}

                {/* SKU Chips Display */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {skus
                    .filter((s) => s.trim())
                    .map((sku, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-8 text-sm font-medium flex items-center gap-2 hover:bg-[var(--primary)]/90 transition"
                      >
                        {sku}
                        <button onClick={() => removeSku(index)} className="cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="flex justify-end gap-4 pt-6">
                <Button variant="outline" size="lg" rounded="full">
                  Discard
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={productLoading || imageUploading}
                  loading={productLoading || imageUploading}
                  variant="primary"
                  size="lg"
                  icon={Plus}
                  rounded="full"
                  className="shadow-lg"
                >
                  {imageUploading ? "Uploading Image..." : "Add Product"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConflictModal
        isOpen={isConflictModalOpen}
        onClose={() => {
          setIsConflictModalOpen(false);
          dispatch(resetProductState());
        }}
      />
    </div>
  );
}
