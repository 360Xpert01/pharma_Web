"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllProducts } from "@/store/slices/product/getAllProductsSlice";

interface Product {
  id: string;
  pulseCode: string;
  name: string;
  productCategory: string;
  skuCount: number;
  imageUrl?: string;
  productFormula: string;
}

export default function MedicineTable() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const dispatch = useAppDispatch();

  // Get products from Redux store
  const { products, loading, error, total } = useAppSelector((state) => state.allProducts);

  // Fetch products when page or items per page changes
  useEffect(() => {
    dispatch(getAllProducts({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handleRetry = () => {
    dispatch(getAllProducts({ page: currentPage, limit: itemsPerPage }));
  };

  const columns: ColumnDef<Product>[] = [
    {
      header: "Pulse Code",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.pulseCode}>
          {row.original.pulseCode}
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.name}>
          {row.original.name}
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "productCategory",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-3 py-1.5 rounded-8 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">
          {row.original.productCategory}
        </span>
      ),
    },
    {
      header: "SKU",
      accessorKey: "skuCount",
      cell: ({ row }) => <span className="t-val-sm">{row.original.skuCount}</span>,
    },
    {
      header: "Image",
      accessorKey: "imageUrl",
      cell: ({ row }) => (
        <div className="w-12 h-12 rounded-8 overflow-hidden ring-2 ring-[var(--gray-2)]">
          {row.original.imageUrl ? (
            <Image
              src={row.original.imageUrl}
              alt={row.original.name}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-[var(--gray-2)] flex items-center justify-center">
              <span className="text-xs text-[var(--gray-5)]">No Image</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Formula",
      accessorKey: "productFormula",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.productFormula}>
          {row.original.productFormula}
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
                label: "Edit Medicine",
                onClick: () => console.log("Edit", row.original.id),
              },
              {
                label: "View Details",
                onClick: () => console.log("View Details", row.original.id),
              },
              {
                label: "Delete",
                onClick: () => console.log("Delete", row.original.id),
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
        data={products || []}
        columns={columns}
        loading={loading}
        error={error}
        onRetry={handleRetry}
        enablePagination={true}
        pageSize={itemsPerPage}
        PaginationComponent={TablePagination}
        emptyMessage="No products found"
      />
    </div>
  );
}
