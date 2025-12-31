import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-[var(--primary-2)] focus-visible:ring-primary/20",
        destructive:
          "bg-[var(--destructive)] text-[var(--light)] shadow-xs hover:bg-[var(--destructive-2)] focus-visible:ring-destructive/20",
        outline:
          "border border-[var(--gray-3)] bg-background text-[var(--gray-7)] hover:bg-[var(--gray-0)] hover:text-[var(--gray-9)] focus-visible:ring-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 focus-visible:ring-secondary/20",
        ghost: "hover:bg-[var(--gray-1)] hover:text-[var(--gray-9)]",
        link: "text-primary underline-offset-4 hover:underline",
        success:
          "bg-[var(--success)] text-[var(--light)] shadow-xs hover:opacity-90 focus-visible:ring-[var(--success)]/20",
        warning:
          "bg-[var(--warning)] text-[var(--dark)] shadow-xs hover:bg-[var(--warning-2)] focus-visible:ring-[var(--warning)]/20",
        info: "bg-[var(--primary-1)] text-[var(--light)] shadow-xs hover:bg-[var(--primary)] focus-visible:ring-[var(--primary)]/20",
        primary:
          "bg-[var(--primary)] text-[var(--light)] shadow-xs hover:bg-[var(--primary-2)] focus-visible:ring-[var(--primary)]/20",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg gap-1.5 px-3 text-xs",
        lg: "h-11 rounded-xl px-6 text-base",
        xl: "h-12 rounded-xl px-8 text-lg",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      rounded: {
        default: "rounded-md",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child component (e.g., Link) */
  asChild?: boolean;
  /** Loading state - shows spinner */
  loading?: boolean;
  /** Icon component (Lucide or SVG component) - displays on the left */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Icon component - displays on the right */
  iconRight?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Icon size override (for both left and right icons) */
  iconSize?: number | string;
  /** Icon className */
  iconClassName?: string;
  /** Text content when using with icon */
  children?: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Border radius variant */
  rounded?: "default" | "sm" | "lg" | "xl" | "full" | "none";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      rounded,
      asChild = false,
      loading = false,
      icon: Icon,
      iconRight: IconRight,
      iconSize,
      iconClassName,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Determine if this is an icon-only button
    const isIconOnly =
      !children &&
      (Icon || IconRight || size === "icon" || size === "icon-sm" || size === "icon-lg");

    // Loading spinner component
    const LoadingSpinner = () => (
      <svg
        className={cn(
          "animate-spin",
          iconSize
            ? typeof iconSize === "number"
              ? `w-${iconSize} h-${iconSize}`
              : iconSize
            : "w-4 h-4",
          iconClassName
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Render icon component
    const renderIcon = (
      IconComponent: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined,
      position: "left" | "right" = "left"
    ) => {
      if (!IconComponent) return null;

      const iconProps = {
        className: cn(
          iconSize
            ? typeof iconSize === "number"
              ? `w-${iconSize} h-${iconSize}`
              : iconSize
            : "w-4 h-4",
          iconClassName
        ),
        "aria-hidden": true,
      };

      // Check if it's a Lucide icon or SVG component
      return <IconComponent {...iconProps} />;
    };

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, fullWidth, rounded, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {!loading && Icon && renderIcon(Icon, "left")}
        {children && <span className="flex-1">{children}</span>}
        {!loading && IconRight && renderIcon(IconRight, "right")}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
