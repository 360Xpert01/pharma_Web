import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Mail } from "lucide-react";
import { BaseGrid } from "@/components/shared/base-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";

interface DetailedFooterProps {
  footerT: (key: string) => string;
  isUrdu: boolean;
}

export function DetailedFooter({ footerT, isUrdu }: DetailedFooterProps) {
  return (
    <div className="py-12">
      <BaseGrid columns={{ sm: 1, md: 2, lg: 4 }} gap={8}>
        {/* Company Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <h3 className="font-semibold text-lg text-foreground">{footerT("companyName")}</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {footerT("companyDescription")}
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{footerT("address")}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span>{footerT("phone")}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span>{footerT("email")}</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground text-lg">{footerT("servicesTitle")}</h4>
          <nav className="space-y-3">
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

        {/* Company */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground text-lg">{footerT("companyTitle")}</h4>
          <nav className="space-y-3">
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
              {footerT("careers")}
            </Link>
            <Link
              href="/terms"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("portfolio")}
            </Link>
            <Link
              href="/changelog"
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {footerT("blog")}
            </Link>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground text-lg">{footerT("newsletterTitle")}</h4>
          <div className="space-y-4">
            <Input type="email" placeholder={footerT("newsletterPlaceholder")} className="w-full" />
            <Button className="w-full">{footerT("subscribeButton")}</Button>
          </div>
          <p className="text-muted-foreground text-xs">{footerT("copyright")}</p>
        </div>
      </BaseGrid>
    </div>
  );
}
