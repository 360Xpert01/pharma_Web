"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface LoadingSkeletonProps {
  className?: string;
}

export function MetricCardSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <Card
      className={`animate-pulse border-primary/20 dark:bg-black/30 dark:backdrop-blur-sm dark:border-white/10 ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="h-4 bg-primary/20 dark:bg-(--background)/20 rounded w-20 animate-pulse"></div>
        <div className="h-4 w-4 bg-primary/20 dark:bg-(--background)/20 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-8 bg-primary/20 dark:bg-(--background)/20 rounded w-24 mb-2 animate-pulse"></div>
        <div className="h-3 bg-primary/10 dark:bg-(--background)/10 rounded w-32 animate-pulse"></div>
      </CardContent>
    </Card>
  );
}

export function ChartCardSkeleton({ className }: LoadingSkeletonProps) {
  const t = useTranslations("dashboard");

  return (
    <Card className={`animate-pulse border-primary/20 ${className}`}>
      <CardHeader>
        <div className="h-5 bg-primary/20 rounded w-32 mb-2 animate-pulse"></div>
        <div className="h-3 bg-primary/10 rounded w-48 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-primary/10 rounded animate-pulse flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-8 animate-spin mx-auto"></div>
            <p className="text-sm text-muted-foreground">{t("charts.loading")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DataTableSkeleton({ className }: LoadingSkeletonProps) {
  const t = useTranslations("dashboard");

  return (
    <Card className={`animate-pulse border-primary/20 ${className}`}>
      <CardHeader>
        <div className="h-6 bg-primary/20 rounded w-32 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="h-10 bg-primary/10 rounded flex-1 animate-pulse"></div>
            <div className="h-10 bg-primary/20 rounded w-24 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="h-12 bg-primary/5 rounded animate-pulse" />
            ))}
          </div>
          <div className="text-center py-4">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-8 animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">{t("table.loading")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardLoadingProps {
  type?: "full" | "metrics" | "charts" | "tables";
}

export function DashboardLoading({ type = "full" }: DashboardLoadingProps) {
  if (type === "metrics") {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (type === "charts") {
    return (
      <div className="space-y-6">
        <ChartCardSkeleton />
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <ChartCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (type === "tables") {
    return (
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <DataTableSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <DashboardLoading type="metrics" />
      <DashboardLoading type="charts" />
      <DashboardLoading type="tables" />
    </div>
  );
}
