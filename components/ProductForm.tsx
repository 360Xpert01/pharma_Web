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
import { updateProduct, resetUpdateProductState } from "@/store/slices/product/updateProductSlice";
import { getProductById, resetProductByIdState } from "@/store/slices/product/getProductByIdSlice";
import { uploadImageAction, resetUploadState } from "@/store/slices/upload/uploadSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productSchema } from "@/validations";
import ConflictModal from "./ConflictModal";
import { ProfileImageUpload, FormInput, FormSelect, StatusToggle } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import AnimatedTabs from "@/components/shared/AnimatedTabs";
import CenturoTable from "@/components/shared/table/CeturoTable";
import { ColumnDef } from "@tanstack/react-table";
import ProductSkuChart from "./productSKUs";

interface ProductFormProps {
  mode?: "add" | "edit";
  productId?: string;
}

export default function ProductForm({ mode = "add", productId }: ProductFormProps) {
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
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
    status: updateStatus,
  } = useAppSelector((state) => state.updateProduct);
  const { loading: fetchProductLoading, product: existingProduct } = useAppSelector(
    (state) => state.productById
  );
  // Cloudinary/upload state
  const {
    loading: uploadLoading,
    success: uploadSuccess,
    error: uploadError,
    uploadedFiles,
  } = useAppSelector((state) => state.upload);

  // Form state
  const [image, setImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [productName, setProductName] = useState("");
  const [legacyCode, setLegacyCode] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [chemicalFormula, setChemicalFormula] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [skus, setSkus] = useState<any[]>([]);
  const [skuInput, setSkuInput] = useState("");
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"Product SKUs">("Product SKUs");

  const tabs = [{ id: "Product SKUs", label: "Product SKUs" }];

  // Column definitions for CenturoTable
  const skuColumns: ColumnDef<any>[] = [
    {
      accessorKey: "pulseCode",
      header: () => (
        <span>
          Pulse Code<span className="text-(--destructive)">*</span>
        </span>
      ),
      cell: ({ row }) => (
        <input
          type="text"
          value={row.original.pulseCode}
          onChange={(e) => {
            updateSkuRow(row.index, "pulseCode", e.target.value);
            clearFieldError(`productSkus.${row.index}.pulseCode`);
          }}
          className={`w-full px-2 py-1 bg-transparent border-none outline-none focus:ring-1 focus:ring-(--primary) rounded ${
            hasSkuError(row.index, "pulseCode") ? "ring-1 ring-(--destructive)" : ""
          }`}
          placeholder="Pulse Code"
        />
      ),
    },
    {
      accessorKey: "sku",
      header: () => (
        <span>
          SKU Name<span className="text-(--destructive)">*</span>
        </span>
      ),
      cell: ({ row }) => (
        <input
          type="text"
          value={row.original.sku}
          onChange={(e) => {
            updateSkuRow(row.index, "sku", e.target.value);
            clearFieldError(`productSkus.${row.index}.sku`);
          }}
          className={`w-full px-2 py-1 font-medium bg-transparent border-none outline-none focus:ring-1 focus:ring-(--primary) rounded ${
            hasSkuError(row.index, "sku") ? "ring-1 ring-(--destructive)" : ""
          }`}
          placeholder="SKU Name"
        />
      ),
    },
    {
      accessorKey: "productCode",
      header: () => (
        <span>
          Product SKU Code<span className="text-(--destructive)">*</span>
        </span>
      ),
      cell: ({ row }) => (
        <input
          type="text"
          value={row.original.productCode}
          onChange={(e) => {
            updateSkuRow(row.index, "productCode", e.target.value);
            clearFieldError(`productSkus.${row.index}.productCode`);
          }}
          className={`w-full px-2 py-1 bg-transparent border-none outline-none focus:ring-1 focus:ring-(--primary) rounded ${
            hasSkuError(row.index, "productCode") ? "ring-1 ring-(--destructive)" : ""
          }`}
          placeholder="Code"
        />
      ),
    },
    {
      accessorKey: "mrp",
      header: () => (
        <span>
          MRP<span className="text-(--destructive)">*</span>
        </span>
      ),
      cell: ({ row }) => (
        <input
          type="number"
          value={row.original.mrp}
          onChange={(e) => {
            updateSkuRow(row.index, "mrp", e.target.value);
            clearFieldError(`productSkus.${row.index}.mrp`);
          }}
          className={`w-full px-2 py-1 bg-transparent border-none outline-none focus:ring-1 focus:ring-(--primary) rounded ${
            hasSkuError(row.index, "mrp") ? "ring-1 ring-(--destructive)" : ""
          }`}
          placeholder="MRP"
        />
      ),
    },
    {
      accessorKey: "tp",
      header: () => (
        <span>
          TP<span className="text-(--destructive)">*</span>
        </span>
      ),
      cell: ({ row }) => (
        <input
          type="number"
          value={row.original.tp}
          onChange={(e) => {
            updateSkuRow(row.index, "tp", e.target.value);
            clearFieldError(`productSkus.${row.index}.tp`);
          }}
          className={`w-full px-2 py-1 bg-transparent border-none outline-none focus:ring-1 focus:ring-(--primary) rounded ${
            hasSkuError(row.index, "tp") ? "ring-1 ring-(--destructive)" : ""
          }`}
          placeholder="TP"
        />
      ),
    },
    {
      accessorKey: "nsp",
      header: () => (
        <span>
          NSP<span className="text-(--destructive)">*</span>
        </span>
      ),
      cell: ({ row }) => (
        <input
          type="number"
          value={row.original.nsp}
          onChange={(e) => {
            updateSkuRow(row.index, "nsp", e.target.value);
            clearFieldError(`productSkus.${row.index}.nsp`);
          }}
          className={`w-full px-2 py-1 bg-transparent border-none outline-none focus:ring-1 focus:ring-(--primary) rounded ${
            hasSkuError(row.index, "nsp") ? "ring-1 ring-(--destructive)" : ""
          }`}
          placeholder="NSP"
        />
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="text-right">
          <button
            onClick={() => removeSku(row.index)}
            className="p-1 hover:text-(--destructive) transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Fetch product categories and generate prefix on mount
  useEffect(() => {
    if (mode === "add") {
      dispatch(generatePrefix({ entity: "Product" }));
    }
    dispatch(getProductCategories());

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetProductState());
      dispatch(resetUpdateProductState());
      dispatch(resetProductByIdState());
      dispatch(resetUploadState());
    };
  }, [dispatch, mode]);

  // Fetch product data in edit mode
  useEffect(() => {
    if (mode === "edit" && productId) {
      dispatch(getProductById(productId));
    }
  }, [mode, productId, dispatch]);

  // Pre-populate form fields when product data is fetched
  useEffect(() => {
    if (mode === "edit" && existingProduct) {
      setProductName(existingProduct.name || "");
      setLegacyCode(existingProduct.productCode || "");
      setCategoryId(existingProduct.productCategoryId || "");
      setChemicalFormula(existingProduct.productFormula || "");
      setDescription(existingProduct.description || "");
      setStatus(existingProduct.status === "active" ? "Active" : "Inactive");
      setImage(existingProduct.imageUrl || null);
      setSkus(
        existingProduct.productSkus?.map((sku: any) => ({
          pulseCode: sku.pulseCode || "",
          sku: sku.sku || "",
          productCode: sku.productCode || "",
          mrp: sku.mrp || "",
          tp: sku.tp || "",
          nsp: sku.nsp || "",
        })) || []
      );
    }
  }, [mode, existingProduct]);

  // Handle success state (for both add and update)
  useEffect(() => {
    if (productSuccess || updateSuccess) {
      const message =
        mode === "edit" ? "Product updated successfully!" : "Product created successfully!";
      toast.success(message);
      // Reset form
      setProductName("");
      setLegacyCode("");
      setCategoryId("");
      setChemicalFormula("");
      setDescription("");
      setSkus([]);
      setImage(null);

      // Generate new prefix for next product (only in add mode)
      if (mode === "add") {
        dispatch(generatePrefix({ entity: "Product" }));
      }
      dispatch(resetProductState());
      dispatch(resetUpdateProductState());

      // Redirect to product management
      router.push("/dashboard/product-Management");
    }
  }, [productSuccess, updateSuccess, dispatch, router, mode]);

  // Handle error state (for both add and update)
  useEffect(() => {
    const errorMessage = productError || updateError;
    const statusCode = productStatus || updateStatus;

    if (errorMessage) {
      if (statusCode === 409) {
        setIsConflictModalOpen(true);
      } else {
      }
    }
  }, [productError, updateError, productStatus, updateStatus]);

  // Image upload effect
  useEffect(() => {
    if (uploadSuccess && uploadedFiles.length > 0) {
      setImage(uploadedFiles[0].url);
      toast.success("Image uploaded successfully!");
    }
    if (uploadError) {
      console.error("AddProductForm: Upload error", uploadError);
    }
  }, [uploadSuccess, uploadedFiles, uploadError]);

  // Image upload handler
  const handleImageChange = async (file: File | null) => {
    if (file) {
      dispatch(uploadImageAction(file));
    } else {
      setImage(null);
      dispatch(resetUploadState());
    }
  };

  const addSku = (value: string) => {
    if (!value.trim()) return;
    setSkus([
      ...skus,
      {
        pulseCode: "",
        sku: value.trim(),
        productCode: "",
        mrp: "",
        tp: "",
        nsp: "",
      },
    ]);
    setSkuInput("");
    clearFieldError("productSkus");
  };

  const updateSkuRow = (index: number, field: string, value: string) => {
    const updated = [...skus];
    updated[index] = { ...updated[index], [field]: value };
    setSkus(updated);
  };

  const removeSku = (index: number) => setSkus(skus.filter((_, i) => i !== index));

  // Helper functions for validation
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";
  const hasError = (fieldName: string) => !!validationErrors[fieldName];

  const getSkuErrorMessage = (index: number, field: string) =>
    validationErrors[`productSkus.${index}.${field}`] || "";
  const hasSkuError = (index: number, field: string) =>
    !!validationErrors[`productSkus.${index}.${field}`];
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
    console.log("ProductForm: handleSubmit called");
    // Transform SKUs to match API structure
    const productSkus = skus.map((sku) => ({
      pulseCode: sku.pulseCode || undefined,
      sku: sku.sku.trim(),
      productCode: sku.productCode || undefined,
      mrp: sku.mrp ? Number(sku.mrp) : undefined,
      tp: sku.tp ? Number(sku.tp) : undefined,
      nsp: sku.nsp ? Number(sku.nsp) : undefined,
    }));

    // Prepare payload strictly matching the requested schema
    const formData = {
      pulseCode:
        mode === "edit" && existingProduct ? existingProduct.pulseCode : generatedPrefix || "",
      productCode: legacyCode.trim(),
      name: productName.trim(),
      productCategoryId: categoryId,
      productFormula: chemicalFormula.trim(),
      imageUrl: image || null,
      description: description.trim(),
      status: status.toLowerCase() as "active" | "inactive",
      productSkus,
    };

    console.log("ProductForm: formData prepared", formData);

    // Validate using Zod schema
    const validation = productSchema.safeParse(formData);

    if (!validation.success) {
      console.log("ProductForm: Validation failed", validation.error.format());
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err: any) => {
        const fieldName = err.path.join(".");
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });

      setValidationErrors(errors);

      return;
    }

    console.log("ProductForm: Validation successful", validation.data);

    // Clear previous errors
    setValidationErrors({});

    // Dispatch create or update action based on mode
    if (mode === "edit" && productId) {
      console.log("ProductForm: Dispatching updateProduct with ID", productId);
      const { pulseCode, ...updateData } = validation.data;
      dispatch(updateProduct({ id: productId, ...updateData }));
    } else {
      console.log("ProductForm: Dispatching createProduct");
      dispatch(createProduct(validation.data));
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="p-10 space-y-8">
          {/* TOP SECTION: Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-12 pr-12">
            {/* Left: Image Upload */}
            <div className="space-y-4">
              <ProfileImageUpload
                imagePreview={image}
                onImageChange={handleImageChange}
                maxSizeMB={5}
                loading={uploadLoading}
              />
            </div>

            {/* Right: Form Fields */}
            <div className="space-y-6">
              {/* FIRST ROW: Pulse Code + Product code (2 columns) */}
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Pulse Code"
                  name="pulseCode"
                  type="text"
                  value={
                    mode === "edit" && existingProduct?.pulseCode
                      ? existingProduct.pulseCode
                      : generatedPrefix || ""
                  }
                  onChange={() => {}}
                  placeholder="Auto-generated"
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
                  placeholder="Enter product code"
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
                  placeholder="Select product category"
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
                  placeholder="Enter product name"
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
                  placeholder="Enter product formula"
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
                placeholder="Enter product description..."
                error={getErrorMessage("description")}
              />

              {/* Status Toggle */}
              <div className="flex flex-col gap-2">
                <label className="t-label">Status</label>
                {/* <span className="text-(--destructive)">*</span> */}
                <StatusToggle status={status} onChange={(newStatus) => setStatus(newStatus)} />
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION: SKU Search Bar */}
          <div className="space-y-4">
            <label className="block t-label">
              Add Product SKU<span className="text-(--destructive)">*</span>
            </label>

            <div className="flex gap-3 w-[60%]">
              <input
                type="text"
                placeholder="Enter SKU (e.g. Capsule 500mg)"
                value={skuInput}
                onChange={(e) => setSkuInput(e.target.value)}
                className="flex-1 px-3 py-3 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) outline-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSku(skuInput);
                  }
                }}
              />
              <Button
                onClick={() => addSku(skuInput)}
                variant="primary"
                size="lg"
                icon={Plus}
                rounded="full"
              >
                Add Product SKU
              </Button>
            </div>

            {hasError("productSkus") && (
              <p className="mt-1 t-sm t-err">{getErrorMessage("productSkus")}</p>
            )}
          </div>

          {/* BOTTOM SECTION: Tabs Container */}
          <div className="bg-background shadow-soft p-6 rounded-8 border border-(--gray-1)">
            <div className="mb-6">
              <AnimatedTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={(id) => setActiveTab(id as any)}
                variant="secondary"
                size="md"
              />
            </div>

            {activeTab === "Product SKUs" && (
              <div className="w-full">
                <CenturoTable
                  data={skus}
                  columns={skuColumns}
                  emptyMessage="No SKUs added yet. Enter a name above to add one."
                />
              </div>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="flex justify-end gap-4 pt-6">
            <Button variant="outline" size="lg" rounded="full" onClick={() => router.back()}>
              Discard
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={(mode === "edit" ? updateLoading : productLoading) || uploadLoading}
              loading={(mode === "edit" ? updateLoading : productLoading) || uploadLoading}
              variant="primary"
              size="lg"
              icon={Plus}
              rounded="full"
              className="shadow-lg"
            >
              {uploadLoading ? "Uploading..." : mode === "edit" ? "Update Product" : "Add Product"}
            </Button>
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
