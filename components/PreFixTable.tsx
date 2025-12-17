"use client";

import React from "react";

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
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-6">
            {prefixData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-4 px-6  border border-gray-200 rounded-xl"
              >
                {/* Table Name */}
                <div className="text-lg font-medium w-[20%] text-gray-800">{item.tableName}</div>

                <div className=" text-gray-700 w-[20%] flex justify-start font-semibold rounded-full text-sm">
                  {item.prefix}
                </div>

                <div className="flex items-center gap-12">
                  <div className=" text-gray-600 font-medium rounded-full text-sm">
                    {item.example}
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
