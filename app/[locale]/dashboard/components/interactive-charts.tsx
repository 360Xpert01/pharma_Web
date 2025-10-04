"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUpIcon, BarChartIcon, PieChartIcon, ActivityIcon } from "@/lib/icons";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<any>;
  badge?: string;
  className?: string;
}

function ChartCard({ title, description, children, icon: Icon, badge, className }: ChartCardProps) {
  const t = useTranslations("dashboard");

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            <CardTitle className="text-base">{title}</CardTitle>
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <Button variant="outline" size="sm">
          {t("actions.viewAll")}
        </Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

interface InteractiveChartsProps {
  isLoading?: boolean;
}

export function InteractiveCharts({ isLoading = false }: InteractiveChartsProps) {
  const t = useTranslations("dashboard");

  // Translated chart data
  const revenueDataTranslated = [
    { month: t("charts.data.months.jan"), revenue: 4000, users: 2400, orders: 240 },
    { month: t("charts.data.months.feb"), revenue: 3000, users: 1398, orders: 221 },
    { month: t("charts.data.months.mar"), revenue: 5000, users: 9800, orders: 329 },
    { month: t("charts.data.months.apr"), revenue: 4500, users: 3908, orders: 400 },
    { month: t("charts.data.months.may"), revenue: 6000, users: 4800, orders: 481 },
    { month: t("charts.data.months.jun"), revenue: 7500, users: 3800, orders: 380 },
  ];

  const salesDataTranslated = [
    { product: t("charts.data.products.productA"), sales: 4000, profit: 2400 },
    { product: t("charts.data.products.productB"), sales: 3000, profit: 1398 },
    { product: t("charts.data.products.productC"), sales: 2000, profit: 1200 },
    { product: t("charts.data.products.productD"), sales: 2780, profit: 1800 },
    { product: t("charts.data.products.productE"), sales: 1890, profit: 1100 },
  ];

  const trafficSourcesTranslated = [
    { name: t("charts.data.traffic.direct"), value: 400, color: "#3b82f6" },
    { name: t("charts.data.traffic.organicSearch"), value: 300, color: "#10b981" },
    { name: t("charts.data.traffic.socialMedia"), value: 200, color: "#f59e0b" },
    { name: t("charts.data.traffic.email"), value: 100, color: "#ef4444" },
    { name: t("charts.data.traffic.referral"), value: 150, color: "#8b5cf6" },
  ];

  const userActivityTranslated = [
    { time: t("charts.data.times.midnight"), active: 12 },
    { time: t("charts.data.times.earlyMorning"), active: 8 },
    { time: t("charts.data.times.morning"), active: 45 },
    { time: t("charts.data.times.noon"), active: 78 },
    { time: t("charts.data.times.afternoon"), active: 92 },
    { time: t("charts.data.times.evening"), active: 65 },
    { time: t("charts.data.times.night"), active: 23 },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse border-primary/20">
            <CardHeader>
              <div className="h-5 bg-primary/20 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-3 bg-primary/10 rounded w-48 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-primary/10 rounded animate-pulse flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm text-muted-foreground">Loading charts...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Revenue Trend Chart */}
      <ChartCard
        title={t("charts.revenueTrend.title")}
        description={t("charts.revenueTrend.description")}
        icon={TrendingUpIcon}
        badge="Updated"
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueDataTranslated}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value, name) => [`$${value?.toLocaleString()}`, name]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name={t("charts.data.labels.revenue")}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Comparison Chart */}
        <ChartCard
          title={t("charts.salesComparison.title")}
          description={t("charts.salesComparison.description")}
          icon={BarChartIcon}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesDataTranslated}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value?.toLocaleString()}`} />
              <Legend />
              <Bar
                dataKey="sales"
                fill="#3b82f6"
                name={t("charts.data.labels.sales")}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="profit"
                fill="#10b981"
                name={t("charts.data.labels.profit")}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Traffic Sources Pie Chart */}
        <ChartCard
          title={t("charts.trafficSources.title")}
          description={t("charts.trafficSources.description")}
          icon={PieChartIcon}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSourcesTranslated}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {trafficSourcesTranslated.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Visitors"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Activity Chart */}
        <ChartCard
          title={t("charts.userActivity.title")}
          description={t("charts.userActivity.description")}
          icon={ActivityIcon}
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userActivityTranslated}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value}`, "Active Users"]}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Performance Metrics */}
        <ChartCard
          title={t("charts.performanceMetrics.title")}
          description={t("charts.performanceMetrics.description")}
          icon={BarChartIcon}
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueDataTranslated.slice(-4)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8b5cf6" name="Orders" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
