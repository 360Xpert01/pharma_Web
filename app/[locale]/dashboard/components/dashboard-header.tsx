"use client";
import { Button } from "@/components/ui/button/button";
import { RefreshCw, Plus } from "lucide-react";
import { useTranslations } from "next-intl";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  onSettings?: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  btnTrue?: boolean;
  btnAdd?: string;
  btntextReq?: string;
  btnReqquest?: boolean;
  onSettingView?: () => void;
}

export function DashboardHeader({
  onRefresh,
  onSettings,
  isLoading = false,
  title,
  description,
  btnAdd,
  btnTrue,
  btntextReq,
  btnReqquest,
  onSettingView,
}: DashboardHeaderProps) {
  const t = useTranslations("dashboard");
  const heading = title;
  return (
    <div className="flex text-black flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      {/* Heading */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold font-sans tracking-tight">
          {heading || "plans Management"}
        </h1>
        <p className="text-muted-foreground">
          {description || "Unlock the potential of your candidates"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-3 sm:justify-start sm:flex-shrink-0">
        {/* <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          title={t("tooltips.refresh")}
          aria-label={t("tooltips.refresh")}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? t("loading.refreshing") : t("actions.refresh")}
        </Button> */}
        {!btnTrue && (
          <button
            className="p-3 cursor-pointer bg-blue-500 hover:bg-blue-600 text-sm text-white rounded-full flex items-center"
            onClick={onSettings}
            title={t("tooltips.settings")}
            aria-label={t("tooltips.settings")}
          >
            <Plus className="h-4 w-4 mr-1" />
            {btnAdd || "add"}
          </button>
        )}

        {!btnReqquest && !btnTrue && btntextReq && (
          <button
            className="p-3 bg-blue-500 cursor-pointer hover:bg-blue-600 text-sm text-white rounded-full flex items-center"
            onClick={onSettingView}
            title={t("tooltips.settings")}
            aria-label={t("tooltips.settings")}
          >
            {/* <Plus className="h-4 w-4 mr-1" /> */}
            {btntextReq || "add"}
          </button>
        )}
      </div>
    </div>
  );
}
