import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BaseGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    xs?: number; // Mobile portrait (< 475px)
    sm?: number; // Mobile landscape (475px - 639px)
    md?: number; // Tablet portrait (640px - 767px)
    lg?: number; // Tablet landscape (768px - 1023px)
    xl?: number; // Desktop (1024px - 1279px)
    "2xl"?: number; // Large desktop (1280px+)
  };
  gap?:
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        "2xl"?: number;
      }
    | number;
  minItemWidth?: string; // For auto-fit grids
  maxItemWidth?: string; // For auto-fit grids
  autoFit?: boolean; // Enable CSS Grid auto-fit
}

export function BaseGrid({
  children,
  className,
  columns = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, "2xl": 4 },
  gap = 4,
  minItemWidth,
  maxItemWidth = "1fr",
  autoFit = false,
}: BaseGridProps) {
  const getGridClasses = () => {
    const classes: string[] = ["grid"];

    // Handle gap - can be responsive object or single number
    if (typeof gap === "number") {
      classes.push(`gap-${gap}`);
    } else {
      if (gap.xs) classes.push(`gap-${gap.xs}`);
      if (gap.sm) classes.push(`sm:gap-${gap.sm}`);
      if (gap.md) classes.push(`md:gap-${gap.md}`);
      if (gap.lg) classes.push(`lg:gap-${gap.lg}`);
      if (gap.xl) classes.push(`xl:gap-${gap.xl}`);
      if (gap["2xl"]) classes.push(`2xl:gap-${gap["2xl"]}`);
    }

    // If autoFit is enabled, use CSS custom properties for responsive grid
    if (autoFit && minItemWidth) {
      classes.push("grid-cols-auto-fit");
      return classes.join(" ");
    }

    // Add responsive columns for all breakpoints
    if (columns.xs) classes.push(`grid-cols-${columns.xs}`);
    if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    if (columns["2xl"]) classes.push(`2xl:grid-cols-${columns["2xl"]}`);

    return classes.join(" ");
  };

  const getInlineStyles = () => {
    if (autoFit && minItemWidth) {
      return {
        gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, ${maxItemWidth}))`,
      };
    }
    return {};
  };

  return (
    <div className={cn(getGridClasses(), className)} style={getInlineStyles()}>
      {children}
    </div>
  );
}

// Predefined grid configurations for common use cases
export const GridPresets = {
  cards: { xs: 1, sm: 2, md: 2, lg: 3, xl: 4, "2xl": 5 },
  gallery: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6, "2xl": 7 },
  dashboard: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, "2xl": 4 },
  list: { xs: 1, sm: 1, md: 1, lg: 2, xl: 2, "2xl": 3 },
  products: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, "2xl": 6 },
  blog: { xs: 1, sm: 1, md: 2, lg: 2, xl: 3, "2xl": 3 },
};

// Usage examples:
// <BaseGrid columns={GridPresets.cards}>
// <BaseGrid columns={{ xs: 1, md: 2, xl: 4 }} gap={{ xs: 2, md: 4, xl: 6 }}>
// <BaseGrid autoFit minItemWidth="250px" maxItemWidth="1fr">
