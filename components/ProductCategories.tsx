"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import {
  createProductCategory,
  resetProductCategoryState,
} from "@/store/slices/productCategory/createProductCategorySlice";
import { getAllProductCategories } from "@/store/slices/productCategory/getAllProductCategoriesSlice";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

export default function AddProductCategoriesCard() {
  const dispatch = useAppDispatch();
  const { loading, success, error, message } = useAppSelector(
    (state) => state.createProductCategory
  );
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);

  const [categoryName, setCategoryName] = useState("");

  // Generate prefix on mount
  useEffect(() => {
    dispatch(generatePrefix({ entity: "ProductCategory" }));

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch]);

  // Reset state and refresh categories list on success
  useEffect(() => {
    if (success) {
      // Clear form
      setCategoryName("");

      // Refresh categories list
      dispatch(getAllProductCategories());

      // Regenerate prefix for next category
      dispatch(generatePrefix({ entity: "ProductCategory" }));

      // Reset state after a delay
      setTimeout(() => {
        dispatch(resetProductCategoryState());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    // Validate pulse code is generated
    if (!generatedPrefix) {
      console.error("Pulse code not generated yet");
      return;
    }

    const categoryData = {
      name: categoryName.trim(),
      pulseCode: generatedPrefix,
      isActive: true,
    };

    // Dispatch to API
    dispatch(createProductCategory(categoryData));
  };

  return (
    <div className="w-full">
      <div className="bg-[var(--background)] rounded-8 shadow-soft border border-[var(--gray-1)] overflow-hidden">
        <div className="px-8 py-10 space-y-8">
          {/* Header */}
          <div>
            <h2 className="t-h2">Add Product Categories</h2>
            <p className="t-sm mt-1">Manage product categories for your organization</p>
          </div>

          {/* Add New Category Form */}
          <div className="flex gap-6 items-end">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {/* Pulse Code */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={generatedPrefix || ""}
                onChange={() => {}}
                placeholder={prefixLoading ? "Generating..." : "PC_000001"}
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
                placeholder="e.g. Antibiotics"
                required
              />
            </div>

            {/* Add Button */}
            <Button
              onClick={handleAddCategory}
              disabled={!categoryName.trim() || loading}
              variant="primary"
              size="lg"
              icon={Plus}
              loading={loading}
              className="h-12 px-8"
            >
              {loading ? "Adding..." : "Add to list"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
