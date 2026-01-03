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

const progressColorClasses = {
  "1": "bg-[#0F72F4]",
  "2": "bg-[#10B981]",
  "3": "bg-[#06B6D4]",
  "4": "bg-[#EF4444]",
};

const valueColorClasses = {
  "1": "text-[#0F72F4]",
  "2": "text-[#10B981]",
  "3": "text-[#06B6D4]",
  "4": "text-[#EF4444]",
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
    <div
      className={cn(
        "bg-(--background) border border-(--gray-2) rounded-8 p-4 shadow-soft",
        className
      )}
    >
      {/* Title */}
      <h3 className="t-label font-bold text-(--dark) mb-3">{title}</h3>

      {/* Value Section */}
      <div className="mb-3">
        <div className="flex items-baseline gap-2 mb-1">
          <span className={cn("t-val-lg", valueColorClasses[colorVariant])}>{value}</span>
          <span className="t-md text-(--gray-7)">{valueLabel}</span>
        </div>

        {/* Subtitle with detail on right */}
        <div className="flex items-center justify-between">
          <span className="t-sm text-(--gray-6)">{subtitle}</span>
          {detailValue && (
            <div className="flex items-center gap-1">
              <span className="t-sm text-(--gray-9) font-medium">{detailValue}</span>
              <TrendingUp className={cn("h-4 w-4", valueColorClasses[colorVariant])} />
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-(--gray-1) rounded-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all",
            progressColorClasses[colorVariant]
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
