"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrefixes } from "@/store/slices/preFix/getAllPrefixesSlice";
import TableColumnHeader from "@/components/TableColumnHeader";

interface PrefixItem {
  tableName: string;
  prefix: string;
  example: string;
}

const prefixData: PrefixItem[] = [
  { tableName: "Employee Table", prefix: "EMP", example: "EMP-03" },
  { tableName: "Product Table", prefix: "PRD", example: "PRD-08" },
  { tableName: "Giveaway Samples", prefix: "GYS", example: "GYS-12" },
  { tableName: "Promotional Items", prefix: "PRM", example: "PRM-45" },
  { tableName: "Product Trials", prefix: "PTL", example: "PTL-34" },
  { tableName: "Exclusive Offers", prefix: "EOL", example: "EOL-89" },
  { tableName: "Seasonal Discounts", prefix: "SDC", example: "SDC-56" },
  { tableName: "Customer Rewards", prefix: "CRW", example: "CRW-78" },
];

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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                className="flex items-center justify-between py-4 px-6  border border-gray-200 rounded-xl"
              >
                {/* Table Name */}
                <div className="text-lg font-medium w-[20%] text-gray-800">{item.entity}</div>

                <div className=" text-gray-700 w-[20%] flex justify-start font-semibold rounded-full text-sm">
                  {item.code}
                </div>

                <div className="flex items-center gap-12">
                  <div className=" text-gray-600 font-medium rounded-full text-sm">
                    {item.code}-01
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
