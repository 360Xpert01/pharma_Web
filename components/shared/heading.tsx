"use client";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

type THeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function Heading({ title, description, className }: THeadingProps) {
  const locale = useLocale();
  const isRTL = locale === "ur";

  return (
    <div className={cn("space-y-2", isRTL && "text-right w-full", className)}>
      <h2 className={cn("t-h1", isRTL && "text-right font-semibold tracking-wide")}>{title}</h2>
      {description && (
        <p className={cn("t-md leading-relaxed", isRTL && "text-right mt-3 leading-loose")}>
          {description}
        </p>
      )}
    </div>
  );
}
