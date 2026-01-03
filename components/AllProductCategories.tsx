"use client";

import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/index";
import { getAllProductCategories } from "@/store/slices/productCategory/getAllProductCategoriesSlice";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import StatusToggle from "@/components/form/StatusToggle";

export default function ProductCategoriesManager() {
  const dispatch = useAppDispatch();
  const { productCategories, loading, error } = useAppSelector(
    (state) => state.allProductCategories
  );
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Fetch product categories on component mount
  useEffect(() => {
    dispatch(getAllProductCategories());
  }, [dispatch]);

  const toggleStatus = (id: string) => {
    // TODO: Implement API call to update product category status
    console.log("Toggle status for product category:", id);
  };

  const deleteCategory = (id: string) => {
    // TODO: Implement API call to delete product category
    console.log("Delete product category:", id);
    setOpenMenuId(null);
  };

  const handleRetry = () => {
    dispatch(getAllProductCategories());
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
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={3}
            message="Loading product categories..."
          />
        </div>
      ) : error ? (
        <TableErrorState
          error={error}
          onRetry={handleRetry}
          title="Failed to load product categories"
        />
      ) : productCategories.length === 0 ? (
        <TableEmptyState
          message="No product categories found"
          description="There are currently no product categories in the system."
        />
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
