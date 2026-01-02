"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrefixes } from "@/store/slices/preFix/getAllPrefixesSlice";
import TableColumnHeader from "@/components/TableColumnHeader";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";

export default function PrefixListComponent() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllPrefixes());
  }, [dispatch]);

  const { prefixes, loading, error } = useSelector((state: any) => state.allPrefixes);

  console.log("Prefixqwe", prefixes);

  const handleRetry = () => {
    dispatch(getAllPrefixes());
  };

  return (
    <div>
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={3}
            message="Loading prefixes..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load prefixes" />
      ) : prefixes.length === 0 ? (
        <TableEmptyState
          message="No prefixes found"
          description="There are currently no prefix codes in the system."
        />
      ) : (
        <div>
          <TableColumnHeader
            columns={[
              { label: "Entity Name", className: "w-[35%] text-left" },
              { label: "Prefix Code", className: "w-[35%] text-center" },
              { label: "Example", className: "w-[30%] text-right pr-2" },
            ]}
            containerClassName="flex w-[98%] mx-4"
            showBackground={false}
          />

          {prefixes.map((item: any, index: number) => (
            <div
              key={index}
              className="py-3 w-[98%] flex items-center hover:bg-(--gray-0) transition-all cursor-pointer border border-(--gray-2) mx-4 my-3 rounded-2xl bg-[var(--background)]"
            >
              <div className="w-[35%] text-sm font-bold text-(--gray-9) pl-4" title={item.entity}>
                {item.entity}
              </div>

              <div className="w-[35%] text-sm text-(--gray-6) text-center" title={item.code}>
                {item.code}
              </div>

              <div className="w-[30%] text-sm font-bold text-(--gray-9) text-right pr-6">
                {item.code}-{String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
