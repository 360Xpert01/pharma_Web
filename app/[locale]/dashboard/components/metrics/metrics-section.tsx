import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsSectionProps {
  title: string;
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
  "1": "bg-chart-1",
  "2": "bg-chart-2",
  "3": "bg-chart-3",
  "4": "bg-chart-4",
};

const valueColorClasses = {
  "1": "text-chart-1",
  "2": "text-chart-2",
  "3": "text-chart-3",
  "4": "text-chart-4",
};

export function MetricsSection({
  title,
  value,
  valueLabel,
  subtitle,
  detailLabel,
  detailValue,
  progress,
  colorVariant = "1",
  className,
}: MetricsSectionProps) {
  return (
    <Card className={cn("shadow-[0px_5px_10px_rgba(0,0,0,0.20)]", className)}>
      <CardHeader className="">
        <h3 className="text-1.5xl 2xl:text-2xl font-bold text-(--dark)">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-3 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                " text-3xl 2xl:text-4xl font-semibold",
                valueColorClasses[colorVariant]
              )}
            >
              {value}
            </span>
            <span className="text-lg text-muted-foreground">{valueLabel}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{subtitle}</span>
            <div className="flex items-center gap-5">
              <span>{detailValue}</span>
              <TrendingUp className={cn("h-6 w-6", valueColorClasses[colorVariant])} />
            </div>
          </div>

          {detailLabel && detailValue && (
            <div className="flex items-center text-(--dark) justify-between text-sm">
              <span className="text-muted-foreground">{detailLabel}</span>
              <span className="font-medium">{detailValue}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <Progress value={progress} className="h-3 bg-(--gray-2)" />
          <div
            className={cn(
              "absolute inset-0 h-3 rounded-full transition-all",
              colorClasses[colorVariant]
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
