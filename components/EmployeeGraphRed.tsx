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
    <div className="w-full h-full bg-(--background) rounded-8 shadow-soft border border-(--gray-1) p-4 space-y-1">
      {/* This Month */}
      <div className="space-y-1.5">
        <p className="text-base font-semibold text-(--gray-9)">Monthly target</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-(--primary)">19,8K</span>
          <div className="flex items-center gap-1 pb-0.5">
            <TrendingUp className="w-3.5 h-3.5 text-(--success)" />
            <span className="text-xs font-semibold text-(--success) bg-(--primary-0) px-1.5 py-0.5 rounded-8">
              +12.88%
            </span>
          </div>
        </div>

        {/* Chart - This Month */}
        <div className="h-12 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
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
                strokeWidth={2}
                fill="url(#gradientBlue)"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Last Month */}
      <div className="space-y-1.5">
        <p className="text-base font-semibold text-(--gray-9)">Last Month</p>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-(--destructive)">1,321</span>
          <div className="flex items-center gap-1 pb-0.5">
            <TrendingDown className="w-3.5 h-3.5 text-(--destructive)" />
            <span className="text-xs font-semibold text-(--destructive) bg-(--destructive-0) px-1.5 py-0.5 rounded-8">
              -3.53%
            </span>
          </div>
        </div>

        {/* Chart - Last Month */}
        <div className="h-12 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lastMonthData} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
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
                strokeWidth={2}
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
