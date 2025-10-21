import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";

interface CenteredFooterProps {
  footerT: (key: string) => string;
  isUrdu: boolean;
}

export function CenteredFooter({ footerT, isUrdu }: CenteredFooterProps) {
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
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center space-y-12">
          {/* Logo & Company Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <h3 className="font-bold text-2xl text-foreground">{footerT("companyName")}</h3>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {footerT("companyDescription")}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors font-medium">
              {footerT("home")}
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors font-medium">
              {footerT("about")}
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors font-medium">
              {footerT("services")}
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors font-medium">
              {footerT("contactUs")}
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors font-medium">
              {footerT("privacyPolicy")}
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors font-medium">
              {footerT("termsOfService")}
            </Link>
          </nav>

          {/* Newsletter Signup */}
          <div className="space-y-4 max-w-md mx-auto">
            <h4 className="font-semibold text-foreground text-lg">{footerT("newsletterTitle")}</h4>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder={footerT("newsletterPlaceholder")}
                className="flex-1"
              />
              <Button>{footerT("subscribeButton")}</Button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Stay Connected</h4>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label, ariaLabel }) => (
                <Button
                  key={href}
                  asChild
                  size="icon"
                  variant="outline"
                  className="w-12 h-12 rounded-full"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={ariaLabel}
                    title={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p
              className={cn("text-muted-foreground text-sm", isUrdu && "rtl")}
              style={isUrdu ? { direction: "rtl" } : undefined}
            >
              {footerT("copyright")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
