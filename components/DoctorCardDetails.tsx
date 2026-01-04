import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DoctorCardDetailsProps {
  title: string;
  headerLabel?: string;
  headerTrend?: "up" | "down";
  value: string | number;
  valueLabel: string;
  subtitle: string;
  detailLabel?: string;
  detailValue?: string | number;
  progress: number;
  colorVariant?: "1" | "2" | "3" | "4";
  className?: string;
}

const colorClasses = {
  "1": "bg-(--primary)",
  "2": "bg-(--success)",
  "3": "bg-(--destructive-1)",
  "4": "bg-(--chart-4)",
};

const valueColorClasses = {
  "1": "text-(--primary)",
  "2": "text-(--success)",
  "3": "text-(--destructive-1)",
  "4": "text-chart-4",
};

export function DoctorCardDetails({
  title,
  headerLabel,
  headerTrend,
  value,
  valueLabel,
  subtitle,
  detailLabel,
  detailValue,
  progress,
  colorVariant = "1",
  className,
}: DoctorCardDetailsProps) {
  const HeaderIcon = headerTrend === "up" ? TrendingUp : TrendingDown;
  return (
    <Card className={cn("shadow-soft", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="t-h3">{title}</h3>
        {(headerLabel || headerTrend) && (
          <div className="flex items-center gap-2 t-mute text-xs font-normal">
            <span>{headerLabel}</span>
            {headerTrend && (
              <HeaderIcon className={cn("h-4 w-4", valueColorClasses[colorVariant])} />
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className={cn("t-val-lg", valueColorClasses[colorVariant])}>{value}</span>
          <span className="t-md">{valueLabel}</span>
        </div>

        <div className="flex items-center justify-between t-md">
          <span>{subtitle}</span>
          <div className="flex items-center gap-5">
            <span>{detailValue}</span>
            <TrendingUp className={cn("h-6 w-6", valueColorClasses[colorVariant])} />
          </div>
        </div>

        {detailLabel && detailValue && (
          <div className="flex items-center justify-between t-md">
            <span className="t-mute">{detailLabel}</span>
            <span className="t-label">{detailValue}</span>
          </div>
        )}

        <div className="relative">
          <Progress value={progress} className="h-3 bg-(--gray-2)" />
          <div
            className={cn(
              "absolute inset-0 h-3 rounded-8 transition-all",
              colorClasses[colorVariant]
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
