"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DASHBOARD_CONSTANTS } from "@/constants/dashboard";
import { MetricsCards } from "./components/metrics-cards";
import { InteractiveCharts } from "./components/interactive-charts";
import { DataLists } from "./components/data-lists";
import { 
  RealTimeProvider, 
  RealTimeStatus, 
  RecentActivities, 
  RealTimeNotifications,
  useRealTime 
} from "./components/real-time-provider";
import { 
  BarChartIcon,
  TrendingUpIcon,
  UsersIcon,
  ActivityIcon,
  SettingsIcon,
  RefreshIcon
} from "@/lib/icons";
import { useState } from "react";
import Heading from "@/components/shared/heading";
import PageHead from "@/components/shared/page-head";
import { logger } from "@/lib/logger";
import LoaderOverlay from "@/components/shared/loader-overlay";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { useError, useAsyncError } from "@/contexts/error-context";

function DashboardContent() {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useRealTime();
  const { addError } = useError();
  const { executeAsync } = useAsyncError();

  const handleRefresh = async () => {
    setIsLoading(true);
    
    const result = await executeAsync(async () => {
      // Simulate refresh delay and potential errors
      const { sleep } = await import('@/lib/actions/actions');
      await sleep(2000);
      
      // 10% chance of simulated error for demo purposes
      if (Math.random() < 0.1) {
        throw new Error('Failed to refresh dashboard data');
      }
      
      return 'Dashboard refreshed successfully';
    }, 'Failed to refresh dashboard');
    
    setIsLoading(false);
    
    if (result) {
      // Optionally show success message
      logger.info('Dashboard refresh completed successfully', { result });
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHead 
        title={DASHBOARD_CONSTANTS.TITLE}
        description={DASHBOARD_CONSTANTS.DESCRIPTION}
      />

      {/* Dashboard Header with Actions */}
      <div className="flex items-center justify-between">
        <Heading 
          title={DASHBOARD_CONSTANTS.TITLE}
          description={DASHBOARD_CONSTANTS.DESCRIPTION}
        />
        <div className="flex items-center gap-4">
          <RealTimeStatus />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshIcon className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {DASHBOARD_CONSTANTS.BUTTONS.REFRESH}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="/demo/loading">
              <ActivityIcon className="h-4 w-4 mr-2" />
              Demo Center
            </a>
          </Button>
          <Button variant="outline" size="sm">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Real-time Notifications */}
      <RealTimeNotifications />

      {/* Metrics Cards Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUpIcon className="h-5 w-5" />
          <Heading 
            title={DASHBOARD_CONSTANTS.SECTIONS.OVERVIEW}
            description="Key performance metrics and statistics"
            className="mb-0"
          />
        </div>
        <MetricsCards data={data.metrics} isLoading={isLoading} />
      </section>

      {/* Charts Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <BarChartIcon className="h-5 w-5" />
          <Heading 
            title={DASHBOARD_CONSTANTS.SECTIONS.ANALYTICS}
            description="Interactive charts and data visualizations"
            className="mb-0"
          />
        </div>
        <InteractiveCharts isLoading={isLoading} />
      </section>

      {/* Side Panel with Recent Activity */}
      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          {/* Data Tables Section */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <UsersIcon className="h-5 w-5" />
              <Heading 
                title="Data Management"
                description="Sortable and filterable data tables"
                className="mb-0"
              />
            </div>
            <DataLists isLoading={isLoading} />
          </section>
        </div>

        <div className="lg:col-span-1">
          {/* Recent Activity Sidebar */}
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="h-4 w-4" />
                {DASHBOARD_CONSTANTS.SECTIONS.RECENT_ACTIVITY}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecentActivities />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>{DASHBOARD_CONSTANTS.SECTIONS.PERFORMANCE}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">1.2s</p>
                <p className="text-sm text-muted-foreground">Avg Response</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">15.3k</p>
                <p className="text-sm text-muted-foreground">API Calls</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">2.1GB</p>
                <p className="text-sm text-muted-foreground">Data Transfer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Enhanced Loader Overlay */}
      <LoaderOverlay 
        isLoading={isLoading} 
        text={DASHBOARD_CONSTANTS.PLACEHOLDERS.LOADING}
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