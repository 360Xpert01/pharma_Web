import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button/button";

interface CompactFooterProps {
  footerT: (key: string) => string;
  isUrdu: boolean;
}

export function CompactFooter({ footerT, isUrdu }: CompactFooterProps) {
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
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Logo & Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <h3 className="font-semibold text-lg text-foreground">{footerT("companyName")}</h3>
            </div>
            <span className="text-muted-foreground text-sm hidden md:block">•</span>
            <p
              className={cn("text-muted-foreground text-sm", isUrdu && "rtl")}
              style={isUrdu ? { direction: "rtl" } : undefined}
            >
              {footerT("copyright")}
            </p>
          </div>

          {/* Center: Navigation Links */}
          <nav className="flex items-center gap-6 text-muted-foreground text-sm">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              {footerT("privacyPolicy")}
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              {footerT("termsOfService")}
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              {footerT("contact")}
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              {footerT("aboutUs")}
            </Link>
          </nav>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, href, label, ariaLabel }) => (
              <Button key={href} asChild size="icon" variant="ghost" className="w-8 h-8">
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
        </div>
      </div>
    </div>
  );
}
