"use client";

import React, { useCallback, useMemo } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import CenturoTable from "@/components/shared/table/CeturoTable";
import { ConfirmModal } from "./shared/confirm-modal";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

interface ProductSkuSectionProps {
  skus: any[];
  setSkus: React.Dispatch<React.SetStateAction<any[]>>;
  mode: "add" | "edit";
  validationErrors: Record<string, string>;
  clearFieldError: (fieldName: string) => void;
  getErrorMessage: (fieldName: string) => string;
  hasError: (fieldName: string) => boolean;
}

export default function ProductSkuSection({
  skus,
  setSkus,
  mode,
  validationErrors,
  clearFieldError,
  getErrorMessage,
  hasError,
}: ProductSkuSectionProps) {
  const [skuToDeleteIndex, setSkuToDeleteIndex] = useState<number | null>(null);
  // Memoize validation helpers
  const getSkuErrorMessage = useCallback(
    (index: number, field: string) => validationErrors[`productSkus.${index}.${field}`] || "",
    [validationErrors]
  );

  const hasSkuError = useCallback(
    (index: number, field: string) => !!validationErrors[`productSkus.${index}.${field}`],
    [validationErrors]
  );

  const updateSkuRow = useCallback(
    (index: number, field: string, value: string) => {
      setSkus((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    [setSkus]
  );

  const removeSku = useCallback((index: number) => {
    setSkuToDeleteIndex(index);
  }, []);

  const handleConfirmDelete = () => {
    if (skuToDeleteIndex !== null) {
      setSkus((prev) => prev.filter((_, i) => i !== skuToDeleteIndex));
      setSkuToDeleteIndex(null);
    }
  };

  const addSkuRow = () => {
    setSkus((prev) => [
      ...prev,
      {
        sku: "",
        skuCode: "",
        market_selling_price: "",
        trade_price: "",
        net_selling_price: "",
        quantity: "",
      },
    ]);
    clearFieldError("productSkus");
  };

  // Column definitions for CenturoTable
  const skuColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "pulseCode",
        header: () => (
          <span>
            Pulse Code<span className="text-(--destructive)">*</span>
          </span>
        ),
        cell: ({ row }) => (
          <input
            type="text"
            value={row.original.pulseCode || "TO BE GENERATED"}
            onChange={() => {}}
            readOnly
            className={`w-full px-3 py-2 border border-(--gray-3) outline-none rounded-8 text-sm transition-all cursor-not-allowed ${
              mode === "edit" ? "bg-white text-(--gray-9)" : "bg-(--gray-1) text-(--gray-5)"
            }`}
            placeholder="Auto-generated"
          />
        ),
      },
      {
        accessorKey: "sku",
        header: () => (
          <span>
            SKU Name<span className="text-(--destructive)">*</span>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={row.original.sku}
              onChange={(e) => {
                updateSkuRow(row.index, "sku", e.target.value);
                clearFieldError(`productSkus.${row.index}.sku`);
              }}
              className={`w-full px-3 py-2 font-medium bg-white border border-(--gray-3) outline-none focus:ring-2 focus:ring-(--primary) rounded-8 text-sm transition-all ${
                hasSkuError(row.index, "sku")
                  ? "border-(--destructive) focus:ring-(--destructive)"
                  : ""
              }`}
              placeholder="SKU Name"
            />
            {hasSkuError(row.index, "sku") && (
              <span className="text-[10px] text-(--destructive) leading-none px-1">
                {getSkuErrorMessage(row.index, "sku")}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "skuCode",
        header: () => (
          <span>
            SKU Code<span className="text-(--destructive)">*</span>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={row.original.skuCode}
              onChange={(e) => {
                updateSkuRow(row.index, "skuCode", e.target.value);
                clearFieldError(`productSkus.${row.index}.skuCode`);
              }}
              className={`w-full px-3 py-2 bg-white border border-(--gray-3) outline-none focus:ring-2 focus:ring-(--primary) rounded-8 text-sm transition-all ${
                hasSkuError(row.index, "skuCode")
                  ? "border-(--destructive) focus:ring-(--destructive)"
                  : ""
              }`}
              placeholder="Code"
            />
            {hasSkuError(row.index, "skuCode") && (
              <span className="text-[10px] text-(--destructive) leading-none px-1">
                {getSkuErrorMessage(row.index, "skuCode")}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "market_selling_price",
        header: () => (
          <span>
            Market Selling Price<span className="text-(--destructive)">*</span>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={row.original.market_selling_price}
              onChange={(e) => {
                updateSkuRow(row.index, "market_selling_price", e.target.value);
                clearFieldError(`productSkus.${row.index}.market_selling_price`);
              }}
              className={`w-full px-3 py-2 bg-white border border-(--gray-3) outline-none focus:ring-2 focus:ring-(--primary) rounded-8 text-sm transition-all ${
                hasSkuError(row.index, "market_selling_price")
                  ? "border-(--destructive) focus:ring-(--destructive)"
                  : ""
              }`}
              placeholder="Price"
            />
            {hasSkuError(row.index, "market_selling_price") && (
              <span className="text-[10px] text-(--destructive) leading-none px-1">
                {getSkuErrorMessage(row.index, "market_selling_price")}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "trade_price",
        header: () => (
          <span>
            Trade Price<span className="text-(--destructive)">*</span>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={row.original.trade_price}
              onChange={(e) => {
                updateSkuRow(row.index, "trade_price", e.target.value);
                clearFieldError(`productSkus.${row.index}.trade_price`);
              }}
              className={`w-full px-3 py-2 bg-white border border-(--gray-3) outline-none focus:ring-2 focus:ring-(--primary) rounded-8 text-sm transition-all ${
                hasSkuError(row.index, "trade_price")
                  ? "border-(--destructive) focus:ring-(--destructive)"
                  : ""
              }`}
              placeholder="Price"
            />
            {hasSkuError(row.index, "trade_price") && (
              <span className="text-[10px] text-(--destructive) leading-none px-1">
                {getSkuErrorMessage(row.index, "trade_price")}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "net_selling_price",
        header: () => (
          <span>
            Net Selling Price<span className="text-(--destructive)">*</span>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={row.original.net_selling_price}
              onChange={(e) => {
                updateSkuRow(row.index, "net_selling_price", e.target.value);
                clearFieldError(`productSkus.${row.index}.net_selling_price`);
              }}
              className={`w-full px-3 py-2 bg-white border border-(--gray-3) outline-none focus:ring-2 focus:ring-(--primary) rounded-8 text-sm transition-all ${
                hasSkuError(row.index, "net_selling_price")
                  ? "border-(--destructive) focus:ring-(--destructive)"
                  : ""
              }`}
              placeholder="Price"
            />
            {hasSkuError(row.index, "net_selling_price") && (
              <span className="text-[10px] text-(--destructive) leading-none px-1">
                {getSkuErrorMessage(row.index, "net_selling_price")}
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "quantity",
        header: () => (
          <span>
            Quantity<span className="text-(--destructive)">*</span>
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={row.original.quantity}
              onChange={(e) => {
                updateSkuRow(row.index, "quantity", e.target.value);
                clearFieldError(`productSkus.${row.index}.quantity`);
              }}
              className={`w-full px-3 py-2 bg-white border border-(--gray-3) outline-none focus:ring-2 focus:ring-(--primary) rounded-8 text-sm transition-all ${
                hasSkuError(row.index, "quantity")
                  ? "border-(--destructive) focus:ring-(--destructive)"
                  : ""
              }`}
              placeholder="Qty"
            />
            {hasSkuError(row.index, "quantity") && (
              <span className="text-[10px] text-(--destructive) leading-none px-1">
                {getSkuErrorMessage(row.index, "quantity")}
              </span>
            )}
          </div>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="text-right">
            <button
              onClick={() => removeSku(row.index)}
              className="p-1 hover:text-(--destructive) transition-colors"
            >
              <X className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        ),
      },
    ],
    [updateSkuRow, clearFieldError, hasSkuError, removeSku, mode, getSkuErrorMessage]
  );

  return (
    <div className="bg-background shadow-soft p-6 lg:p-8 rounded-8 border border-(--gray-1) space-y-6 overflow-hidden">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-(--gray-9)">Product SKUs</h3>
        <p className="text-sm text-(--gray-5)">Manage individual SKUs for this product</p>
      </div>

      <div className="space-y-4">
        {skus.length > 0 && (
          <div className="w-full overflow-x-auto">
            <CenturoTable
              data={skus}
              columns={skuColumns}
              renderTableFooter={() => (
                <div className="flex justify-start px-4 py-3 border-t border-(--gray-2) bg-(--gray-0)/5 transition-colors">
                  <Button
                    onClick={addSkuRow}
                    variant="outline"
                    size="lg"
                    icon={Plus}
                    rounded="full"
                    className="bg-(--primary) text-white hover:bg-(--primary)/90 hover:text-white"
                  >
                    Add Row
                  </Button>
                </div>
              )}
            />
          </div>
        )}

        {hasError("productSkus") && (
          <p className="mt-1 t-sm t-err">{getErrorMessage("productSkus")}</p>
        )}
      </div>

      <ConfirmModal
        isOpen={skuToDeleteIndex !== null}
        onClose={() => setSkuToDeleteIndex(null)}
        onConfirm={handleConfirmDelete}
        title="Remove SKU?"
        description="Are you sure you want to remove this SKU? This action cannot be undone."
        confirmLabel="Remove"
      />
    </div>
  );
}
