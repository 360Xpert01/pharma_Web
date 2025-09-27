import React from "react";
import { cn } from "@/lib/utils";

type TableHeaderProps = {
  search?: React.ReactNode;
  filters?: React.ReactNode[];
  actions?: React.ReactNode[];
  className?: string;
};

export function TableHeader({ search, filters = [], actions = [], className }: TableHeaderProps) {
  const hasFilters = filters.length > 0;
  const hasActions = actions.length > 0;
  const hasSearch = !!search;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 py-4 sm:gap-6 sm:py-6",
        "md:flex-row md:items-center md:justify-between",
        className
      )}
    >
      {/* Left-aligned search and filters (stacked on mobile) */}
      <div
        className={cn(
          "flex flex-1 flex-col gap-3 sm:gap-4",
          "md:flex-row md:items-center md:gap-6",
          !hasSearch && !hasFilters && "hidden"
        )}
      >
        {search && (
          <div className={cn("w-full", hasFilters ? "md:w-auto md:flex-1" : "md:flex-1")}>
            {search}
          </div>
        )}

        {hasFilters && (
          <div
            className={cn(
              "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
              "md:flex md:flex-wrap md:gap-4 lg:flex-nowrap lg:gap-6"
            )}
          >
            {filters.map((filter, index) => (
              <React.Fragment key={index}>{filter}</React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Right-aligned actions (moves below on mobile when space is tight) */}
      {hasActions && (
        <div className={cn("flex flex-wrap justify-start gap-3", "md:justify-end")}>
          {actions.map((action, index) => (
            <React.Fragment key={index}>{action}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
