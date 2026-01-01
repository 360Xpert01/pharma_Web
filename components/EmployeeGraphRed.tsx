"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

const monthlyData = [
  { value: 11100 },
  { value: 19200 },
  { value: 9800 },
  { value: 15500 },
  { value: 10200 },
  { value: 19800 },
];

const lastMonthData = [
  { value: 1520 },
  { value: 1480 },
  { value: 1320 },
  { value: 1280 },
  { value: 1021 },
];

export default function MonthlyTargetCard() {
  return (
    <div className="w-full h-full bg-(--background) rounded-2xl shadow-soft border border-(--gray-1) p-6 space-y-8">
      {/* This Month */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-(--gray-5)">Monthly target</p>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-(--primary)">19,8K</span>
          <div className="flex items-center gap-1 pb-1">
            <TrendingUp className="w-4 h-4 text-(--success)" />
            <span className="text-sm font-semibold text-(--success) bg-(--primary-0) px-2 py-0.5 rounded-full">
              +12.88%
            </span>
          </div>
        </div>

        {/* Chart - This Month */}
        <div className="h-24  -mb-8 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, left: 0, right: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f72f4" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#0f72f4" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="none" />
              <XAxis dataKey="value" hide />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0f72f4"
                strokeWidth={3}
                fill="url(#gradientBlue)"
                dot={false}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="border-t border-(--gray-1) -mx-6" />

      {/* Last Month */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-(--gray-5)">Last Month</p>
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-(--destructive)">1,321</span>
          <div className="flex items-center gap-1 pb-1">
            <TrendingDown className="w-4 h-4 text-(--destructive)" />
            <span className="text-sm font-semibold text-(--destructive) bg-(--destructive-0) px-2 py-0.5 rounded-full">
              -3.53%
            </span>
          </div>
        </div>

        {/* Chart - Last Month */}
        <div className="h-20 ">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lastMonthData} margin={{ top: 10, left: 0, right: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradientRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e02723" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#e02723" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="none" />
              <XAxis dataKey="value" hide />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#e02723"
                strokeWidth={3}
                fill="url(#gradientRed)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
