"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, ChevronDown } from "lucide-react";

// Mock data as per image_10d4ba trend
const data = [
  { month: "Jan", value: 48000 },
  { month: "Feb", value: 63000 },
  { month: "Mar", value: 68000 },
  { month: "Apr", value: 64000 },
  { month: "Jun", value: 62000 },
  { month: "July", value: 65000 },
  { month: "Aug", value: 82000 },
  { month: "Sep", value: 85000 },
  { month: "Oct", value: 84000 },
  { month: "Nov", value: 81000 },
  { month: "Dec", value: 84000 },
];

export default function SalesTrendChart() {
  return (
    <div className="w-full bg-white rounded-[8px] shadow-sm border border-gray-100 p-8">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-4">
        <h2 className="text-xl font-bold text-[#334155]">Sales Trend</h2>

        {/* Filters Group */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
            <button className="px-5 py-1.5 text-sm font-bold text-gray-400">Today</button>
            <button className="px-5 py-1.5 text-sm font-bold bg-white text-gray-500 shadow-sm rounded-md border border-gray-100">
              Last month
            </button>
          </div>

          <span className="text-sm text-gray-400 font-medium">Compare to</span>

          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-500">
            <Calendar size={16} />
            2023-2-15 ~ 2024-01-16
          </button>

          {/* Blue SKU Selector Dropdown */}
          <button className="flex items-center justify-between gap-4 px-4 py-2 bg-[#1E75FF] text-white rounded-lg text-sm font-bold min-w-[150px]">
            --Select SKU's---
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Line Chart Section */}
      <div className="h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 14, fontWeight: 500 }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 14, fontWeight: 500 }}
              tickFormatter={(value) => `${value / 1000}K`}
              domain={[0, 100000]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1E75FF"
              strokeWidth={3}
              dot={{ r: 6, fill: "#1E75FF", strokeWidth: 3, stroke: "#fff" }}
              activeDot={{ r: 8, fill: "#1E75FF", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
