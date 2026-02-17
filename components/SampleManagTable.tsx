"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/slices/product/getAllProductsSlice";
import { formatDate } from "@/utils/formatDate";

interface Product {
  id: string;
  pulseCode: string;
  createdAt: string;
  name: string;
  productCategory: string;
}

export default function SampleManagTable() {
  const [openId, setOpenId] = useState<string | null>(null);
  const dispatch = useDispatch<any>();

  const { products, loading, error } = useSelector((state: any) => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(getAllProducts());
  };

  const columns: ColumnDef<Product>[] = [
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
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={formatDate(row.original.createdAt)}>
          {formatDate(row.original.createdAt)}
        </div>
      ),
    },
    {
      header: "Product Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.name || "N/A"}>
          {row.original.name || "N/A"}
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "productCategory",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.productCategory || "N/A"}>
          {row.original.productCategory || "N/A"}
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
                label: "Edit",
                onClick: () => console.log("Edit", row.original.id),
              },
              {
                label: "Duplicate",
                onClick: () => console.log("Duplicate", row.original.id),
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
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No products found"
      />
    </div>
  );
}
