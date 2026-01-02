"use client";

import React, { useState } from "react";
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
  { date: "05", value: 20 },
  { date: "13", value: 90 },
  { date: "14", value: 60 },
  { date: "15", value: 80 },
  { date: "16", value: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-(--light) px-4 py-2 rounded-8 shadow-soft border border-(--gray-1)">
        <p className="text-lg font-bold text-(--gray-9)">{payload[0].value.toLocaleString()}</p>
        <p className="text-xs text-(--gray-5)">SEP, {payload[0].payload.date} 2025</p>
      </div>
    );
  }
  return null;
};

export default function WeeklyExpensesChart() {
  const [displayDate, setDisplayDate] = useState("September, 27 2025");

  const handlePreviousMonth = () => {
    setDisplayDate("August, 27 2025");
  };

  const handleNextMonth = () => {
    setDisplayDate("October, 27 2025");
  };

  return (
    <div className="w-full bg-(--light) rounded-8 shadow-soft border border-(--gray-1) p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-(--gray-9)">Weekly Expenses</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousMonth}
            className="p-1 hover:bg-(--light) rounded-8 transition-colors cursor-pointer"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-(--primary)" />
          </button>
          <span className="text-sm font-medium text-(--primary) min-w-[140px] text-center">
            {displayDate}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-(--light) rounded-8 transition-colors cursor-pointer"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-(--primary)" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            {/* Gradient Fill */}
            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--primary-0)" stopOpacity={0.1} />
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
              ticks={[0, 50, 100]}
              tick={{ fill: "#9CA3AF", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `Rs ${value}`}
            />

            {/* Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "var(--primary-1)", strokeWidth: 2 }}
            />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={3}
              fill="url(#gradientFill)"
              //   dot={{ fill: "var(--primary)", r: 5, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
