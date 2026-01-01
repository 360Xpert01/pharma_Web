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
    <div className="flex items-center justify-center p-8">
      <div className="w-full">
        {loading ? (
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={3}
            message="Loading prefixes..."
          />
        ) : error ? (
          <TableErrorState error={error} onRetry={handleRetry} title="Failed to load prefixes" />
        ) : prefixes.length === 0 ? (
          <TableEmptyState
            message="No prefixes found"
            description="There are currently no prefix codes in the system."
          />
        ) : (
          <div className="bg-[var(--background)] rounded-2xl shadow-soft border border-(--gray-1) overflow-hidden">
            <TableColumnHeader
              columns={[
                { label: "Entity Name", className: "flex-1" },
                { label: "Prefix Code", className: "flex-1" },
                { label: "Example", className: "" },
              ]}
              containerClassName="flex items-center"
              showBackground={false}
            />
            <div className="px-3 space-y-6">
              {prefixes.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 px-3 border border-(--gray-2) rounded-xl"
                >
                  {/* Table Name */}
                  <div className="text-lg font-medium w-[20%] text-(--gray-8)">{item.entity}</div>

                  <div className=" text-(--gray-7) w-[20%] flex justify-start font-semibold rounded-full text-sm">
                    {item.code}
                  </div>

                  <div className="flex items-center gap-12">
                    <div className=" text-(--gray-6) font-medium rounded-full text-sm">
                      {item.code}01
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
