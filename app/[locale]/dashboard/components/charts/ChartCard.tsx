"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { ChartCardSkeleton } from "../loading/dashboard-loading";

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
    return <ChartCardSkeleton className={className} />;
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
