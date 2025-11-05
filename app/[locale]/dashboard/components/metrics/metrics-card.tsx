"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

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
  fromLastMonthText?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  prefix = "",
  suffix = "",
  description,
  color = "default",
  fromLastMonthText = "from last month",
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
        return "text-green-600 dark:text-green-400";
      case "decrease":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getCardColor = () => {
    switch (color) {
      case "success":
        return "bg-white ";
      case "warning":
        return "border-yellow-200 text-black bg-white dark:border-yellow-800/30 ";
      case "danger":
        return "border-red-200 bg-white text-black dark:border-red-800/30 ";
      case "info":
        return "border-blue-200 bg-white text-black dark:border-blue-800/30 ";
      default:
        return " dark:border-white bg-white";
    }
  };

  return (
    <Card className={cn("transition-all hover:shadow-md dark:hover:shadow-lg ", getCardColor())}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-300">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground dark:text-gray-400" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold dark:text-white">
          {prefix}
          {formatValue(value)}
          {suffix}
        </div>
        {change !== undefined && (
          <p className={cn("text-xs flex items-center mt-1", getChangeColor())}>
            {changeType === "increase" ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : changeType === "decrease" ? (
              <TrendingDown className="h-3 w-3 mr-1" />
            ) : null}
            {Math.abs(change)}% {fromLastMonthText}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
