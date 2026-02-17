"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button/button";

interface ProductCategory {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

export default function AddProductCategoriesCard() {
  const [categories, setCategories] = useState<ProductCategory[]>([
    { id: "1", pulseCode: "PC_000001", name: "Antibiotics", isActive: true },
    { id: "2", pulseCode: "PC_000002", name: "Pain Relief", isActive: true },
    { id: "3", pulseCode: "PC_000003", name: "Vitamins", isActive: true },
    { id: "4", pulseCode: "PC_000004", name: "Cardiovascular", isActive: true },
    { id: "5", pulseCode: "PC_000005", name: "Diabetes Care", isActive: true },
    { id: "6", pulseCode: "PC_000006", name: "Respiratory", isActive: true },
    { id: "7", pulseCode: "PC_000007", name: "Gastrointestinal", isActive: true },
    { id: "8", pulseCode: "PC_000008", name: "Dermatology", isActive: true },
    { id: "9", pulseCode: "PC_000009", name: "Eye Care", isActive: true },
    { id: "10", pulseCode: "PC_000010", name: "Nutritional Supplements", isActive: true },
  ]);

  const [categoryName, setCategoryName] = useState("");
  const [generatedPrefix, setGeneratedPrefix] = useState("PC_000011");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-generate next pulse code
  useEffect(() => {
    if (categories.length > 0) {
      const lastPulseCode = categories[categories.length - 1].pulseCode;
      const lastNumber = parseInt(lastPulseCode.split("_")[1]);
      const nextNumber = (lastNumber + 1).toString().padStart(6, "0");
      setGeneratedPrefix(`PC_${nextNumber}`);
    }
  }, [categories]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newCategory: ProductCategory = {
        id: (categories.length + 1).toString(),
        pulseCode: generatedPrefix,
        name: categoryName.trim(),
        isActive: true,
      };

      setCategories([...categories, newCategory]);
      setCategoryName("");
      setSuccess(true);
      setLoading(false);
    }, 500);
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

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-[var(--success)]/10 text-[var(--success)] rounded-8 border border-[var(--success)]/20">
              Category added successfully!
            </div>
          )}

          {/* Add New Category Form */}
          <div className="flex gap-6 items-end">
            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
              {/* Pulse Code */}
              <FormInput
                label="Pulse Code"
                name="pulseCode"
                type="text"
                value={generatedPrefix}
                onChange={() => {}}
                placeholder="PC_000001"
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
