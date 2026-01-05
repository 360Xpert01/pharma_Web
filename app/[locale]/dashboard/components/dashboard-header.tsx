"use client";
import { Button } from "@/components/ui/button/button";
import { RefreshCw, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import CalendarFilter from "@/components/dashboard/CalendarFilter";

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
  showCalendar?: boolean;
  onDateChange?: (startDate: Date, endDate: Date) => void;
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
  showCalendar = false,
  onDateChange,
}: DashboardHeaderProps) {
  const t = useTranslations("dashboard");
  const heading = title;
  return (
    <div className="flex text-(--dark) flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      {/* Heading */}
      <div className="flex-1">
        <h1 className="t-h1 tracking-tight">{heading || "plans Management"}</h1>
        <p className="t-md text-(--gray-5)">
          {description || "Unlock the potential of your candidates"}
        </p>
      </div>

      {/* Right Side - Calendar and Action Buttons */}
      <div className="flex items-center justify-center gap-3 sm:justify-start sm:flex-shrink-0">
        {/* Calendar Filter - Only shown when showCalendar prop is true */}
        {showCalendar && <CalendarFilter onDateChange={onDateChange} />}

        {/* Action Buttons */}
        {!btnTrue && (
          <button
            className="p-3 cursor-pointer bg-(--primary) hover:bg-(--primary-2) text-sm text-(--light) rounded-8 flex items-center"
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
            className="p-3 bg-(--primary) cursor-pointer hover:bg-(--primary-2) text-sm text-(--light) rounded-8 flex items-center"
            onClick={onSettingView}
            title={t("tooltips.settings")}
            aria-label={t("tooltips.settings")}
          >
            {btntextReq || "add"}
          </button>
        )}
      </div>
    </div>
  );
}
