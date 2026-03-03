"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import CenturoTable from "@/components/shared/table/CeturoTable";
import TablePagination from "@/components/TablePagination";
import TableActionDropdown from "@/components/shared/table/TableActionDropdown";
import StatusBadge from "@/components/shared/StatusBadge";
import EditIcon from "@/components/svgs/edit-icon";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getAllProductCategories,
  resetProductCategoriesState,
  ProductCategory,
} from "@/store/slices/productCategory/getAllProductCategoriesSlice";
import {
  updateProductCategory,
  resetUpdateProductCategoryState,
} from "@/store/slices/productCategory/updateProductCategorySlice";
interface AllProductCategoriesProps {
  onEditCategory?: (id: string) => void;
}

export default function AllProductCategories({ onEditCategory }: AllProductCategoriesProps) {
  const dispatch = useAppDispatch();
  const [openId, setOpenId] = useState<string | null>(null);
  const {
    productCategories,
    loading: fetchingLoading,
    error: fetchError,
    pagination,
  } = useAppSelector((state) => state.allProductCategories);
  const [sorting, setSorting] = useState<any[]>([]);

  // Initial load and when sorting changes
  useEffect(() => {
    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllProductCategories({
        page: 1,
        limit: 10,
        sort: sortField,
        order: sortOrder as any,
      })
    );

    return () => {
      dispatch(resetProductCategoriesState());
    };
  }, [dispatch, sorting]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    const sortField = sorting.length > 0 ? sorting[0].id : "";
    const sortOrder = sorting.length > 0 ? (sorting[0].desc ? "desc" : "asc") : "";

    dispatch(
      getAllProductCategories({
        page,
        limit: pageSize,
        sort: sortField,
        order: sortOrder as any,
      })
    );
  };

  const handleEdit = (id: string) => {
    if (onEditCategory) {
      onEditCategory(id);
    }
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
      accessorKey: "productCategory",
      cell: ({ row }) => (
        <div className="t-td-b truncate" title={row.original.productCategory}>
          {row.original.productCategory}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <div className="flex items-center">
          <StatusBadge status={row.original.status} />
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row.original.id);
            }}
            className="group hover:opacity-80 transition cursor-pointer"
            title="Edit Category"
          >
            <EditIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <CenturoTable
        data={productCategories || []}
        columns={columns}
        loading={fetchingLoading}
        error={fetchError}
        onRetry={() => dispatch(getAllProductCategories())}
        enableSorting={true}
        serverSideSorting={true}
        enablePagination={true}
        serverSidePagination={true}
        totalItems={pagination?.total || productCategories?.length || 0}
        onPaginationChange={handlePaginationChange}
        onSortChange={(newSorting) => setSorting(newSorting)}
        pageSize={10}
        PaginationComponent={TablePagination}
        emptyMessage="No product categories found"
      />
    </div>
  );
}
