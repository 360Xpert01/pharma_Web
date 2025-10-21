"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useLayout } from "@/contexts/layout-context";
import { cn } from "@/lib/utils";
import { MinimalFooter } from "./variants/minimal-footer";
import { SimpleFooter } from "./variants/simple-footer";
import { SocialFooter } from "./variants/social-footer";
import { DetailedFooter } from "./variants/detailed-footer";
import { CenteredFooter } from "./variants/centered-footer";
import { CompactFooter } from "./variants/compact-footer";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const { config } = useLayout();
  const footerT = useTranslations("layout.footer");
  const params = useParams();
  const isUrdu = params.locale === "ur";

  const footerClasses = cn("border-t bg-background", className);
  const containerClasses = cn("px-4 lg:px-6", {
    "max-w-7xl mx-auto": config.content.maxWidth === "container",
    "max-w-4xl mx-auto": config.content.maxWidth === "prose",
  });

  const renderFooterContent = () => {
    const commonProps = { footerT, isUrdu };

    switch (config.footer.variant) {
      case "minimal":
        return <MinimalFooter {...commonProps} />;
      case "detailed":
        return <DetailedFooter {...commonProps} />;
      case "social":
        return <SocialFooter {...commonProps} />;
      case "centered":
        return <CenteredFooter {...commonProps} />;
      case "compact":
        return <CompactFooter {...commonProps} />;
      case "simple":
      default:
        return <SimpleFooter {...commonProps} />;
    }
  };

  return (
    <footer className={footerClasses}>
      <div className={containerClasses}>{renderFooterContent()}</div>
    </footer>
  );
}
