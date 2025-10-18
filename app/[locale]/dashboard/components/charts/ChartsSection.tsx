"use client";
import { useTranslations } from "next-intl";
import { ChartDataPoint } from "../../types";
import Heading from "@/components/shared/heading";
import { RevenueChart } from "./RevenueChart";
import { SalesChart } from "./SalesChart";
import { TrafficChart } from "./TrafficChart";
import { ActivityChart } from "./ActivityChart";
import { PerformanceChart } from "./PerformanceChart";

interface ChartsSectionProps {
  data?: {
    revenue?: ChartDataPoint[];
    sales?: ChartDataPoint[];
    traffic?: ChartDataPoint[];
    activity?: ChartDataPoint[];
    performance?: ChartDataPoint[];
  };
  isLoading?: boolean;
}

export function ChartsSection({ data, isLoading = false }: ChartsSectionProps) {
  const t = useTranslations("dashboard");

  return (
    <section className="space-y-6">
      <Heading
        title={t("sections.charts")}
        description={t("sections.chartsDescription")}
        className="mb-8"
      />

      <div className="space-y-6">
        {/* Revenue Trend Chart */}
        <RevenueChart data={data?.revenue} isLoading={isLoading} />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Sales Comparison Chart */}
          <SalesChart data={data?.sales} isLoading={isLoading} />

          {/* Traffic Sources Pie Chart */}
          <TrafficChart data={data?.traffic} isLoading={isLoading} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Activity Chart */}
          <ActivityChart data={data?.activity} isLoading={isLoading} />

          {/* Performance Metrics */}
          <PerformanceChart data={data?.performance} isLoading={isLoading} />
        </div>
      </div>
    </section>
  );
}
