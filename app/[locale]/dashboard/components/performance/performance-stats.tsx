"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { BaseGrid } from "@/components/shared/base-grid";
import { MetricCardSkeleton } from "../loading/dashboard-loading";

interface PerformanceStatsProps {
  data?: {
    uptime?: string;
    avgResponse?: string;
    apiCalls?: string;
    dataTransfer?: string;
  };
  isLoading?: boolean;
}

export function PerformanceStats({ data, isLoading = false }: PerformanceStatsProps) {
  const t = useTranslations("dashboard");

  const defaultData = {
    uptime: t("performance.uptimeValue"),
    avgResponse: t("performance.avgResponseValue"),
    apiCalls: t("performance.apiCallsValue"),
    dataTransfer: t("performance.dataTransferValue"),
  };

  const performanceData = data || defaultData;

  if (isLoading) {
    return (
      <section>
        <div className="mb-6">
          <div className="h-6 bg-primary/20 rounded w-32 animate-pulse mb-2"></div>
        </div>
        <BaseGrid columns={{ sm: 1, md: 2, lg: 4 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </BaseGrid>
      </section>
    );
  }

  const performanceStats = [
    {
      value: performanceData.uptime,
      label: t("performance.uptime"),
      color: "text-(--primary)",
    },
    {
      value: performanceData.avgResponse,
      label: t("performance.avgResponse"),
      color: "text-(--success)",
    },
    {
      value: performanceData.apiCalls,
      label: t("performance.apiCalls"),
      color: "text-(--secondary)",
    },
    {
      value: performanceData.dataTransfer,
      label: t("performance.dataTransfer"),
      color: "text-(--warning)",
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="t-h2">{t("performance.title")}</h2>
      </div>
      <BaseGrid columns={{ sm: 1, md: 2, lg: 4 }}>
        {performanceStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-center">
                <p className={`t-val ${stat.color}`}>{stat.value}</p>
                <p className="t-md">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </BaseGrid>
    </section>
  );
}
