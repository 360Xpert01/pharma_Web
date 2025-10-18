"use client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { TrendingUpIcon } from "@/lib/icons";
import { useTranslations } from "next-intl";
import { ChartCard } from "./ChartCard";
import { ChartDataPoint } from "../../types";

interface RevenueChartProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
}

export function RevenueChart({ data, isLoading = false }: RevenueChartProps) {
  const t = useTranslations("dashboard");

  const defaultData: ChartDataPoint[] = [
    { month: t("charts.data.months.jan"), revenue: 4000, users: 2400, orders: 240 },
    { month: t("charts.data.months.feb"), revenue: 3000, users: 1398, orders: 221 },
    { month: t("charts.data.months.mar"), revenue: 5000, users: 9800, orders: 329 },
    { month: t("charts.data.months.apr"), revenue: 4500, users: 3908, orders: 400 },
    { month: t("charts.data.months.may"), revenue: 6000, users: 4800, orders: 481 },
    { month: t("charts.data.months.jun"), revenue: 7500, users: 3800, orders: 380 },
  ];

  const chartData = data || defaultData;

  return (
    <ChartCard
      title={t("charts.revenueTrend.title")}
      description={t("charts.revenueTrend.description")}
      icon={TrendingUpIcon}
      badge="Updated"
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [`$${value?.toLocaleString()}`, name]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorRevenue)"
            name={t("charts.data.labels.revenue")}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
