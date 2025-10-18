"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<any>;
  badge?: string;
  className?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  isLoading?: boolean;
}

export function ChartCard({
  title,
  description,
  children,
  icon: Icon,
  badge,
  className,
  showViewAll = true,
  onViewAll,
  isLoading = false,
}: ChartCardProps) {
  const t = useTranslations("dashboard");

  if (isLoading) {
    return (
      <Card className={`animate-pulse border-primary/20 ${className}`}>
        <CardHeader>
          <div className="h-5 bg-primary/20 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-3 bg-primary/10 rounded w-48 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-primary/10 rounded animate-pulse flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-muted-foreground">{t("charts.loading")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
        {showViewAll && (
          <Button variant="outline" size="sm" onClick={onViewAll}>
            {t("actions.viewAll")}
          </Button>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
