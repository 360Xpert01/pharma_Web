"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useLayout } from "@/contexts/layout-context";
import { cn } from "@/lib/utils";
import { footerNavigation, socialLinks } from "@/navigation/config";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const { config } = useLayout();
  const t = useTranslations("layout.footer");
  const navT = useTranslations("navigation");
  const commonT = useTranslations("common");

  // Helper function to get the correct translation key for navigation items
  const getNavTranslationKey = (title: string): string => {
    const keyMap: Record<string, string> = {
      Privacy: "privacy",
      Terms: "terms",
      Contact: "contact",
      About: "about",
      GitHub: "github",
      Twitter: "twitter",
      LinkedIn: "linkedin",
    };
    return keyMap[title] || title.toLowerCase();
  };

  const footerClasses = cn("border-t border-border/40 bg-background", className);

  const containerClasses = cn("px-4 lg:px-6 py-6", {
    "max-w-7xl mx-auto": config.content.maxWidth === "container",
    "max-w-4xl mx-auto": config.content.maxWidth === "prose",
  });

  // Render different footer variants
  const renderFooterContent = () => {
    switch (config.footer.variant) {
      case "minimal":
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">{t("copyright")}</span>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("termsOfService")}
              </Link>
            </div>
          </div>
        );

      case "detailed":
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg mb-4">{t("companyName")}</h3>
              <p className="text-muted-foreground text-sm mb-4">{t("companyDescription")}</p>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {navT(getNavTranslationKey(link.title))}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium mb-4">{t("quickLinksTitle")}</h4>
              <nav className="space-y-2">
                {footerNavigation.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as any}
                    className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {navT(getNavTranslationKey(link.title))}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Additional Links */}
            <div>
              <h4 className="font-medium mb-4">{t("resourcesTitle")}</h4>
              <nav className="space-y-2">
                <Link
                  href="/docs"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {navT("documentation")}
                </Link>
                <Link
                  href="/support"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {navT("support")}
                </Link>
                <Link
                  href="/changelog"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  {navT("changelog")}
                </Link>
              </nav>
            </div>

            {/* Copyright */}
            <div className="md:col-span-4 pt-6 border-t border-border/40">
              <p className="text-muted-foreground text-sm text-center">
                © {new Date().getFullYear()} {t("companyName")}. {t("allRightsReserved")}
              </p>
            </div>
          </div>
        );

      case "simple":
      default:
        return (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerNavigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {navT(getNavTranslationKey(link.title))}
                </Link>
              ))}
            </div>
            <span className="text-muted-foreground">
              © {new Date().getFullYear()} {t("companyName")}
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
