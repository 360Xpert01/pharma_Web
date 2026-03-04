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
  status: string;
  name: string;
  productCategory: string;
}

export default function SampleManagTable({
  searchTerm,
  filters,
}: {
  searchTerm?: string;
  filters?: { categoryId?: string; status?: string };
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sorting, setSorting] = useState<any[]>([]);
  const dispatch = useDispatch<any>();

  const { products, loading, error, total } = useSelector((state: any) => state.allProducts);

  useEffect(() => {
    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllProducts({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        categoryId: filters?.categoryId,
        status: filters?.status,
        sort: sortField,
        order: sortOrder as any,
      })
    );
  }, [dispatch, searchTerm, filters, sorting, currentPage, itemsPerPage]);

  const handleRetry = () => {
    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllProducts({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        categoryId: filters?.categoryId,
        status: filters?.status,
        sort: sortField,
        order: sortOrder as any,
      })
    );
  };

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setItemsPerPage(size);
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
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.status || "N/A"}>
          {row.original.status || "N/A"}
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
        serverSidePagination={true}
        serverSideSorting={true}
        totalItems={total}
        onPaginationChange={handlePaginationChange}
        onSortChange={(newSorting) => setSorting(newSorting)}
        pageSize={itemsPerPage}
        PaginationComponent={TablePagination}
        emptyMessage="No products found"
      />
    </div>
  );
}
