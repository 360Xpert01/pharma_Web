"use client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { BarChartIcon } from "@/lib/icons";
import { useTranslations } from "next-intl";
import { ChartDataPoint } from "../../types";
import { ChartCard } from "./ChartCard";

interface SalesChartProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
}

export function SalesChart({ data, isLoading = false }: SalesChartProps) {
  const t = useTranslations("dashboard");

  const defaultData: ChartDataPoint[] = [
    { product: t("charts.data.products.productA"), sales: 4000, profit: 2400 },
    { product: t("charts.data.products.productB"), sales: 3000, profit: 1398 },
    { product: t("charts.data.products.productC"), sales: 2000, profit: 1200 },
    { product: t("charts.data.products.productD"), sales: 2780, profit: 1800 },
    { product: t("charts.data.products.productE"), sales: 1890, profit: 1100 },
  ];

  const chartData = data || defaultData;

  return (
    <ChartCard
      title={t("charts.salesComparison.title")}
      description={t("charts.salesComparison.description")}
      icon={BarChartIcon}
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value?.toLocaleString()}`} />
          <Legend />
          <Bar
            dataKey="sales"
            fill="#3b82f6"
            name={t("charts.data.labels.sales")}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="profit"
            fill="#10b981"
            name={t("charts.data.labels.profit")}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
