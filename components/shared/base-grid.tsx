import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BaseGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
}

export function BaseGrid({
  children,
  className,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 6,
}: BaseGridProps) {
  const getGridClasses = () => {
    const classes: string[] = ["grid"];

    // Add gap
    classes.push(`gap-${gap}`);

    // Add responsive columns
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);

    return classes.join(" ");
  };

  return <div className={cn(getGridClasses(), className)}>{children}</div>;
}
