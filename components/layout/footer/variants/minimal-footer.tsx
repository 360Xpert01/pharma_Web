import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { BaseGrid } from "@/components/shared/base-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";

interface MinimalFooterProps {
  footerT: (key: string) => string;
  isUrdu: boolean;
}

export function MinimalFooter({ footerT, isUrdu }: MinimalFooterProps) {
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
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: footerT("twitterLabel"),
      ariaLabel: footerT("twitterAriaLabel"),
    },
  ];

  return (
    <div className="py-8">
      <BaseGrid columns={{ sm: 1, md: 3, lg: 3 }} gap={8} className="items-center">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <h3 className="font-semibold text-lg text-foreground">{footerT("companyName")}</h3>
          </div>
          <p className="text-muted-foreground text-sm">{footerT("companyDescription")}</p>
          <p className="text-muted-foreground text-xs">{footerT("copyright")}</p>
        </div>

        {/* About Seawire */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">{footerT("aboutUsTitle")}</h4>
          <nav className="space-y-2">
            <Link
              href="/about"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("aboutUs")}
            </Link>
            <Link
              href="/contact"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("contact")}
            </Link>
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

        {/* Social Icons & Newsletter */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">{footerT("stayConnectedTitle")}</h4>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label, ariaLabel }) => (
              <Button key={href} asChild size="icon" variant="outline" className="w-8 h-8">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  title={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder={footerT("newsletterPlaceholder")}
              className="text-sm"
            />
            <Button className="w-full" size="sm">
              {footerT("subscribeButton")}
            </Button>
          </div>
        </div>
      </BaseGrid>
    </div>
  );
}
