"use client";

import { MetricData } from "../../types";
import {
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Eye,
  Percent,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { MetricCard } from "./metric-card";
import { BaseGrid } from "@/components/shared/base-grid";
import { useTranslations } from "next-intl";
import { MetricCardSkeleton } from "../loading/dashboard-loading";

interface MetricsSectionProps {
  data?: MetricData;
  isLoading?: boolean;
}

export function MetricsSection({ data, isLoading = false }: MetricsSectionProps) {
  const t = useTranslations("dashboard");
  // Default mock data if none provided
  const defaultData: MetricData = {
    totalUsers: 12543,
    activeSessions: 2341,
    revenue: 45230.5,
    conversionRate: 3.2,
    orders: 1832,
    growth: 12.5,
    bounceRate: 34.2,
    pageViews: 98765,
  };

  const metricsData = data || defaultData;

  const metrics = [
    {
      title: t("metrics.totalUsers"),
      value: metricsData.totalUsers,
      change: 12.5,
      changeType: "increase" as const,
      icon: Users,
      color: "info" as const,
      description: t("metrics.descriptions.totalUsers"),
    },
    {
      title: t("metrics.activeUsers"),
      value: metricsData.activeSessions,
      change: 8.2,
      changeType: "increase" as const,
      icon: Activity,
      color: "success" as const,
      description: t("metrics.descriptions.activeUsers"),
    },
    {
      title: t("metrics.revenue"),
      value: metricsData.revenue,
      change: 15.3,
      changeType: "increase" as const,
      icon: DollarSign,
      prefix: "$",
      color: "success" as const,
      description: t("metrics.descriptions.revenue"),
    },
    {
      title: t("metrics.conversionRate"),
      value: metricsData.conversionRate,
      change: -2.1,
      changeType: "decrease" as const,
      icon: Percent,
      suffix: "%",
      color: "warning" as const,
      description: t("metrics.descriptions.conversionRate"),
    },
    {
      title: t("metrics.orders"),
      value: metricsData.orders,
      change: 23.1,
      changeType: "increase" as const,
      icon: ShoppingCart,
      color: "info" as const,
      description: t("metrics.descriptions.orders"),
    },
    {
      title: t("metrics.growth"),
      value: metricsData.growth,
      change: 5.4,
      changeType: "increase" as const,
      icon: TrendingUp,
      suffix: "%",
      color: "success" as const,
      description: t("metrics.descriptions.growth"),
    },
    {
      title: t("metrics.bounceRate"),
      value: metricsData.bounceRate,
      change: -3.2,
      changeType: "decrease" as const,
      icon: TrendingDown,
      suffix: "%",
      color: "success" as const,
      description: t("metrics.descriptions.bounceRate"),
    },
    {
      title: t("metrics.pageViews"),
      value: metricsData.pageViews,
      change: 18.7,
      changeType: "increase" as const,
      icon: Eye,
      color: "info" as const,
      description: t("metrics.descriptions.pageViews"),
    },
  ];

  return (
    <section className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{t("sections.metrics")}</h2>
        <p className="text-muted-foreground">{t("sections.metricsDescription")}</p>
      </div>
      <BaseGrid columns={{ sm: 1, md: 2, lg: 4 }}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => <MetricCardSkeleton key={index} />)
          : metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                prefix={metric.prefix}
                suffix={metric.suffix}
                description={metric.description}
                color={metric.color}
                fromLastMonthText={t("metrics.fromLastMonth")}
              />
            ))}
      </BaseGrid>
    </section>
  );
}
