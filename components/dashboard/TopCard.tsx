"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Package, DollarSign, FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardData {
  id: string;
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
  trend?: "up" | "down";
  chart?: "line" | "bar" | "radial" | "arc" | "progress";
}

interface TopCardsProps {
  cards?: CardData[];
  className?: string;
}

const defaultCards: CardData[] = [
  {
    id: "call-logged",
    title: "Call Logged",
    value: "430",
    color: "text-blue-500",
    chart: "line",
  },
  {
    id: "coverage",
    title: "Coverage",
    value: "60%",
    color: "text-green-500",
    chart: "arc",
  },
  {
    id: "order-captured",
    title: "Order Captured",
    value: "$124K",
    color: "text-cyan-500",
    chart: "line",
  },
  {
    id: "sample-distributed",
    title: "Sample Distributed",
    value: "100",
    color: "text-red-400",
    icon: <Package className="w-8 h-8 text-red-400" />,
  },
  {
    id: "expense-submitted",
    title: "Expense Submitted",
    value: "Rs.40k",
    color: "text-purple-500",
    icon: <FileText className="w-8 h-8 text-purple-500" />,
  },
  {
    id: "attendance-compliance",
    title: "Attendance Compliance",
    value: "92%",
    color: "text-cyan-500",
    chart: "progress",
  },
];

// Mini Line Chart Component with shadow/fill
const MiniLineChart = ({ color }: { color: string }) => {
  const points = [
    { x: 0, y: 26 },
    { x: 13, y: 20 },
    { x: 26, y: 24 },
    { x: 40, y: 16 },
    { x: 53, y: 21 },
    { x: 66, y: 13 },
    { x: 80, y: 18 },
  ];

  // Map text colors to actual color values for gradient
  const colorMap: Record<string, string> = {
    "text-blue-500": "#3b82f6",
    "text-green-500": "#22c55e",
    "text-cyan-500": "#06b6d4",
    "text-red-400": "#f87171",
    "text-purple-500": "#a855f7",
  };

  const actualColor = colorMap[color] || "#3b82f6";

  // Create smooth curve path using quadratic bezier curves
  const createSmoothPath = () => {
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlX = (current.x + next.x) / 2;
      const controlY = (current.y + next.y) / 2;

      path += ` Q ${current.x} ${current.y}, ${controlX} ${controlY}`;

      if (i === points.length - 2) {
        path += ` T ${next.x} ${next.y}`;
      }
    }

    return path;
  };

  const linePath = createSmoothPath();

  // Create path for fill area (line + bottom)
  const fillPath = `${linePath} L 80 35 L 0 35 Z`;

  return (
    <svg width="80" height="35" viewBox="0 0 80 35" fill="none" className="mt-0">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={actualColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={actualColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Fill area below line */}
      <path d={fillPath} fill={`url(#gradient-${color})`} />

      {/* Line */}
      <path
        d={linePath}
        stroke={actualColor}
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Mini Bar Chart Component
const MiniBarChart = ({ color }: { color: string }) => (
  <div className="flex items-end gap-1 mt-2 h-[30px]">
    <div className={cn("w-2 rounded-t-sm", color, "bg-current")} style={{ height: "60%" }} />
    <div className={cn("w-2 rounded-t-sm", color, "bg-current")} style={{ height: "80%" }} />
    <div className={cn("w-2 rounded-t-sm", color, "bg-current")} style={{ height: "40%" }} />
    <div className={cn("w-2 rounded-t-sm", color, "bg-current")} style={{ height: "90%" }} />
    <div className={cn("w-2 rounded-t-sm", color, "bg-current")} style={{ height: "70%" }} />
  </div>
);

// Radial Progress Component
const RadialProgress = ({ value, color }: { value: string; color: string }) => {
  const percentage = parseInt(value);
  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="50" height="50" viewBox="0 0 50 50" className="mt-2">
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        className="text-(--gray-2)"
      />
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={color}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
    </svg>
  );
};

// Arc Progress Component (Semi-circle gauge)
const ArcProgress = ({ value, color }: { value: string; color: string }) => {
  const percentage = parseInt(value);
  const radius = 20;
  const circumference = Math.PI * radius; // Half circle
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="50" height="30" viewBox="0 0 50 30" className="mt-1">
      {/* Background arc */}
      <path
        d="M 5 25 A 20 20 0 0 1 45 25"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        className="text-(--gray-2)"
      />
      {/* Foreground arc */}
      <path
        d="M 5 25 A 20 20 0 0 1 45 25"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={color}
      />
    </svg>
  );
};

// Progress Bar Component (Compact for inline display)
const ProgressBar = ({ value, color }: { value: string; color: string }) => {
  const percentage = parseInt(value);

  // Map color classes to background colors
  const bgColorMap: Record<string, string> = {
    "text-blue-500": "bg-blue-500",
    "text-green-500": "bg-green-500",
    "text-cyan-500": "bg-cyan-500",
    "text-red-400": "bg-red-400",
    "text-purple-500": "bg-purple-500",
  };

  const bgColor = bgColorMap[color] || "bg-cyan-500";

  return (
    <div className="w-[80px] mt-0">
      <div className="w-full h-2.5 bg-(--gray-2) rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", bgColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function TopCards({ cards = defaultCards, className }: TopCardsProps) {
  // Map text color classes to actual hex values
  const getColorValue = (colorClass: string) => {
    const colorMap: Record<string, string> = {
      "text-blue-500": "#3b82f6",
      "text-green-500": "#22c55e",
      "text-cyan-500": "#06b6d4",
      "text-red-400": "#f87171",
      "text-purple-500": "#a855f7",
    };
    return colorMap[colorClass] || "#3b82f6";
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4",
        className
      )}
    >
      {cards.map((card) => (
        <Card key={card.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex flex-col">
            {/* Title */}
            <span className="t-sm text-(--gray-6) mb-2">{card.title}</span>

            {/* Value and Chart/Icon in horizontal layout */}
            <div className="flex items-center justify-between">
              {/* Value with inline color */}
              <span
                className="t-h3 font-bold"
                style={{ color: getColorValue(card.color || "text-blue-500") }}
              >
                {card.value}
              </span>

              {/* Chart/Icon */}
              <div className="shrink-0">
                {card.chart === "line" && <MiniLineChart color={card.color || "text-blue-500"} />}
                {card.chart === "bar" && <MiniBarChart color={card.color || "text-cyan-500"} />}
                {card.chart === "radial" && (
                  <RadialProgress
                    value={card.value.toString()}
                    color={card.color || "text-green-500"}
                  />
                )}
                {card.chart === "arc" && (
                  <ArcProgress
                    value={card.value.toString()}
                    color={card.color || "text-green-500"}
                  />
                )}
                {card.chart === "progress" && (
                  <ProgressBar
                    value={card.value.toString()}
                    color={card.color || "text-cyan-500"}
                  />
                )}
                {card.icon && <div>{card.icon}</div>}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
