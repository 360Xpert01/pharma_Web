"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useLayout } from "@/contexts/layout-context";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const { config } = useLayout();
  const footerT = useTranslations("layout.footer");

  const footerClasses = cn("border-t border-border/40 bg-background", className);
  const containerClasses = cn("px-4 lg:px-6 py-6", {
    "max-w-7xl mx-auto": config.content.maxWidth === "container",
    "max-w-4xl mx-auto": config.content.maxWidth === "prose",
  });

  // Render footer variants
  const renderFooterContent = () => {
    switch (config.footer.variant) {
      case "minimal":
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">{footerT("copyright")}</span>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {footerT("privacyPolicy")}
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {footerT("termsOfService")}
              </Link>
            </div>
          </div>
        );

      case "detailed":
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg mb-4">{footerT("companyName")}</h3>
              <p className="text-muted-foreground text-sm mb-4">{footerT("companyDescription")}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4">{footerT("quickLinksTitle")}</h4>
              <nav className="space-y-2">
                <Link
                  href="/privacy"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {footerT("privacyPolicy")}
                </Link>
                <Link
                  href="/terms"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {footerT("termsOfService")}
                </Link>
              </nav>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-medium mb-4">{footerT("resourcesTitle")}</h4>
              <nav className="space-y-2">
                <Link
                  href="/docs"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {footerT("documentation")}
                </Link>
                <Link
                  href="/support"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {footerT("support")}
                </Link>
                <Link
                  href="/changelog"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {footerT("changelog")}
                </Link>
              </nav>
            </div>

            {/* Copyright */}
            <div className="md:col-span-4 pt-6 border-t border-border/40">
              <p className="text-muted-foreground text-sm text-center">
                © {new Date().getFullYear()} {footerT("companyName")}.{" "}
                {footerT("allRightsReserved")}
              </p>
            </div>
          </div>
        );

      case "simple":
      default:
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {footerT("privacyPolicy")}
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {footerT("termsOfService")}
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {footerT("contact")}
              </Link>
            </div>
            <span className="text-muted-foreground">
              © {new Date().getFullYear()} {footerT("companyName")}
            </span>
          </div>
        );
    }
  };

  return (
    <footer className={footerClasses}>
      <div className={containerClasses}>{renderFooterContent()}</div>
    </footer>
  );
}
