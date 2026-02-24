"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createProductCategory,
  resetProductCategoryState,
} from "@/store/slices/productCategory/createProductCategorySlice";
import {
  getAllProductCategories,
  resetProductCategoriesState,
  ProductCategory,
} from "@/store/slices/productCategory/getAllProductCategoriesSlice";
import {
  updateProductCategory,
  resetUpdateProductCategoryState,
} from "@/store/slices/productCategory/updateProductCategorySlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import StatusToggle from "@/components/form/StatusToggle";
import { useMemo } from "react";
import toast from "react-hot-toast";

interface ProductCategoriesProps {
  updateId?: string | null;
  onUpdateComplete?: () => void;
}

export default function ProductCategories({
  updateId = null,
  onUpdateComplete,
}: ProductCategoriesProps) {
  const dispatch = useAppDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const {
    loading: creatingLoading,
    success: createSuccess,
    error: createError,
  } = useAppSelector((state) => state.createProductCategory);
  const {
    loading: updatingLoading,
    success: updateSuccess,
    error: updateError,
  } = useAppSelector((state) => state.updateProductCategory);
  const { productCategories } = useAppSelector((state) => state.allProductCategories);
  const { generatedPrefix, loading: prefixLoading } = useAppSelector(
    (state) => state.generatePrefix
  );

  const isUpdateMode = !!updateId;

  const categoryData = useMemo(() => {
    if (updateId && productCategories) {
      return productCategories.find((cat) => cat.id === updateId);
    }
    return null;
  }, [updateId, productCategories]);

  // Auto-generate next pulse code on mount
  useEffect(() => {
    if (!isUpdateMode) {
      dispatch(generatePrefix({ entity: "ProductCategory" }));
    }
    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch, isUpdateMode]);

  // Populate form in update mode
  useEffect(() => {
    if (isUpdateMode && categoryData) {
      setCategoryName(categoryData.productCategory || "");
      setStatus(categoryData.status || "active");
    }
  }, [isUpdateMode, categoryData]);

  // Handle Create Success
  useEffect(() => {
    if (createSuccess) {
      toast.success("Product category added successfully!");
      setCategoryName("");
      setStatus("active");
      dispatch(resetProductCategoryState());
      dispatch(getAllProductCategories()); // Refresh list
      dispatch(generatePrefix({ entity: "ProductCategory" })); // Get next prefix
    }
    if (createError) {
      toast.error(createError);
      dispatch(resetProductCategoryState());
    }
  }, [createSuccess, createError, dispatch]);

  // Handle Update Success
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Product category updated successfully!");
      setCategoryName("");
      setStatus("active");
      dispatch(resetUpdateProductCategoryState());
      dispatch(getAllProductCategories()); // Refresh list
      if (onUpdateComplete) {
        onUpdateComplete();
      }
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(resetUpdateProductCategoryState());
    }
  }, [updateSuccess, updateError, dispatch, onUpdateComplete]);

  const handleSubmit = () => {
    if (!categoryName.trim()) return;

    if (isUpdateMode && updateId) {
      dispatch(
        updateProductCategory({
          id: updateId,
          productCategory: categoryName.trim(),
          status: status,
        })
      );
    } else {
      if (!generatedPrefix) return;
      dispatch(
        createProductCategory({
          productCategory: categoryName.trim(),
          pulseCode: generatedPrefix,
          status: status,
        })
      );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2 font-semibold">
              {isUpdateMode ? "Update Product Category" : "Add Product Categories"}
            </h2>
            <p className="t-sm text-(--gray-5) mt-1">
              {isUpdateMode
                ? "Update the product category information below"
                : "Manage product categories for your organization"}
            </p>
          </div>

          {/* Add New Category Form */}
          <div className="flex gap-6 items-end">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
              {/* Pulse Code */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={
                  isUpdateMode
                    ? categoryData?.pulseCode || ""
                    : prefixLoading
                      ? "Generating..."
                      : generatedPrefix || ""
                }
                onChange={() => {}}
                placeholder="Auto-generated"
                readOnly
                required
              />

              {/* Category Name */}
              <FormInput
                label="Category Name"
                name="categoryName"
                type="text"
                value={categoryName}
                onChange={setCategoryName}
                placeholder="Enter category name"
                required
              />

              {/* Status */}
              <div className="flex flex-col gap-2">
                <label className="t-label">Status</label>
                <StatusToggle
                  status={status === "active" ? "Active" : "Inactive"}
                  onChange={(newStatus) =>
                    setStatus(newStatus.toLowerCase() as "active" | "inactive")
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={
                !categoryName.trim() ||
                creatingLoading ||
                updatingLoading ||
                (!isUpdateMode && prefixLoading)
              }
              variant="primary"
              size="lg"
              icon={Plus}
              loading={isUpdateMode ? updatingLoading : creatingLoading}
              className="h-12 px-8"
            >
              {isUpdateMode ? "Update Category" : "Add to list"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
