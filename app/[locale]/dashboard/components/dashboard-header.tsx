"use client";
import { Button } from "@/components/ui/button/button";
import { RefreshCw, Settings } from "lucide-react";
import { useTranslations } from "next-intl";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  onSettings?: () => void;
  isLoading?: boolean;
}

export function DashboardHeader({
  onRefresh,
  onSettings,
  isLoading = false,
}: DashboardHeaderProps) {
  const t = useTranslations("dashboard");
  return (
    <div className="flex items-start gap-6">
      {/* Heading */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          title={t("tooltips.refresh")}
          aria-label={t("tooltips.refresh")}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? t("loading.refreshing") : t("actions.refresh")}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onSettings}
          title={t("tooltips.settings")}
          aria-label={t("tooltips.settings")}
        >
          <Settings className="h-4 w-4 mr-2" />
          {t("actions.settings")}
        </Button>
      </div>
    </div>
  );
}
