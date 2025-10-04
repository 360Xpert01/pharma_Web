"use client";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sun, Moon, Monitor } from "lucide-react";

const themes = [
  {
    name: "light",
    icon: Sun,
    labelKey: "lightMode",
  },
  {
    name: "dark",
    icon: Moon,
    labelKey: "darkMode",
  },
  {
    name: "system",
    icon: Monitor,
    labelKey: "systemMode",
  },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("layout.theme");

  const currentTheme = themes.find((t) => t.name === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 hover:bg-accent/50 transition-colors"
                aria-label={t("toggleLabel")}
              >
                <CurrentIcon className="h-4 w-4" />
                <span className="sr-only">{t("toggleLabel")}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <TooltipContent side="bottom" sideOffset={4}>
            <p className="text-sm">{t("toggleLabel")}</p>
          </TooltipContent>

          <DropdownMenuContent align="end" className="w-36">
            {themes.map((themeOption) => {
              const IconComponent = themeOption.icon;
              return (
                <DropdownMenuItem
                  key={themeOption.name}
                  onClick={() => setTheme(themeOption.name)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm">{t(themeOption.labelKey)}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
}
