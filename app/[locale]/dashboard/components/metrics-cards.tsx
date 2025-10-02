"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DASHBOARD_TEXTS } from "@/constants/dashboard";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  DollarIcon,
  CartIcon,
  ActivityIcon,
  VisibilityIcon,
  PercentIcon,
  LucideIcon,
} from "@/lib/icons";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  icon?: LucideIcon;
  prefix?: string;
  suffix?: string;
  description?: string;
  color?: "default" | "success" | "warning" | "danger" | "info";
}

function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  prefix = "",
  suffix = "",
  description,
  color = "default",
}: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      return val.toLocaleString();
    }
    return val;
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "increase":
        return "text-green-600";
      case "decrease":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getCardColor = () => {
    switch (color) {
      case "success":
        return "border-green-200 bg-green-50/50";
      case "warning":
        return "border-yellow-200 bg-yellow-50/50";
      case "danger":
        return "border-red-200 bg-red-50/50";
      case "info":
        return "border-blue-200 bg-blue-50/50";
      default:
        return "";
    }
  };

  return (
    <Card className={cn("transition-all hover:shadow-md", getCardColor())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}
          {formatValue(value)}
          {suffix}
        </div>
        {change !== undefined && (
          <p className={cn("text-xs flex items-center mt-1", getChangeColor())}>
            {changeType === "increase" ? (
              <TrendingUpIcon className="h-3 w-3 mr-1" />
            ) : changeType === "decrease" ? (
              <TrendingDownIcon className="h-3 w-3 mr-1" />
            ) : null}
            {Math.abs(change)}% from last month
          </p>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}

interface MetricsCardsProps {
  data?: {
    totalUsers: number;
    activeSessions: number;
    revenue: number;
    conversionRate: number;
    orders: number;
    growth: number;
    bounceRate: number;
    pageViews: number;
  };
  isLoading?: boolean;
}

export function MetricsCards({ data, isLoading = false }: MetricsCardsProps) {
  // Default mock data if none provided
  const defaultData = {
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
      title: DASHBOARD_TEXTS.metrics.totalUsers,
      value: metricsData.totalUsers,
      change: 12.5,
      changeType: "increase" as const,
      icon: UsersIcon,
      color: "info" as const,
      description: "Total registered users",
    },
    {
      title: DASHBOARD_TEXTS.metrics.activeUsers,
      value: metricsData.activeSessions,
      change: 8.2,
      changeType: "increase" as const,
      icon: ActivityIcon,
      color: "success" as const,
      description: "Currently active users",
    },
    {
      title: DASHBOARD_TEXTS.metrics.revenue,
      value: metricsData.revenue,
      change: 15.3,
      changeType: "increase" as const,
      icon: DollarIcon,
      prefix: "$",
      color: "success" as const,
      description: "Total revenue this month",
    },
    {
      title: DASHBOARD_TEXTS.metrics.conversionRate,
      value: metricsData.conversionRate,
      change: -2.1,
      changeType: "decrease" as const,
      icon: PercentIcon,
      suffix: "%",
      color: "warning" as const,
      description: "Visitor to customer conversion",
    },
    {
      title: DASHBOARD_TEXTS.metrics.orders,
      value: metricsData.orders,
      change: 23.1,
      changeType: "increase" as const,
      icon: CartIcon,
      color: "info" as const,
      description: "Total orders this month",
    },
    {
      title: DASHBOARD_TEXTS.metrics.growth,
      value: metricsData.growth,
      change: 5.4,
      changeType: "increase" as const,
      icon: TrendingUpIcon,
      suffix: "%",
      color: "success" as const,
      description: "Month over month growth",
    },
    {
      title: DASHBOARD_TEXTS.metrics.bounceRate,
      value: metricsData.bounceRate,
      change: -3.2,
      changeType: "decrease" as const,
      icon: TrendingDownIcon,
      suffix: "%",
      color: "success" as const,
      description: "Percentage of single-page visits",
    },
    {
      title: DASHBOARD_TEXTS.metrics.pageViews,
      value: metricsData.pageViews,
      change: 18.7,
      changeType: "increase" as const,
      icon: VisibilityIcon,
      color: "info" as const,
      description: "Total page views this month",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-primary/20 rounded w-20 animate-pulse"></div>
              <div className="h-4 w-4 bg-primary/20 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-primary/20 rounded w-24 mb-2 animate-pulse"></div>
              <div className="h-3 bg-primary/10 rounded w-32 animate-pulse"></div>
              <div className="text-xs text-muted-foreground mt-2 animate-pulse">
                Loading Next Boiler metrics...
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
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
        />
      ))}
    </div>
  );
}
