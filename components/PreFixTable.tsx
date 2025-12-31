"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrefixes } from "@/store/slices/preFix/getAllPrefixesSlice";
import TableColumnHeader from "@/components/TableColumnHeader";

export default function PrefixListComponent() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllPrefixes());
  }, [dispatch]);

  const { prefixes, loading, error } = useSelector((state: any) => state.allPrefixes);

  console.log("Prefixqwe", prefixes);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full">
        <div className="bg-[var(--background)] rounded-2xl shadow-lg border border-(--gray-1) overflow-hidden">
          <div className="px-6 py-4">
            <TableColumnHeader
              columns={[
                { label: "Entity Name", className: "flex-1" },
                { label: "Prefix Code", className: "flex-1" },
                { label: "Example", className: "" },
              ]}
              containerClassName="flex items-center px-6 py-2"
              showBackground={false}
            />
          </div>
          <div className="px-8  space-y-6">
            {prefixes.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 px-6  border border-(--gray-2) rounded-xl"
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
      </div>
    </div>
  );
}
