"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Calendar, ChevronDown } from "lucide-react";

interface ProductSku {
  sku: string;
}

interface ProductSkuChartProps {
  skus?: ProductSku[];
}

export default function ProductSkuChart({ skus = [] }: ProductSkuChartProps) {
  const chartData = skus.map((item) => ({
    name: item.sku,
    value: Math.floor(Math.random() * 50000) + 30000, // Placeholder value logic if API doesn't provide it
  }));
  return (
    <div className="w-full bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h2 className="text-xl font-bold text-[#334155]">Product SKU's</h2>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Today Toggle */}
          <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
            <button className="px-4 py-1.5 text-sm font-bold bg-white text-blue-600 shadow-sm rounded-md border border-blue-100">
              Today
            </button>
          </div>

          {/* Last Month Dropdown */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-500">
            Last month <ChevronDown size={16} />
          </button>

          <span className="text-sm text-gray-400 font-medium mx-1">Compare to</span>

          {/* Date Picker Range */}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-500">
            <Calendar size={16} />
            2023-2-15 ~ 2024-01-16
          </button>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                <stop offset="100%" stopColor="#EFF6FF" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="name"
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
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 shadow-xl border border-gray-50 rounded-xl flex flex-col items-center">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                        Displayza - 10mg
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <p className="text-lg font-bold text-blue-600">84.2%</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" fill="url(#barGradient)" radius={[40, 40, 0, 0]} barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
