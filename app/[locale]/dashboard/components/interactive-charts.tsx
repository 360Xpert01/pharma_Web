"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_TEXTS } from "@/constants/dashboard";
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

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 4000, users: 2400, orders: 240 },
  { month: "Feb", revenue: 3000, users: 1398, orders: 221 },
  { month: "Mar", revenue: 5000, users: 9800, orders: 329 },
  { month: "Apr", revenue: 4500, users: 3908, orders: 400 },
  { month: "May", revenue: 6000, users: 4800, orders: 481 },
  { month: "Jun", revenue: 7500, users: 3800, orders: 380 },
];

const salesData = [
  { product: "Product A", sales: 4000, profit: 2400 },
  { product: "Product B", sales: 3000, profit: 1398 },
  { product: "Product C", sales: 2000, profit: 1200 },
  { product: "Product D", sales: 2780, profit: 1800 },
  { product: "Product E", sales: 1890, profit: 1100 },
];

const trafficSources = [
  { name: "Direct", value: 400, color: DASHBOARD_TEXTS.colors.primary },
  { name: "Organic Search", value: 300, color: DASHBOARD_TEXTS.colors.success },
  { name: "Social Media", value: 200, color: DASHBOARD_TEXTS.colors.warning },
  { name: "Email", value: 100, color: DASHBOARD_TEXTS.colors.danger },
  { name: "Referral", value: 150, color: DASHBOARD_TEXTS.colors.info },
];

const userActivityData = [
  { time: "00:00", active: 12 },
  { time: "04:00", active: 8 },
  { time: "08:00", active: 45 },
  { time: "12:00", active: 78 },
  { time: "16:00", active: 92 },
  { time: "20:00", active: 65 },
  { time: "23:59", active: 23 },
];

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<any>;
  badge?: string;
  className?: string;
}

function ChartCard({ title, description, children, icon: Icon, badge, className }: ChartCardProps) {
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
          {DASHBOARD_TEXTS.actions.viewAll}
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
        title={DASHBOARD_TEXTS.charts.revenueTrend.title}
        description={DASHBOARD_TEXTS.charts.revenueTrend.description}
        icon={TrendingUpIcon}
        badge="Updated"
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={DASHBOARD_TEXTS.colors.primary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={DASHBOARD_TEXTS.colors.primary} stopOpacity={0.1} />
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
              stroke={DASHBOARD_TEXTS.colors.primary}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Comparison Chart */}
        <ChartCard
          title={DASHBOARD_TEXTS.charts.salesComparison.title}
          description="Product sales vs profit comparison"
          icon={BarChartIcon}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value?.toLocaleString()}`} />
              <Legend />
              <Bar
                dataKey="sales"
                fill={DASHBOARD_TEXTS.colors.primary}
                name="Sales"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="profit"
                fill={DASHBOARD_TEXTS.colors.success}
                name="Profit"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Traffic Sources Pie Chart */}
        <ChartCard
          title={DASHBOARD_TEXTS.charts.trafficSources.title}
          description="Website traffic breakdown by source"
          icon={PieChartIcon}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {trafficSources.map((entry, index) => (
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
          title={DASHBOARD_TEXTS.charts.userActivity.title}
          description="Daily user activity pattern"
          icon={ActivityIcon}
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userActivityData}>
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
                stroke={DASHBOARD_TEXTS.colors.success}
                strokeWidth={3}
                dot={{ fill: DASHBOARD_TEXTS.colors.success, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Performance Metrics */}
        <ChartCard
          title={DASHBOARD_TEXTS.charts.performanceMetrics.title}
          description="Key performance indicators over time"
          icon={BarChartIcon}
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData.slice(-4)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="orders"
                fill={DASHBOARD_TEXTS.colors.info}
                name="Orders"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
