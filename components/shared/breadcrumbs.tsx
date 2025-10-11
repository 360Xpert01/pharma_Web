"use client";

import { SeparatorIcon } from "@/lib/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BreadcrumbsProps } from "@/types/shared";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { breadcrumbUtils } from "@/lib/breadcrumb-utils";

export function Breadcrumbs({
  items = [],
  className,
  showHome = true,
  homeLabel = "Home",
  separator = <SeparatorIcon />,
  maxItems,
  autoGenerate = false,
}: BreadcrumbsProps) {
  const { generateFromPath } = useBreadcrumbs();

  // Auto-generate breadcrumbs from current path or use provided items
  const getProcessedItems = () => {
    let finalItems = autoGenerate ? generateFromPath() : items;

    // Add home item if requested
    if (showHome && finalItems.length > 0) {
      finalItems = [breadcrumbUtils.createHomeItem(homeLabel), ...finalItems];
    }

    // Truncate if max items specified
    if (maxItems && finalItems.length > maxItems) {
      finalItems = breadcrumbUtils.truncateItems(finalItems, maxItems);
    }

    return finalItems;
  };

  const processedItems = getProcessedItems();

  // Don't render if no items
  if (processedItems.length === 0) return null;

  // Validate items
  if (!breadcrumbUtils.validateItems(processedItems)) {
    console.warn("Invalid breadcrumb items provided");
    return null;
  }

  return (
    <Breadcrumb className={cn("", className)}>
      <BreadcrumbList>
        {processedItems.map((item, index) => (
          <Fragment key={`${item.href}-${index}`}>
            <BreadcrumbItem>
              {index === processedItems.length - 1 ? (
                <BreadcrumbPage className="flex items-center gap-1.5">
                  {item.icon}
                  {item.title}
                </BreadcrumbPage>
              ) : item.title === "..." ? (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  {item.title}
                </span>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href} className="flex items-center gap-1.5">
                    {item.icon}
                    {item.title}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {index < processedItems.length - 1 && (
              <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
