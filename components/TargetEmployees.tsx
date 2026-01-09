"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

interface MonthlyData {
  month: string;
  value: number;
}

interface MonthlyTargetsProps {
  currentMonth: number;
  lastMonth: number;
  data?: MonthlyData[];
  date?: string;
}

const defaultData: MonthlyData[] = [
  { month: "JAN", value: 45 },
  { month: "FEB", value: 52 },
  { month: "MAR", value: 58 },
  { month: "APR", value: 48 },
  { month: "MAY", value: 75 },
  { month: "JUN", value: 68 },
  { month: "JUL", value: 50 },
  { month: "AUG", value: 42 },
  { month: "SEP", value: 70 },
  { month: "OCT", value: 40 },
  { month: "NOV", value: 60 },
  { month: "DEC", value: 48 },
];

export default function MonthlyTargets({
  currentMonth = 75.08,
  lastMonth = 45.27,
  data = defaultData,
  date = "September, 27 2025",
}: MonthlyTargetsProps) {
  const [displayDate, setDisplayDate] = useState(date);

  const handlePreviousMonth = () => {
    setDisplayDate("August, 27 2025");
  };

  const handleNextMonth = () => {
    setDisplayDate("October, 27 2025");
  };

  return (
    <div className="w-full bg-(--light) rounded-8  p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-semibold text-(--dark)">Monthly Targets</h2>
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

      {/* Metrics */}
      <div className="flex gap-8 mb-8">
        <div>
          <p className="text-sm text-muted-foreground mb-1">This month</p>
          <p className="text-3xl font-bold text-(--primary)">{currentMonth}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Last month</p>
          <p className="text-3xl font-bold text-(--destructive)">{lastMonth}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-68">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            {/* Gradient ko yahan define karo, Bar ke BAHAR */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary-1)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--primary-0)" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="0" stroke="transparent" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="currentColor"
              style={{ fontSize: "12px", fill: "var(--muted-foreground)" }}
              axisLine={{ stroke: "transparent" }}
              tickLine={{ stroke: "transparent" }}
            />
            <YAxis hide={true} domain={[0, 80]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
              }}
              cursor={{ fill: "transparent" }}
              formatter={(value: any) => [`${value}`, ""]} // Optional: label add kar sakte ho
            />

            {/* Cell hata do — direct fill use karo */}
            <Bar
              dataKey="value"
              fill="url(#barGradient)"
              radius={[20, 20, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
