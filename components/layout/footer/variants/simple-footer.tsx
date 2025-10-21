import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { MapPin, Mail, Phone, Github, Linkedin, Instagram } from "lucide-react";
import { BaseGrid } from "@/components/shared/base-grid";

interface SimpleFooterProps {
  footerT: (key: string) => string;
  isUrdu: boolean;
}

export function SimpleFooter({ footerT, isUrdu }: SimpleFooterProps) {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com",
      label: footerT("githubLabel"),
      ariaLabel: footerT("githubAriaLabel"),
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: footerT("linkedinLabel"),
      ariaLabel: footerT("linkedinAriaLabel"),
    },
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: footerT("instagramLabel"),
      ariaLabel: footerT("instagramAriaLabel"),
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <BaseGrid columns={{ sm: 1, md: 2, lg: 4 }} gap={8}>
        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <h3 className="font-semibold text-lg text-foreground">{footerT("companyName")}</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {footerT("companyDescription")}
          </p>
          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map(({ icon: Icon, href, label, ariaLabel }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-primary hover:bg-primary/90 rounded flex items-center justify-center transition-colors"
                aria-label={ariaLabel}
                title={label}
              >
                <Icon className="h-4 w-4 text-primary-foreground" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">{footerT("servicesTitle")}</h4>
          <nav className="space-y-2">
            <Link
              href="/about"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("webDesign")}
            </Link>
            <Link
              href="/contact"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("uiUxDesign")}
            </Link>
            <Link
              href="/docs"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("webDevelopment")}
            </Link>
            <Link
              href="/support"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("seo")}
            </Link>
          </nav>
        </div>

        {/* Company Links */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">{footerT("companyTitle")}</h4>
          <nav className="space-y-2">
            <Link
              href="/about"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("aboutUs")}
            </Link>
            <Link
              href="/privacy"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("portfolio")}
            </Link>
            <Link
              href="/terms"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("termsOfService")}
            </Link>
            <Link
              href="/changelog"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("blog")}
            </Link>
          </nav>
        </div>

        {/* Newsletter & Social */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">{footerT("stayConnectedTitle")}</h4>
          <div className="space-y-3">
            <input
              type="email"
              placeholder={footerT("newsletterPlaceholder")}
              className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded text-sm font-medium transition-colors">
              {footerT("subscribeButton")}
            </button>
          </div>
        </div>
      </BaseGrid>

      {/* Bottom Section */}
      <div className="border-t border-border/40 mt-8 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{footerT("address")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{footerT("email")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{footerT("phone")}</span>
            </div>
          </div>
          <p
            className={cn("text-muted-foreground text-sm", isUrdu && "rtl")}
            style={isUrdu ? { direction: "rtl" } : undefined}
          >
            {footerT("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
