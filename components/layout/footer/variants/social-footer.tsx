import { Link } from "@/i18n/navigation";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";

interface SocialFooterProps {
  footerT: (key: string) => string;
  isUrdu: boolean;
}

export function SocialFooter({ footerT, isUrdu }: SocialFooterProps) {
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
    <div className="py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">N</span>
          </div>
          <h3 className="font-semibold text-xl text-foreground">{footerT("companyName")}</h3>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center justify-center gap-8 text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            {footerT("home")}
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            {footerT("about")}
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            {footerT("services")}
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            {footerT("contactUs")}
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label, ariaLabel }) => (
            <Button key={href} asChild size="icon" className="w-10 h-10 rounded-full">
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

        {/* Copyright */}
        <p
          className={cn("text-muted-foreground text-sm", isUrdu && "rtl")}
          style={isUrdu ? { direction: "rtl" } : undefined}
        >
          {footerT("copyright")}
        </p>
      </div>
    </div>
  );
}
