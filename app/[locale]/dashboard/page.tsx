"use client";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricsCards } from "./components/metrics-cards";
import { InteractiveCharts } from "./components/interactive-charts";
import { DataLists } from "./components/data-lists";
import {
  RealTimeProvider,
  RealTimeStatus,
  RealTimeNotifications,
  useRealTime,
} from "./components/real-time-provider";
import { SettingsIcon, RefreshIcon, TrendingUpIcon } from "@/lib/icons";
import { useState } from "react";
import Heading from "@/components/shared/heading";
import PageHead from "@/components/shared/page-head";
import { logger } from "@/lib/logger";
import LoaderOverlay from "@/components/shared/loader-overlay";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { useError, useAsyncError } from "@/contexts/error-context";

function DashboardContent() {
  const t = useTranslations("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useRealTime();
  const { addError } = useError();
  const { executeAsync } = useAsyncError();

  const handleRefresh = async () => {
    setIsLoading(true);

    const result = await executeAsync(async () => {
      // Simulate refresh delay and potential errors
      const { sleep } = await import("@/lib/actions/actions");
      await sleep(2000);

      // 10% chance of simulated error for demo purposes
      if (Math.random() < 0.1) {
        throw new Error("Failed to refresh dashboard data");
      }

      return "Dashboard refreshed successfully";
    }, "Failed to refresh dashboard");

    setIsLoading(false);

    if (result) {
      // Optionally show success message
      logger.info("Dashboard refresh completed successfully", { result });
    }
  };

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <PageHead title={t("title")} description={t("description")} />

      {/* Dashboard Header with Actions */}
      <div className="flex items-start gap-6">
        {/* Heading - Always on right in RTL */}
        <div className="flex-1">
          <Heading title={t("title")} description={t("description")} />
        </div>
        {/* Action Buttons - Always on left in RTL */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <RealTimeStatus />
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshIcon
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""} rtl:ml-2 ltr:mr-2`}
            />
            {t("actions.refresh")}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="/demo/loading">
              <TrendingUpIcon className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
              {t("actions.loadingDemo")}
            </a>
          </Button>
          <Button variant="outline" size="sm">
            <SettingsIcon className="h-4 w-4 rtl:ml-2 ltr:mr-2" />
            {t("actions.settings")}
          </Button>
        </div>
      </div>

      {/* Real-time Notifications */}
      <RealTimeNotifications />

      {/* Metrics Cards Section */}
      <section className="space-y-6">
        <Heading
          title={t("sections.metrics")}
          description={t("sections.metricsDescription")}
          className="mb-8"
        />
        <MetricsCards data={data.metrics} isLoading={isLoading} />
      </section>

      {/* Charts Section */}
      <section className="space-y-6">
        <Heading
          title={t("sections.charts")}
          description={t("sections.chartsDescription")}
          className="mb-8"
        />
        <InteractiveCharts isLoading={isLoading} />
      </section>

      {/* Data Tables Section */}
      <section className="space-y-6">
        <Heading
          title={t("sections.dataLists")}
          description={t("sections.dataListsDescription")}
          className="mb-8"
        />
        <DataLists isLoading={isLoading} />
      </section>

      {/* Quick Stats Footer */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>{t("performance.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">99.9%</p>
                <p className="text-sm text-muted-foreground">{t("performance.uptime")}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">1.2s</p>
                <p className="text-sm text-muted-foreground">{t("performance.avgResponse")}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">15.3k</p>
                <p className="text-sm text-muted-foreground">{t("performance.apiCalls")}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">2.1GB</p>
                <p className="text-sm text-muted-foreground">{t("performance.dataTransfer")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Enhanced Loader Overlay */}
      <LoaderOverlay
        isLoading={isLoading}
        text={t("loading.refreshing")}
        variant="default"
        size="lg"
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <RealTimeProvider>
        <DashboardContent />
      </RealTimeProvider>
    </ErrorBoundary>
  );
}
