"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface MonthlyCallsProps {
  totalCalls?: number;
  percentageChange?: number;
  trend?: "up" | "down";
  data?: Array<{ value: number }>;
}

// Default data for the area chart
const defaultData = [
  { value: 11100 },
  { value: 19200 },
  { value: 9800 },
  { value: 15500 },
  { value: 10200 },
  { value: 19800 },
];

export default function MonthlyCalls({
  totalCalls = 150,
  percentageChange = 12,
  trend = "up",
  data = defaultData,
}: MonthlyCallsProps) {
  const isUpTrend = trend === "up";
  const TrendIcon = isUpTrend ? TrendingUp : TrendingDown;
  const strokeColor = isUpTrend ? "#0f72f4" : "#e02723";
  const gradientId = isUpTrend ? "gradientBlueCall" : "gradientRedCall";
  const textColor = isUpTrend ? "text-(--primary)" : "text-(--destructive)";
  const badgeBg = isUpTrend ? "bg-(--primary-0)" : "bg-(--destructive-0)";
  const iconColor = isUpTrend ? "text-(--success)" : "text-(--destructive)";

  return (
    <div className="w-full bg-background rounded-8 p-4 shadow-soft border border-gray-1">
      {/* Header */}
      <div className="space-y-1.5">
        <p className="text-base font-semibold text-(--gray-9)">Monthly Calls</p>

        {/* Main Number with Trend Badge */}
        <div className="flex items-end gap-2">
          <span className={`text-2xl font-bold ${textColor}`}>{totalCalls}</span>
          <div className="flex items-center gap-1 pb-0.5">
            <TrendIcon className={`w-3.5 h-3.5 ${iconColor}`} />
            <span
              className={`text-xs font-semibold ${textColor} ${badgeBg} px-1.5 py-0.5 rounded-8`}
            >
              {isUpTrend ? "+" : "-"}
              {percentageChange}%
            </span>
          </div>
        </div>

        {/* Area Chart */}
        <div className="h-12 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="none" />
              <XAxis dataKey="value" hide />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke={strokeColor}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
