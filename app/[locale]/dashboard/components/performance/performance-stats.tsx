"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

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
        <Card className="animate-pulse border-primary/20">
          <CardHeader>
            <div className="h-6 bg-primary/20 rounded w-32 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="h-8 bg-primary/20 rounded w-16 mx-auto animate-pulse"></div>
                  <div className="h-4 bg-primary/10 rounded w-20 mx-auto animate-pulse"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>{t("performance.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{performanceData.uptime}</p>
              <p className="text-sm text-muted-foreground">{t("performance.uptime")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{performanceData.avgResponse}</p>
              <p className="text-sm text-muted-foreground">{t("performance.avgResponse")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{performanceData.apiCalls}</p>
              <p className="text-sm text-muted-foreground">{t("performance.apiCalls")}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{performanceData.dataTransfer}</p>
              <p className="text-sm text-muted-foreground">{t("performance.dataTransfer")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
