"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";
import StatusToggle from "@/components/form/StatusToggle";

interface ProductCategory {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

export default function ProductCategoriesManager() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([
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
    { id: "11", pulseCode: "PC_000011", name: "Oncology", isActive: true },
    { id: "12", pulseCode: "PC_000012", name: "Neurology", isActive: true },
    { id: "13", pulseCode: "PC_000013", name: "Immunology", isActive: false },
    { id: "14", pulseCode: "PC_000014", name: "Pediatric Care", isActive: true },
    { id: "15", pulseCode: "PC_000015", name: "Women's Health", isActive: true },
  ]);

  const toggleStatus = (id: string) => {
    setProductCategories(
      productCategories.map((category) =>
        category.id === id ? { ...category, isActive: !category.isActive } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setProductCategories(productCategories.filter((category) => category.id !== id));
    setOpenMenuId(null);
  };

  // Define columns for the table header
  const categoryColumns = [
    { label: "Pulse Code", className: "w-[35%] ml-3" },
    { label: "Category Name", className: "w-[50%]" },
    { label: "Status", className: "w-[5%]" },
    { label: "", className: "w-[0%]" },
  ];

  return (
    <div className="w-full overflow-hidden bg-(--background)">
      {productCategories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="t-h3 text-[var(--gray-6)]">No product categories found</p>
          <p className="t-sm text-[var(--gray-5)] mt-2">
            There are currently no product categories in the system.
          </p>
        </div>
      ) : (
        <div>
          {/* Column Headers */}
          <TableColumnHeader
            columns={categoryColumns}
            containerClassName="flex w-[80%]"
            showBackground={false}
          />

          {/* List */}
          <div>
            {productCategories.map((category) => (
              <div
                key={category.id}
                className="px-3 py-3 w-[98%] flex items-center gap-6 hover:bg-[var(--gray-0)] transition-all cursor-pointer border border-[var(--gray-2)] mx-4 my-3 rounded-8 bg-[var(--background)]"
              >
                {/* Pulse Code */}
                <div
                  className="w-[30%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={category.pulseCode}
                >
                  {category.pulseCode}
                </div>

                {/* Category Name */}
                <div
                  className="w-[40%] text-sm font-bold text-[var(--gray-9)] truncate"
                  title={category.name}
                >
                  {category.name}
                </div>

                {/* Status Toggle */}
                <div className="w-[30%] flex items-center">
                  <StatusToggle
                    status={category.isActive ? "Active" : "Inactive"}
                    onChange={() => toggleStatus(category.id)}
                  />
                </div>

                {/* Three-dot Menu */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === category.id ? null : category.id);
                    }}
                    className="p-2 hover:bg-[var(--gray-1)] rounded-full transition"
                  >
                    <MoreVertical className="w-5 h-5 text-[var(--gray-7)]" />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === category.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-0 top-10 mt-2 w-48 bg-[var(--light)] rounded-8 shadow-soft border border-[var(--gray-2)] z-50">
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--gray-1)] cursor-pointer transition">
                          Edit Category
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="w-full text-left px-4 py-2 text-sm text-[var(--destructive)] hover:bg-[var(--gray-1)] cursor-pointer transition"
                        >
                          Delete Category
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
