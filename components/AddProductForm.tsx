"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Plus, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { getProductCategories } from "@/store/slices/product/getProductCategoriesSlice";
import { createProduct, resetProductState } from "@/store/slices/product/createProductSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productSchema, ProductFormValues } from "@/validations";
import ConflictModal from "./ConflictModal";
import { uploadImageFile } from "@/utils/uploadImage";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [productName, setProductName] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [chemicalFormula, setChemicalFormula] = useState("");
  const [description, setDescription] = useState("");
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
      if (fileInputRef.current) fileInputRef.current.value = "";

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

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
      "w-full px-3 py-3 border rounded-lg focus:ring-2 outline-none text-sm transition-all";
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

    // Upload image to Cloudinary if a file is selected
    let uploadedImageUrl = "";
    if (imageFile) {
      try {
        setImageUploading(true);
        uploadedImageUrl = await uploadImageFile(imageFile);
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
        setImageUploading(false);
        return;
      } finally {
        setImageUploading(false);
      }
    }

    // Prepare payload strictly matching the requested schema
    const formData = {
      pulseCode: generatedPrefix || "",
      productCode: legacyCode.trim(),
      name: productName.trim(),
      productCategoryId: categoryId,
      productFormula: chemicalFormula.trim(),
      imageUrl: uploadedImageUrl,
      description: description.trim(),
      status: "active" as const,
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
      <div className=" ">
        <div className="p-10 space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-(--gray-9)">Add New Product</h1>
            <p className="text-sm text-(--gray-5) mt-2">Unlock the potential of your candidates</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 pr-12">
            {/* Left: Image Upload */}
            <div className="space-y-4">
              <div
                onClick={handleImageClick}
                className="relative w-full aspect-square bg-(--gray-1) border-2 border-dashed border-(--gray-3) rounded-2xl cursor-pointer overflow-hidden group hover:border-(--gray-4) transition-all"
              >
                {image ? (
                  <div className="relative w-full h-full">
                    <Image src={image} alt="Product" fill className="object-cover" />
                    <button
                      onClick={removeImage}
                      className="absolute top-4 right-4 bg-(--destructive) text-(--light) p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-soft"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-(--gray-4)">
                    <Upload className="w-16 h-16 mb-4" />
                    <p className="text-lg font-medium">Click to upload image</p>
                    <p className="text-sm">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>

              {/* Image Upload Status */}
              {imageUploading && (
                <div className="flex items-center gap-2 text-sm text-(--primary)">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading image to cloud...</span>
                </div>
              )}

              {/* Small Thumbnail */}
              <div
                onClick={handleImageClick}
                className="w-24 h-24 bg-(--gray-1) border-2 border-dashed border-(--gray-3) rounded-lg cursor-pointer hover:border-(--gray-4) transition-all flex items-center justify-center"
              >
                {image ? (
                  <Image
                    src={image}
                    alt="Thumbnail"
                    width={96}
                    height={96}
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-(--gray-4)" />
                )}
              </div>
            </div>

            {/* Right: Form Fields */}
            <div className="space-y-6">
              {/* FIRST ROW: Pulse Code + Product code (2 columns) */}
              <div className="grid grid-cols-2 gap-4">
                {/* Pulse Code */}
                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Pules Code<span className="text-(--destructive-foreground)">*</span>
                  </label>
                  <div
                    className={`px-3 py-3 bg-(--gray-0) border rounded-lg font-mono text-(--gray-6) text-sm ${hasError("pulseCode") ? "border-(--destructive)" : "border-(--gray-2)"}`}
                  >
                    {generatedPrefix || "PLS_PRD_001247"}
                  </div>
                  {hasError("pulseCode") && (
                    <p className="mt-1 text-sm text-(--destructive-foreground)">
                      {getErrorMessage("pulseCode")}
                    </p>
                  )}
                </div>

                {/* Product code */}
                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Product code<span className="text-(--destructive-foreground)">*</span>
                  </label>
                  <input
                    type="text"
                    value={legacyCode}
                    onChange={(e) => {
                      setLegacyCode(e.target.value);
                      clearFieldError("productCode");
                    }}
                    placeholder="001247"
                    className={getInputClasses("productCode")}
                  />
                  {hasError("productCode") && (
                    <p className="mt-1 text-sm text-(--destructive-foreground)">
                      {getErrorMessage("productCode")}
                    </p>
                  )}
                </div>
              </div>

              {/* SECOND ROW: Category + Name + Formula (3 columns) */}
              <div className="grid grid-cols-3 gap-4">
                {/* Product Category */}
                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Product Category<span className="text-(--destructive-foreground)">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => {
                      setCategoryId(e.target.value);
                      clearFieldError("productCategoryId");
                    }}
                    className={getInputClasses("productCategoryId")}
                  >
                    <option value="">
                      {categoriesLoading ? "Loading..." : "e.g. Doctor, Heart..."}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.productCategory}
                      </option>
                    ))}
                  </select>
                  {hasError("productCategoryId") && (
                    <p className="mt-1 text-sm text-(--destructive-foreground)">
                      {getErrorMessage("productCategoryId")}
                    </p>
                  )}
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Product Name<span className="text-(--destructive-foreground)">*</span>
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                      clearFieldError("name");
                    }}
                    placeholder="e.g. Panadol"
                    className={getInputClasses("name")}
                  />
                  {hasError("name") && (
                    <p className="mt-1 text-sm text-(--destructive-foreground)">
                      {getErrorMessage("name")}
                    </p>
                  )}
                </div>

                {/* Product Formula */}
                <div>
                  <label className="block text-sm font-medium text-(--gray-7) mb-2">
                    Product Formula<span className="text-(--destructive-foreground)">*</span>
                  </label>
                  <input
                    type="text"
                    value={chemicalFormula}
                    onChange={(e) => {
                      setChemicalFormula(e.target.value);
                      clearFieldError("productFormula");
                    }}
                    placeholder="e.g. divalproex sodium"
                    className={getInputClasses("productFormula")}
                  />
                  {hasError("productFormula") && (
                    <p className="mt-1 text-sm text-(--destructive-foreground)">
                      {getErrorMessage("productFormula")}
                    </p>
                  )}
                </div>
              </div>

              {/* THIRD ROW: Product Description (full width) */}
              <div>
                <label className="block text-sm font-medium text-(--gray-7) mb-2">
                  Product Description<span className="text-(--destructive-foreground)">*</span>
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    clearFieldError("description");
                  }}
                  placeholder="e.g. Panadol"
                  className={getInputClasses("description")}
                />
                {hasError("description") && (
                  <p className="mt-1 text-sm text-(--destructive-foreground)">
                    {getErrorMessage("description")}
                  </p>
                )}
              </div>

              {/* SKU SECTION */}
              <div>
                <label className="block text-sm font-medium text-(--gray-7) mb-2">
                  Add Product SKU's<span className="text-(--destructive-foreground)">*</span>
                </label>

                {/* Input + Button side by side */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    id="sku-input"
                    placeholder="e.g. Capsule 500Mg"
                    className="flex-1 px-3 py-3 border border-(--gray-3) rounded-lg focus:ring-2 focus:ring-(--primary) outline-none text-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        setSkus([...skus, e.currentTarget.value.trim()]);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById("sku-input") as HTMLInputElement;
                      if (input && input.value.trim()) {
                        setSkus([...skus, input.value.trim()]);
                        input.value = "";
                        clearFieldError("productSkus");
                      }
                    }}
                    className="px-6 py-3 bg-(--primary) text-(--light) rounded-full hover:bg-(--primary-2) transition flex items-center gap-2 text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    Add Brand SKUs
                  </button>
                </div>
                {hasError("productSkus") && (
                  <p className="mt-1 text-sm text-(--destructive-foreground)">
                    {getErrorMessage("productSkus")}
                  </p>
                )}

                {/* SKU Chips Display */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {skus
                    .filter((s) => s.trim())
                    .map((sku, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 bg-(--primary) text-(--light) rounded-full text-sm font-medium flex items-center gap-2 hover:bg-(--primary-2) transition"
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
                <button className="px-8 py-3 border border-(--primary) text-(--primary) font-medium rounded-full hover:bg-(--primary-0) transition cursor-pointer">
                  Discard
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={productLoading || imageUploading}
                  className="px-10 py-3 bg-(--primary) text-(--light) font-medium rounded-full hover:bg-(--primary-2) transition flex items-center gap-3 shadow-soft cursor-pointer disabled:bg-(--primary-1) disabled:cursor-not-allowed"
                >
                  {productLoading || imageUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-(--light) border-t-transparent rounded-full animate-spin" />
                      {imageUploading ? "Uploading Image..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

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
