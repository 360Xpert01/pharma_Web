"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const locales = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    dir: "ltr",
  },
  {
    code: "ur",
    name: "اردو",
    flag: "🇵🇰",
    dir: "rtl",
  },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common.languageSwitcher");

  const currentLocale = locales.find((l) => l.code === locale) || locales[0];

  const handleLocaleChange = (newLocale: string) => {
    // Navigate to the same path but with the new locale
    router.replace(pathname as any, { locale: newLocale as any });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-9 w-9 p-0 hover:bg-accent/50 transition-colors",
            "flex items-center justify-center rounded-md"
          )}
          aria-label={`${t("currentLanguage")}: ${currentLocale.name}`}
          title={t("tooltip")}
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t("ariaLabel")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 p-1">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            className={cn(
              "flex items-center justify-between px-3 py-2 cursor-pointer",
              "hover:bg-accent rounded-sm transition-colors",
              loc.dir === "rtl" && "text-right",
              locale === loc.code && "bg-accent/50"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg" role="img" aria-label={`${loc.name} flag`}>
                {loc.flag}
              </span>
              <span className={cn("text-sm font-medium", loc.dir === "rtl" && "font-arabic")}>
                {loc.name}
              </span>
            </div>
            {locale === loc.code && (
              <Check className="h-4 w-4 text-primary" aria-label="Selected" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
