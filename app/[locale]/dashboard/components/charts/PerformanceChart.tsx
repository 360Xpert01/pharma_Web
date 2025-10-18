"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import { BarChartIcon } from "@/lib/icons";
import { useTranslations } from "next-intl";
import { ChartDataPoint } from "../../types";
import { ChartCard } from "./ChartCard";

interface PerformanceChartProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
}

export function PerformanceChart({ data, isLoading = false }: PerformanceChartProps) {
  const t = useTranslations("dashboard");

  const defaultData: ChartDataPoint[] = [
    { month: t("charts.data.months.mar"), orders: 329 },
    { month: t("charts.data.months.apr"), orders: 400 },
    { month: t("charts.data.months.may"), orders: 481 },
    { month: t("charts.data.months.jun"), orders: 380 },
  ];

  const chartData = data || defaultData;

  return (
    <ChartCard
      title={t("charts.performanceMetrics.title")}
      description={t("charts.performanceMetrics.description")}
      icon={BarChartIcon}
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" fill="#8b5cf6" name="Orders" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
