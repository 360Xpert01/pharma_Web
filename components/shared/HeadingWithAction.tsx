"use client";

import React from "react";
import { Button } from "@/components/ui/button/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadingWithActionProps {
  /** Main heading text */
  title: string;
  /** Optional description/subtitle text */
  description?: string;
  /** Action button text */
  buttonText?: string;
  /** Icon component to display in button */
  buttonIcon?: LucideIcon;
  /** Button click handler */
  onButtonClick?: () => void;
  /** Hide the button completely */
  hideButton?: boolean;
  /** Custom button variant */
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  /** Custom button class names */
  buttonClassName?: string;
  /** Custom title class names */
  titleClassName?: string;
  /** Custom description class names */
  descriptionClassName?: string;
  /** Custom container class names */
  className?: string;
  /** Additional actions/elements to render on the right side */
  actions?: React.ReactNode;
  /** Disable the button */
  disabled?: boolean;
  /** Loading state for button */
  loading?: boolean;
  /** Button size */
  buttonSize?: "default" | "sm" | "lg" | "icon";
  /** Render custom content instead of default button */
  renderButton?: () => React.ReactNode;
}

export const HeadingWithAction: React.FC<HeadingWithActionProps> = ({
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon,
  onButtonClick,
  hideButton = false,
  buttonVariant = "default",
  buttonClassName,
  titleClassName,
  descriptionClassName,
  className,
  actions,
  disabled = false,
  loading = false,
  buttonSize = "default",
  renderButton,
}) => {
  return (
    <div className={cn("px-6 py-4 flex items-center justify-between", className)}>
      {/* Left side - Title and Description */}
      <div className="flex-1 min-w-0">
        <h2 className={cn("text-3xl font-bold text-[var(--gray-9)]", titleClassName)}>{title}</h2>
        {description && (
          <p className={cn("text-sm text-[var(--gray-5)] mt-1", descriptionClassName)}>
            {description}
          </p>
        )}
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3 ml-4">
        {/* Custom actions */}
        {actions}

        {/* Default button or custom render */}
        {!hideButton && (
          <>
            {renderButton ? (
              renderButton()
            ) : (
              <Button
                onClick={onButtonClick}
                disabled={disabled || loading}
                size={buttonSize}
                variant={buttonVariant}
                className={cn(
                  "bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-[var(--light)] inline-flex items-center justify-center gap-2 rounded-full h-11 px-6 whitespace-nowrap w-auto",
                  buttonClassName
                )}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[var(--light)] border-t-transparent rounded-full animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    {ButtonIcon && <ButtonIcon className="w-4 h-4 flex-shrink-0" />}
                    <span>{buttonText}</span>
                  </>
                )}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HeadingWithAction;
