"use client";
import { Button } from "@/components/ui/button/button";
import { RefreshCw, Settings } from "lucide-react";

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
  return (
    <div className="flex items-start gap-6">
      {/* Heading */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your dashboard overview</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>

        <Button variant="outline" size="sm" onClick={onSettings}>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}
