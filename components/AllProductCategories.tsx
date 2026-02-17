"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusBadge from "@/components/shared/StatusBadge";

interface ProductCategory {
  id: string;
  pulseCode: string;
  name: string;
  isActive: boolean;
}

export default function ProductCategoriesManager() {
  const [openId, setOpenId] = useState<string | null>(null);
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
    setOpenId(null);
  };

  const columns: ColumnDef<ProductCategory>[] = [
    {
      header: "ID",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.pulseCode || "N/A"}>
          {row.original.pulseCode || "N/A"}
        </div>
      ),
    },
    {
      header: "Category Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.name}>
          {row.original.name}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }) => (
        <div className="flex items-center">
          <StatusBadge status={row.original.isActive ? "active" : "inactive"} />
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
          <TableActionDropdown
            isOpen={openId === row.original.id}
            onToggle={() => setOpenId(openId === row.original.id ? null : row.original.id)}
            onClose={() => setOpenId(null)}
            items={[
              {
                label: "Edit Category",
                onClick: () => console.log("Edit Category", row.original.id),
              },
              {
                label: "Delete Category",
                onClick: () => deleteCategory(row.original.id),
                variant: "danger",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={productCategories}
        columns={columns}
        enablePagination={true}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No product categories found"
      />
    </div>
  );
}
