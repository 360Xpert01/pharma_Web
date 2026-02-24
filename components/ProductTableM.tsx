"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageWithFallback from "@/components/shared/ImageWithFallback";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import EditIcon from "@/components/svgs/edit-icon";
import EyeIcon from "@/components/svgs/eye-icon";
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

export default function MedicineTable({
  searchTerm,
  filters,
}: {
  searchTerm?: string;
  filters?: { categoryId?: string; status?: string };
}) {
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const dispatch = useAppDispatch();

  // Get products from Redux store
  const { products, loading, error, total } = useAppSelector((state) => state.allProducts);

  // Fetch products with filters
  useEffect(() => {
    dispatch(
      getAllProducts({
        page: 1,
        limit: 10,
        search: searchTerm,
        categoryId: filters?.categoryId,
        status: filters?.status,
      })
    );
  }, [dispatch, searchTerm, filters]);

  const handleRetry = () => {
    dispatch(getAllProducts({ page: 1, limit: 10 }));
  };

  // Handle pagination changes from the table
  const handlePaginationChange = (page: number, pageSize: number) => {
    dispatch(
      getAllProducts({
        page,
        limit: pageSize,
        search: searchTerm,
        categoryId: filters?.categoryId,
        status: filters?.status,
      })
    );
  };

  const columns: ColumnDef<Product>[] = [
    {
      header: "ID",
      accessorKey: "pulseCode",
      cell: ({ row }) => (
        <div className="t-td-b" title={row.original.pulseCode}>
          {row.original.pulseCode}
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b" title={row.original.name}>
          {row.original.name}
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "productCategory",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-3 py-1.5 rounded-8 text-xs bg-[var(--primary)]/10 text-[var(--primary)]">
          {row.original.productCategory}
        </span>
      ),
    },
    {
      header: "SKU",
      accessorKey: "skuCount",
      cell: ({ row }) => <span className="t-td-b">{row.original.skuCount}</span>,
    },
    {
      header: "Image",
      accessorKey: "imageUrl",
      cell: ({ row }) => (
        <div className="w-12 h-12 rounded-8 overflow-hidden ring-2 ring-[var(--gray-2)]">
          <ImageWithFallback
            src={row.original.imageUrl}
            alt={row.original.name}
            width={36}
            height={36}
            className="rounded-8 flex-shrink-0 object-contain w-9 h-9 border border-gray-100 p-0.5"
            fallbackSrc="/images/MedicinePlaceholder.svg"
          />
        </div>
      ),
    },
    {
      header: "Formula",
      accessorKey: "productFormula",
      cell: ({ row }) => (
        <div className="t-td-b" title={row.original.productFormula}>
          {row.original.productFormula}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-3 justify-end" onClick={(e) => e.stopPropagation()}>
          {/* Edit Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/UpdateProduct?id=${row.original.id}`);
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="Edit Product"
          >
            <EditIcon />
          </button>

          {/* View Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/product-details?id=${row.original.id}`);
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="View Details"
          >
            <EyeIcon />
          </button>
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
        serverSidePagination={true}
        totalItems={total}
        onPaginationChange={handlePaginationChange}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No products found"
      />
    </div>
  );
}
