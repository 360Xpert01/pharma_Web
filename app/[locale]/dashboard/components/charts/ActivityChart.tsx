"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ActivityIcon } from "@/lib/icons";
import { useTranslations } from "next-intl";
import { ChartDataPoint } from "../../types";
import { ChartCard } from "./ChartCard";

interface ActivityChartProps {
  data?: ChartDataPoint[];
  isLoading?: boolean;
}

export function ActivityChart({ data, isLoading = false }: ActivityChartProps) {
  const t = useTranslations("dashboard");

  const defaultData: ChartDataPoint[] = [
    { time: t("charts.data.times.midnight"), active: 12 },
    { time: t("charts.data.times.earlyMorning"), active: 8 },
    { time: t("charts.data.times.morning"), active: 45 },
    { time: t("charts.data.times.noon"), active: 78 },
    { time: t("charts.data.times.afternoon"), active: 92 },
    { time: t("charts.data.times.evening"), active: 65 },
    { time: t("charts.data.times.night"), active: 23 },
  ];

  const chartData = data || defaultData;

  return (
    <ChartCard
      title={t("charts.userActivity.title")}
      description={t("charts.userActivity.description")}
      icon={ActivityIcon}
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip
            formatter={(value) => [`${value}`, "Active Users"]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
