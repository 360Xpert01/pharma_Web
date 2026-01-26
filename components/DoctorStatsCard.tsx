"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

// Mock data for the sparklines
const data = [
  { value: 400 },
  { value: 300 },
  { value: 500 },
  { value: 400 },
  { value: 600 },
  { value: 550 },
  { value: 700 },
  { value: 800 },
];

interface StatCardProps {
  title: string;
  value: string;
  color: string;
  gradientId: string;
}

const StatCard = ({ title, value, color, gradientId }: StatCardProps) => (
  <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-[200px] w-full">
    {/* Header */}
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-[#475569] text-xl font-bold mb-2">{title}</h3>
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-gray-300 font-medium whitespace-nowrap">
          Samples Completion Rate
        </span>
        <TrendingUp size={14} className={color} />
      </div>
    </div>

    {/* Sparkline Chart */}
    <div className="h-16 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="currentColor" className={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor="currentColor" className={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="currentColor"
            className={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default function AnalyticsSummary() {
  const stats = [
    {
      title: "Sales Report",
      value: "43,000",
      color: "text-blue-500",
      gradientId: "blueGradient",
    },
    {
      title: "Samples",
      value: "800",
      color: "text-emerald-400",
      gradientId: "greenGradient",
    },
    {
      title: "Giveaways",
      value: "200",
      color: "text-red-500",
      gradientId: "redGradient",
    },
  ];

  return (
    <div className="flex gap-5   bg-gray-50">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
