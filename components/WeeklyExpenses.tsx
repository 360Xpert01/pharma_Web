"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "03", value: 80 },
  { date: "04", value: 70 },
  { date: "05", value: 110 },
  { date: "06", value: 140 },
  { date: "07", value: 160 },
  { date: "08", value: 130 },
  { date: "09", value: 170 },
  { date: "10", value: 190 },
  { date: "11", value: 200 },
  { date: "12", value: 150 },
  { date: "13", value: 90 },
  { date: "14", value: 60 },
  { date: "15", value: 80 },
  { date: "16", value: 110 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-100">
        <p className="text-lg font-bold text-gray-900">{payload[0].value.toLocaleString()}</p>
        <p className="text-xs text-gray-500">SEP, {payload[0].payload.date} 2025</p>
      </div>
    );
  }
  return null;
};

export default function WeeklyExpensesChart() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Weekly Expenses</h2>
        <div className="flex items-center gap-3 bg-blue-50 text-blue-600 px-5 py-3 rounded-full text-sm font-medium hover:bg-blue-100 transition cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
          September, 27 2025
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Chart */}
      <div className="h-90">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            {/* Gradient Fill */}
            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#DBEAFE" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            {/* Grid & Axes */}
            <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9CA3AF", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              ticks={[0, 50, 100, 150, 200]}
              tick={{ fill: "#9CA3AF", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `Rs ${value}`}
            />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#93C5FD", strokeWidth: 2 }} />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#gradientFill)"
              //   dot={{ fill: "#3B82F6", r: 5, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
