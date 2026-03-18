"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Plus } from "lucide-react";
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
import ProductSkuSection from "./ProductSkuSection";
import { ConfirmModal } from "./shared/confirm-modal";

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
  const [skus, setSkus] = useState<any[]>(
    mode === "add"
      ? [
          {
            sku: "",
            skuCode: "",
            market_selling_price: "",
            trade_price: "",
            net_selling_price: "",
            quantity: "",
          },
        ]
      : []
  );
  const [isConflictModalOpen, setIsConflictModalOpen] = useState(false);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Memoize validation helpers to keep column definitions stable
  // Generic validation helpers
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";
  const hasError = (fieldName: string) => !!validationErrors[fieldName];

  const clearFieldError = useCallback((fieldName: string) => {
    setValidationErrors((prev) => {
      if (!prev[fieldName]) return prev;
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  // Fetch product categories on mount
  useEffect(() => {
    dispatch(getProductCategories());

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetProductState());
      dispatch(resetUpdateProductState());
      dispatch(resetProductByIdState());
      dispatch(resetUploadState());
    };
  }, [dispatch]);

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
          sku: sku.sku || "",
          pulseCode: sku.pulseCode || "",
          skuCode: sku.skuCode || "",
          market_selling_price: sku.market_selling_price || "",
          trade_price: sku.trade_price || "",
          net_selling_price: sku.net_selling_price || "",
          quantity: sku.quantity || "",
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
        // dispatch(generatePrefix({ entity: "Product" })); // Removed as requested
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

  // Form submission handler
  const handleSubmit = async () => {
    const productSkus = skus.map((sku) => ({
      sku: sku.sku.trim(),
      skuCode: sku.skuCode.trim(),
      market_selling_price: sku.market_selling_price ? Number(sku.market_selling_price) : 0,
      trade_price: sku.trade_price ? Number(sku.trade_price) : 0,
      net_selling_price: sku.net_selling_price ? Number(sku.net_selling_price) : 0,
      quantity: sku.quantity ? Number(sku.quantity) : 0,
    }));

    const formData = {
      pulseCode: mode === "edit" && existingProduct ? existingProduct.pulseCode : undefined,
      productCode: legacyCode.trim(),
      name: productName.trim(),
      productCategoryId: categoryId,
      productFormula: chemicalFormula.trim(),
      imageUrl: image || null,
      description: description.trim(),
      status: status.toLowerCase() as "active" | "inactive",
      productSkus,
    };

    const validation = productSchema.safeParse(formData);

    if (!validation.success) {
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

    setValidationErrors({});

    if (mode === "edit" && productId) {
      const { pulseCode, ...updateData } = validation.data;
      dispatch(updateProduct({ id: productId, ...updateData }));
    } else {
      dispatch(createProduct(validation.data));
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* TOP SECTION: Basic Information - Wrapped in Card */}
      <div className="bg-background shadow-soft p-6 lg:p-8 rounded-8 border border-(--gray-1) overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: Image Upload - Span 1 */}
          <div className="lg:col-span-1 min-w-0">
            <div className="space-y-4">
              <ProfileImageUpload
                imagePreview={image}
                onImageChange={handleImageChange}
                maxSizeMB={5}
                loading={uploadLoading}
              />
            </div>
          </div>

          {/* Right: Form Fields - Span 3 */}
          <div className="lg:col-span-3 min-w-0">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Pulse Code"
                  name="pulseCode"
                  type="text"
                  value={mode === "edit" ? existingProduct?.pulseCode || "" : "TO BE GENERATED"}
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

              <div className="flex flex-col gap-2">
                <label className="t-label">Status</label>
                <StatusToggle status={status} onChange={(newStatus) => setStatus(newStatus)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: SKUs - Now a separate component */}
      <ProductSkuSection
        skus={skus}
        setSkus={setSkus}
        mode={mode}
        validationErrors={validationErrors}
        clearFieldError={clearFieldError}
        getErrorMessage={getErrorMessage}
        hasError={hasError}
      />

      {/* FOOTER ACTIONS */}
      <div className="flex justify-end gap-4 pt-6">
        <Button
          variant="outline"
          size="lg"
          rounded="full"
          onClick={() => setIsDiscardModalOpen(true)}
        >
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

      <ConflictModal
        isOpen={isConflictModalOpen}
        onClose={() => {
          setIsConflictModalOpen(false);
          dispatch(resetProductState());
        }}
      />

      <ConfirmModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        onConfirm={() => {
          setIsDiscardModalOpen(false);
          router.back();
        }}
        title="Discard changes?"
        description="You will lose all unsaved changes for this product."
        confirmLabel="Discard"
      />
    </div>
  );
}
