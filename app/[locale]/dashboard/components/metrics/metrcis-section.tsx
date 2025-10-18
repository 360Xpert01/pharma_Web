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

interface MetricsSectionProps {
  data?: MetricData;
  isLoading?: boolean;
}

export function MetricsSection({ data, isLoading = false }: MetricsSectionProps) {
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
      title: "Total Users",
      value: metricsData.totalUsers,
      change: 12.5,
      changeType: "increase" as const,
      icon: Users,
      color: "info" as const,
      description: "Total registered users",
    },
    {
      title: "Active Users",
      value: metricsData.activeSessions,
      change: 8.2,
      changeType: "increase" as const,
      icon: Activity,
      color: "success" as const,
      description: "Currently active users",
    },
    {
      title: "Revenue",
      value: metricsData.revenue,
      change: 15.3,
      changeType: "increase" as const,
      icon: DollarSign,
      prefix: "$",
      color: "success" as const,
      description: "Total revenue generated",
    },
    {
      title: "Conversion Rate",
      value: metricsData.conversionRate,
      change: -2.1,
      changeType: "decrease" as const,
      icon: Percent,
      suffix: "%",
      color: "warning" as const,
      description: "Visitor to customer conversion",
    },
    {
      title: "Orders",
      value: metricsData.orders,
      change: 23.1,
      changeType: "increase" as const,
      icon: ShoppingCart,
      color: "info" as const,
      description: "Total orders placed",
    },
    {
      title: "Growth",
      value: metricsData.growth,
      change: 5.4,
      changeType: "increase" as const,
      icon: TrendingUp,
      suffix: "%",
      color: "success" as const,
      description: "Monthly growth rate",
    },
    {
      title: "Bounce Rate",
      value: metricsData.bounceRate,
      change: -3.2,
      changeType: "decrease" as const,
      icon: TrendingDown,
      suffix: "%",
      color: "success" as const,
      description: "Visitor bounce rate",
    },
    {
      title: "Page Views",
      value: metricsData.pageViews,
      change: 18.7,
      changeType: "increase" as const,
      icon: Eye,
      color: "info" as const,
      description: "Total page views",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Metrics Overview</h2>
        <p className="text-muted-foreground">Key performance indicators for your dashboard</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
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
            fromLastMonthText="from last month"
            isLoading={isLoading}
          />
        ))}
      </div>
    </section>
  );
}
